import type { SupabaseClient } from '@supabase/supabase-js';
import type { Project } from '@/types/studio';

export async function listProjects(supabase: SupabaseClient): Promise<Project[]> {
  const { data, error } = await supabase
    .from('studio_projects')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Project[];
}

export async function getProject(supabase: SupabaseClient, id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('studio_projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as Project;
}
