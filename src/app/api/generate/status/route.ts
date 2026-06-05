import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'

function getReplicate() {
  return new Replicate({ auth: process.env.REPLICATE_API_TOKEN! })
}

export async function GET(req: NextRequest) {
  const ids = req.nextUrl.searchParams.get('ids')?.split(',') ?? []

  if (ids.length === 0) {
    return NextResponse.json({ error: 'Keine IDs angegeben' }, { status: 400 })
  }

  // Test-Modus: alle IDs sind test-* → sofort mit Placeholder-Bildern antworten
  if (process.env.NODE_ENV !== 'production' && ids.every((id) => id.startsWith('test-'))) {
    const placeholders = [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    ]
    return NextResponse.json({
      statuses: ids.map((id, i) => ({ id, status: 'succeeded', output: placeholders[i], error: null })),
      allDone: true,
      images: placeholders,
    })
  }

  const replicate = getReplicate()
  const results = await Promise.all(ids.map((id) => replicate.predictions.get(id)))

  const statuses = results.map((r) => ({
    id: r.id,
    status: r.status,
    output: r.output ?? null,
    error: r.error ?? null,
  }))

  const allDone = statuses.every((s) => s.status === 'succeeded' || s.status === 'failed')
  const images = statuses
    .filter((s) => s.status === 'succeeded' && s.output)
    .map((s) => (Array.isArray(s.output) ? s.output[0] : s.output) as string)

  return NextResponse.json({ statuses, allDone, images })
}
