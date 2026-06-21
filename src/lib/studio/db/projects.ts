import type { Project, CreateProjectInput, GenreValue } from '@/types/studio';
import { getSupabaseBrowserClient } from './supabase';

const DEFAULT_MIX = {
  beat_volume: 0.8,
  vocal_volume: 0.9,
  beat_pan: 0,
  vocal_pan: 0,
};

const DEFAULT_BEAT = {
  file_url: '',
  file_name: '',
  duration: 0,
  sample_rate: 44100,
  bpm: null,
  key: null,
  waveform_data: [],
};

const DEFAULT_VOCAL = {
  file_url: null,
  file_name: null,
  duration: null,
  recording_method: null,
  offset_ms: 0,
  waveform_data: null,
};

export async function listProjects(): Promise<Project[]> {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('studio_projects')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Project[];
}

export async function getProject(id: string): Promise<Project | null> {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('studio_projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as Project;
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('studio_projects')
    .insert({
      user_id: user.id,
      name: input.name,
      genre: input.genre as GenreValue,
      status: 'draft',
      beat: DEFAULT_BEAT,
      vocal: DEFAULT_VOCAL,
      mix: DEFAULT_MIX,
      effects: {},
      ai_feedback: null,
      transcription: null,
      exports: [],
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Project;
}

export async function updateProject(
  id: string,
  updates: Partial<Omit<Project, 'id' | 'user_id' | 'created_at'>>
): Promise<Project> {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('studio_projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Project;
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.from('studio_projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
