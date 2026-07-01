import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getSupabaseAdminClient } from '@/lib/studio/db/supabase-server';
import { buildFeedbackPrompt, ruleBasedAnalysis, type AudioMetrics } from '@/lib/studio/ai/feedback';
import type { AIFeedback, GenreValue } from '@/types/studio';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function estimateMetrics(audioUrl: string): Promise<AudioMetrics> {
  // In a real implementation this would use meyda / Web Audio analysis
  // For the API route we return reasonable defaults based on URL availability
  const hasAudio = !!audioUrl;
  return {
    vocal_rms: hasAudio ? -18 : -60,
    vocal_peak: hasAudio ? -6 : -60,
    vocal_dynamic_range: hasAudio ? 12 : 0,
    vocal_noise_floor: hasAudio ? -55 : -90,
    beat_vocal_ratio: 1.0,
  };
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await getSupabaseAdminClient();

    const { data: project, error } = await supabase
      .from('studio_projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const vocalUrl: string = project.vocal?.file_url ?? '';
    const transcriptionText: string = project.transcription?.full_text ?? '';

    const metrics = await estimateMetrics(vocalUrl);

    const input = {
      genre: (project.genre as GenreValue) ?? 'hip-hop',
      bpm: project.beat?.bpm ?? null,
      key: project.beat?.key ?? null,
      audio_metrics: metrics,
      transcription_text: transcriptionText,
      duration: project.vocal?.duration ?? project.beat?.duration ?? 0,
    };

    const rules = ruleBasedAnalysis(input);

    let feedback: AIFeedback;

    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-...') {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: buildFeedbackPrompt(input, rules) }],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 1000,
      });
      const raw = JSON.parse(completion.choices[0].message.content ?? '{}');
      feedback = { ...raw, generated_at: new Date().toISOString() };
    } else {
      // No API key — return rule-based feedback only
      feedback = {
        generated_at: new Date().toISOString(),
        ...rules,
        timing: { on_beat_score: 70, notes: ['Connect OpenAI API key for detailed timing analysis'] },
        structure: { detected_sections: [], suggestions: ['Add OpenAI API key for structural analysis'] },
        creative_suggestions: { doubles_suggested: [], adlibs_suggested: [], harmonies_suggested: [], general_notes: ['Add OpenAI API key for AI creative suggestions'] },
        genre_fit: { genre: input.genre, fit_score: 75, notes: ['Add OpenAI API key for genre analysis'] },
      };
    }

    await supabase
      .from('studio_projects')
      .update({ ai_feedback: feedback, updated_at: new Date().toISOString() })
      .eq('id', id);

    return NextResponse.json({ feedback });
  } catch (err) {
    console.error('Analyze error:', err);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
