import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getCategoryById, getSubcategoryById } from '@/lib/visualizer-categories'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })
}

export async function POST(req: NextRequest) {
  const { category, subcategory } = await req.json()

  const cat = getCategoryById(category)
  const sub = getSubcategoryById(category, subcategory)

  if (!cat || !sub) {
    return NextResponse.json({ error: 'Ungültige Kategorie' }, { status: 400 })
  }

  const origin = req.headers.get('origin') ?? 'http://localhost:3000'
  const stripe = getStripe()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'chf',
          product_data: {
            name: 'KI-Raumvisualisierung',
            description: `${cat.label} — ${sub.label} · 3 professionelle Visualisierungen`,
          },
          unit_amount: 2900,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${origin}/visualizer/success?session_id={CHECKOUT_SESSION_ID}&category=${category}&subcategory=${subcategory}`,
    cancel_url: `${origin}/visualizer?canceled=true`,
    metadata: { category, subcategory, categoryLabel: cat.label, subcategoryLabel: sub.label },
  })

  return NextResponse.json({ url: session.url })
}
