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
