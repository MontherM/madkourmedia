import { Genre, type GenreValue } from '@/types/studio';

export const GENRE_OPTIONS: { value: GenreValue; label: string }[] = [
  { value: Genre.HIP_HOP, label: 'Hip-Hop' },
  { value: Genre.RNB, label: 'R&B' },
  { value: Genre.TRAP, label: 'Trap' },
  { value: Genre.DRILL, label: 'Drill' },
  { value: Genre.DANCEHALL, label: 'Dancehall' },
  { value: Genre.AFROBEAT, label: 'Afrobeat' },
  { value: Genre.POP, label: 'Pop' },
  { value: Genre.SINGER_SONGWRITER, label: 'Singer-Songwriter' },
  { value: Genre.OTHER, label: 'Other' },
];

export const MAX_BEAT_SIZE_MB = parseInt(process.env.NEXT_PUBLIC_MAX_BEAT_SIZE_MB || '50');
export const MAX_VOCAL_SIZE_MB = parseInt(process.env.NEXT_PUBLIC_MAX_VOCAL_SIZE_MB || '50');
export const MAX_PROJECT_DURATION_MIN = parseInt(process.env.NEXT_PUBLIC_MAX_PROJECT_DURATION_MIN || '5');

export const ACCEPTED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/x-wav', 'audio/x-flac'];
export const ACCEPTED_AUDIO_EXTENSIONS = ['.mp3', '.wav', '.flac'];

export const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  mixing: 'Mixing',
  ready: 'Ready',
  exported: 'Exported',
};

export const PROJECT_TABS = [
  { id: 'setup', label: 'Setup', path: 'setup' },
  { id: 'record', label: 'Record', path: 'record' },
  { id: 'timeline', label: 'Timeline', path: 'timeline' },
  { id: 'mix', label: 'Mix', path: 'mix' },
  { id: 'feedback', label: 'AI Feedback', path: 'feedback' },
  { id: 'export', label: 'Export', path: 'export' },
] as const;
