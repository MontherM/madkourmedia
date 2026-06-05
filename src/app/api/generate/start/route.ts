import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import Replicate from 'replicate'
import { getSubcategoryById, NEGATIVE_PROMPT } from '@/lib/visualizer-categories'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })
}

function getReplicate() {
  return new Replicate({ auth: process.env.REPLICATE_API_TOKEN! })
}

const MODEL_VERSION =
  process.env.REPLICATE_MODEL_VERSION ??
  'adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38'

export async function POST(req: NextRequest) {
  const { sessionId, imageBase64, category, subcategory } = await req.json()

  if (!sessionId || !imageBase64 || !category || !subcategory) {
    return NextResponse.json({ error: 'Fehlende Parameter' }, { status: 400 })
  }

  const isTestSession = sessionId === 'TEST_SESSION' && process.env.NODE_ENV !== 'production'

  if (isTestSession) {
    return NextResponse.json({ predictionIds: ['test-1', 'test-2', 'test-3'] })
  }

  const stripe = getStripe()
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Zahlung nicht bestätigt' }, { status: 402 })
  }

  const sub = getSubcategoryById(category, subcategory)
  if (!sub) {
    return NextResponse.json({ error: 'Ungültige Kategorie' }, { status: 400 })
  }

  const replicate = getReplicate()
  const version = MODEL_VERSION.split(':')[1]

  const imageBuffer = Buffer.from(imageBase64, 'base64')
  const imageBlob = new Blob([imageBuffer], { type: 'image/jpeg' })

  const seeds = [
    Math.floor(Math.random() * 999999),
    Math.floor(Math.random() * 999999),
    Math.floor(Math.random() * 999999),
  ]

  const predictions = await Promise.all(
    seeds.map((seed) =>
      replicate.predictions.create({
        version,
        input: {
          image: imageBlob,
          prompt: sub.prompt,
          negative_prompt: NEGATIVE_PROMPT,
          num_inference_steps: 50,
          guidance_scale: 15,
          prompt_strength: 0.8,
          seed,
        },
      })
    )
  )

  return NextResponse.json({ predictionIds: predictions.map((p) => p.id) })
}
