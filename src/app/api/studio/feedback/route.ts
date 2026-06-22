import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { Project, AIFeedback } from '@/types/studio';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not configured on the server.' },
        { status: 500 }
      );
    }
    const openai = new OpenAI({ apiKey });

    const project: Project = await req.json();

    const systemPrompt = `You are an expert music producer and vocal coach specializing in ${project.genre} music.
Analyze the provided recording metadata and return structured feedback as JSON.
Be specific, actionable, and encouraging. Scores are 0–100.`;

    const userPrompt = `Analyze this demo project and provide feedback:

Project: "${project.name}"
Genre: ${project.genre}
Beat BPM: ${project.beat?.bpm ?? 'unknown'}
Beat Key: ${project.beat?.key ?? 'unknown'}
Beat Duration: ${project.beat?.duration ? Math.round(project.beat.duration) + 's' : 'unknown'}
Vocal Duration: ${project.vocal?.duration ? Math.round(project.vocal.duration) + 's' : 'none'}
Vocal Method: ${project.vocal?.recording_method ?? 'none'}
Vocal Offset: ${project.vocal?.offset_ms ?? 0}ms

Mix Settings:
- Beat Volume: ${project.mix?.beat_volume ?? 0.8}
- Vocal Volume: ${project.mix?.vocal_volume ?? 0.9}

Active Effects:
- EQ: ${project.effects?.eq?.enabled ? `Low ${project.effects.eq.low_gain}dB, Mid ${project.effects.eq.mid_gain}dB, High ${project.effects.eq.high_gain}dB` : 'off'}
- Compressor: ${project.effects?.compressor?.enabled ? `Threshold ${project.effects.compressor.threshold}dB, Ratio ${project.effects.compressor.ratio}:1` : 'off'}
- Reverb: ${project.effects?.reverb?.enabled ? `${project.effects.reverb.type}, decay ${project.effects.reverb.decay}s, wet ${project.effects.reverb.wet_level}` : 'off'}

Return ONLY valid JSON matching this structure (no markdown):
{
  "generated_at": "<ISO timestamp>",
  "recording_quality": {
    "score": <0-100>,
    "issues": ["<issue1>", ...],
    "positives": ["<positive1>", ...]
  },
  "timing": {
    "on_beat_score": <0-100>,
    "notes": ["<note>", ...]
  },
  "structure": {
    "detected_sections": [
      { "type": "intro|verse|pre_hook|hook|bridge|outro", "start_time": <sec>, "end_time": <sec>, "confidence": <0-1> }
    ],
    "suggestions": ["<suggestion>", ...]
  },
  "mix_suggestions": {
    "vocal_too_loud": <bool>,
    "vocal_too_quiet": <bool>,
    "beat_overpowers_vocal": <bool>,
    "needs_compression": <bool>,
    "needs_eq": <bool>,
    "notes": ["<note>", ...]
  },
  "creative_suggestions": {
    "doubles_suggested": [{ "section": "<section>", "reason": "<reason>" }],
    "adlibs_suggested": [{ "section": "<section>", "reason": "<reason>" }],
    "harmonies_suggested": [{ "section": "<section>", "reason": "<reason>" }],
    "general_notes": ["<note>", ...]
  },
  "genre_fit": {
    "genre": "${project.genre}",
    "fit_score": <0-100>,
    "notes": ["<note>", ...]
  }
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    });

    const raw = response.choices[0]?.message?.content;
    if (!raw) throw new Error('Empty response from OpenAI');

    const feedback: AIFeedback = JSON.parse(raw);
    feedback.generated_at = new Date().toISOString();

    return NextResponse.json(feedback);
  } catch (err) {
    console.error('Feedback API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
