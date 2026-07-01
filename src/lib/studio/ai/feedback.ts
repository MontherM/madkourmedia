import type { AIFeedback, GenreValue } from '@/types/studio';

export interface AudioMetrics {
  vocal_rms: number;
  vocal_peak: number;
  vocal_dynamic_range: number;
  vocal_noise_floor: number;
  beat_vocal_ratio: number;
}

export interface FeedbackInput {
  genre: GenreValue;
  bpm: number | null;
  key: string | null;
  audio_metrics: AudioMetrics;
  transcription_text: string;
  duration: number;
}

export function ruleBasedAnalysis(input: FeedbackInput): Pick<AIFeedback, 'recording_quality' | 'mix_suggestions'> {
  const issues: string[] = [];
  const positives: string[] = [];

  if (input.audio_metrics.vocal_peak > -1) issues.push('clipping_detected');
  if (input.audio_metrics.vocal_noise_floor > -50) issues.push('high_noise_floor');
  if (input.audio_metrics.vocal_dynamic_range < 6) issues.push('over_compressed_or_too_quiet');
  if (input.audio_metrics.vocal_dynamic_range > 20) positives.push('good_dynamic_range');
  if (input.audio_metrics.vocal_rms > -6) positives.push('strong_vocal_presence');

  const ratio = input.audio_metrics.beat_vocal_ratio;
  return {
    recording_quality: {
      score: Math.max(0, Math.min(100, 80 - issues.length * 15 + positives.length * 10)),
      issues,
      positives,
    },
    mix_suggestions: {
      vocal_too_loud: ratio < 0.5,
      vocal_too_quiet: ratio > 1.5,
      beat_overpowers_vocal: ratio > 2,
      needs_compression: input.audio_metrics.vocal_dynamic_range > 18,
      needs_eq: issues.includes('high_noise_floor'),
      notes: [],
    },
  };
}

export function buildFeedbackPrompt(input: FeedbackInput, rules: ReturnType<typeof ruleBasedAnalysis>): string {
  return `You are an experienced music producer specializing in ${input.genre}.
Analyze this vocal demo and give actionable feedback.

SONG INFO: Genre: ${input.genre} | BPM: ${input.bpm ?? 'unknown'} | Key: ${input.key ?? 'unknown'}

TECHNICAL METRICS:
- Vocal RMS: ${input.audio_metrics.vocal_rms.toFixed(1)} dBFS
- Vocal Peak: ${input.audio_metrics.vocal_peak.toFixed(1)} dBFS
- Dynamic Range: ${input.audio_metrics.vocal_dynamic_range.toFixed(1)} dB
- Noise Floor: ${input.audio_metrics.vocal_noise_floor.toFixed(1)} dB
- Beat/Vocal Ratio: ${input.audio_metrics.beat_vocal_ratio.toFixed(2)}
- Duration: ${input.duration.toFixed(1)}s

TRANSCRIPTION:
${input.transcription_text || '(no transcription available)'}

RULES ENGINE:
${JSON.stringify(rules, null, 2)}

Respond ONLY with valid JSON matching this exact structure:
{
  "recording_quality": { "score": 0-100, "issues": ["..."], "positives": ["..."] },
  "timing": { "on_beat_score": 0-100, "notes": ["..."] },
  "structure": {
    "detected_sections": [{"type": "intro|verse|pre_hook|hook|bridge|outro", "start_time": 0, "end_time": 10, "confidence": 0.8}],
    "suggestions": ["..."]
  },
  "mix_suggestions": { "vocal_too_loud": false, "vocal_too_quiet": false, "beat_overpowers_vocal": false, "needs_compression": false, "needs_eq": false, "notes": ["..."] },
  "creative_suggestions": { "doubles_suggested": [], "adlibs_suggested": [], "harmonies_suggested": [], "general_notes": ["..."] },
  "genre_fit": { "genre": "${input.genre}", "fit_score": 0-100, "notes": ["..."] }
}`;
}
