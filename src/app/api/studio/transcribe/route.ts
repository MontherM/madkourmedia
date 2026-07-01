import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getSupabaseAdminClient } from '@/lib/studio/db/supabase-server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { projectId, vocalUrl } = await req.json() as { projectId: string; vocalUrl: string };

    if (!projectId || !vocalUrl) {
      return NextResponse.json({ error: 'Missing projectId or vocalUrl' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-...') {
      return NextResponse.json({ transcription: { full_text: '', segments: [], language: 'en' } });
    }

    // Fetch audio from Supabase signed URL
    const audioRes = await fetch(vocalUrl);
    if (!audioRes.ok) throw new Error('Failed to fetch vocal audio');
    const audioBlob = await audioRes.blob();

    // Whisper transcription
    const file = new File([audioBlob], 'vocal.webm', { type: 'audio/webm' });
    const transcription = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
      response_format: 'verbose_json',
      timestamp_granularities: ['segment'],
    });

    const result = {
      full_text: transcription.text,
      segments: (transcription.segments ?? []).map((s) => ({
        start: s.start,
        end: s.end,
        text: s.text,
        confidence: 0.9,
      })),
      language: transcription.language ?? 'en',
    };

    // Save to project
    const supabase = await getSupabaseAdminClient();
    await supabase
      .from('studio_projects')
      .update({ transcription: result, updated_at: new Date().toISOString() })
      .eq('id', projectId);

    return NextResponse.json({ transcription: result });
  } catch (err) {
    console.error('Transcribe error:', err);
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 });
  }
}
