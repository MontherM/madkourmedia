import type { ProjectEffects, GenreValue } from '@/types/studio';

type Preset = { effects: Partial<ProjectEffects>; feedback_style: string };

export const GENRE_PRESETS: Partial<Record<GenreValue, Preset>> = {
  'hip-hop': {
    effects: {
      eq: { enabled: true, low_gain: 2, mid_gain: 3, high_gain: 1 },
      compressor: { enabled: true, threshold: -18, ratio: 4, attack: 3, release: 100, makeup_gain: 2 },
      autotune: { enabled: true, key: 'C', scale: 'minor', strength: 0.3, retune_speed: 0.5, preserve_formants: true },
      reverb: { enabled: true, type: 'room', decay: 1.5, pre_delay: 10, wet_level: 0.15, dry_level: 0.85 },
    },
    feedback_style: 'Focus on punch, clarity, and tight doubles. Ad-libs should be energetic.',
  },
  trap: {
    effects: {
      eq: { enabled: true, low_gain: 1, mid_gain: 4, high_gain: 2 },
      compressor: { enabled: true, threshold: -20, ratio: 6, attack: 1, release: 50, makeup_gain: 3 },
      autotune: { enabled: true, key: 'C', scale: 'minor', strength: 0.6, retune_speed: 0.2, preserve_formants: false },
      reverb: { enabled: true, type: 'hall', decay: 2.5, pre_delay: 20, wet_level: 0.2, dry_level: 0.8 },
    },
    feedback_style: 'Harder presence, clear ad-libs, darker atmosphere. Autotune can be more aggressive.',
  },
  rnb: {
    effects: {
      eq: { enabled: true, low_gain: 1, mid_gain: 0, high_gain: -1 },
      compressor: { enabled: true, threshold: -16, ratio: 3, attack: 10, release: 200, makeup_gain: 1 },
      autotune: { enabled: true, key: 'C', scale: 'minor', strength: 0.2, retune_speed: 0.7, preserve_formants: true },
      reverb: { enabled: true, type: 'plate', decay: 3.0, pre_delay: 15, wet_level: 0.25, dry_level: 0.75 },
    },
    feedback_style: 'Warmer, softer, more soul. Focus on emotion and smooth delivery.',
  },
  pop: {
    effects: {
      eq: { enabled: true, low_gain: 0, mid_gain: 2, high_gain: 2 },
      compressor: { enabled: true, threshold: -14, ratio: 4, attack: 5, release: 150, makeup_gain: 2 },
      autotune: { enabled: true, key: 'C', scale: 'major', strength: 0.4, retune_speed: 0.4, preserve_formants: true },
      reverb: { enabled: true, type: 'hall', decay: 2.0, pre_delay: 10, wet_level: 0.2, dry_level: 0.8 },
    },
    feedback_style: 'Clean, polished, hook-focused. Vocals should be front and center.',
  },
  drill: {
    effects: {
      eq: { enabled: true, low_gain: 0, mid_gain: 3, high_gain: 1 },
      compressor: { enabled: true, threshold: -22, ratio: 8, attack: 1, release: 40, makeup_gain: 4 },
      autotune: { enabled: true, key: 'C', scale: 'minor', strength: 0.5, retune_speed: 0.3, preserve_formants: false },
      reverb: { enabled: true, type: 'hall', decay: 2.0, pre_delay: 10, wet_level: 0.18, dry_level: 0.82 },
    },
    feedback_style: 'Dark, minimal, menacing. Keep the vocal dry and punchy.',
  },
  afrobeat: {
    effects: {
      eq: { enabled: true, low_gain: 2, mid_gain: 1, high_gain: 2 },
      compressor: { enabled: true, threshold: -16, ratio: 3, attack: 8, release: 180, makeup_gain: 2 },
      autotune: { enabled: false, key: 'C', scale: 'major', strength: 0.1, retune_speed: 0.8, preserve_formants: true },
      reverb: { enabled: true, type: 'room', decay: 1.2, pre_delay: 5, wet_level: 0.12, dry_level: 0.88 },
    },
    feedback_style: 'Bright, energetic, rhythmic. Natural vocal feel is key.',
  },
};

export function getPreset(genre: GenreValue): Partial<ProjectEffects> {
  return GENRE_PRESETS[genre]?.effects ?? {};
}
