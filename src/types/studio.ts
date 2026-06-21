export enum Genre {
  HIP_HOP = 'hip-hop',
  RNB = 'rnb',
  TRAP = 'trap',
  DRILL = 'drill',
  DANCEHALL = 'dancehall',
  AFROBEAT = 'afrobeat',
  POP = 'pop',
  SINGER_SONGWRITER = 'singer-songwriter',
  OTHER = 'other',
}

export type GenreValue = `${Genre}`;

export interface EQSettings {
  enabled: boolean;
  low_gain: number;
  mid_gain: number;
  high_gain: number;
}

export interface CompressorSettings {
  enabled: boolean;
  threshold: number;
  ratio: number;
  attack: number;
  release: number;
  makeup_gain: number;
}

export interface DeesserSettings {
  enabled: boolean;
  frequency: number;
  threshold: number;
  reduction: number;
}

export interface ReverbSettings {
  enabled: boolean;
  type: 'room' | 'hall' | 'plate' | 'spring';
  decay: number;
  pre_delay: number;
  wet_level: number;
  dry_level: number;
}

export interface AutotuneSettings {
  enabled: boolean;
  key: string;
  scale: 'major' | 'minor' | 'chromatic';
  strength: number;
  retune_speed: number;
  preserve_formants: boolean;
}

export interface NoiseGateSettings {
  enabled: boolean;
  threshold: number;
  attack: number;
  release: number;
}

export interface ProjectEffects {
  eq: EQSettings | null;
  compressor: CompressorSettings | null;
  deesser: DeesserSettings | null;
  reverb: ReverbSettings | null;
  autotune: AutotuneSettings | null;
  noise_gate: NoiseGateSettings | null;
}

export interface Section {
  type: 'intro' | 'verse' | 'pre_hook' | 'hook' | 'bridge' | 'outro';
  start_time: number;
  end_time: number;
  confidence: number;
}

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
  confidence: number;
}

export interface AIFeedback {
  generated_at: string;
  recording_quality: {
    score: number;
    issues: string[];
    positives: string[];
  };
  timing: {
    on_beat_score: number;
    notes: string[];
  };
  structure: {
    detected_sections: Section[];
    suggestions: string[];
  };
  mix_suggestions: {
    vocal_too_loud: boolean;
    vocal_too_quiet: boolean;
    beat_overpowers_vocal: boolean;
    needs_compression: boolean;
    needs_eq: boolean;
    notes: string[];
  };
  creative_suggestions: {
    doubles_suggested: { section: string; reason: string }[];
    adlibs_suggested: { section: string; reason: string }[];
    harmonies_suggested: { section: string; reason: string }[];
    general_notes: string[];
  };
  genre_fit: {
    genre: GenreValue;
    fit_score: number;
    notes: string[];
  };
}

export interface ExportRecord {
  id: string;
  format: 'wav' | 'mp3';
  quality: string;
  url: string;
  created_at: string;
  settings_snapshot: {
    mix: Project['mix'];
    effects: Project['effects'];
  };
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  genre: GenreValue;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'mixing' | 'ready' | 'exported';

  beat: {
    file_url: string;
    file_name: string;
    duration: number;
    sample_rate: number;
    bpm: number | null;
    key: string | null;
    waveform_data: number[];
  };

  vocal: {
    file_url: string | null;
    file_name: string | null;
    duration: number | null;
    recording_method: 'upload' | 'browser' | null;
    offset_ms: number;
    waveform_data: number[] | null;
  };

  mix: {
    beat_volume: number;
    vocal_volume: number;
    beat_pan: number;
    vocal_pan: number;
  };

  effects: ProjectEffects;

  ai_feedback: AIFeedback | null;

  transcription: {
    segments: TranscriptSegment[];
    full_text: string;
    language: string;
  } | null;

  exports: ExportRecord[];
}

export type ProjectStatus = Project['status'];

export interface CreateProjectInput {
  name: string;
  genre: string;
}
