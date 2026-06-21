-- AI Demo Studio schema
-- Run this in your Supabase SQL editor or via supabase CLI

CREATE TABLE IF NOT EXISTS studio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Untitled Project',
  genre TEXT CHECK (genre IN (
    'hip-hop', 'rnb', 'trap', 'drill', 'dancehall',
    'afrobeat', 'pop', 'singer-songwriter', 'other'
  )) DEFAULT 'other',
  status TEXT CHECK (status IN ('draft', 'mixing', 'ready', 'exported')) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  beat    JSONB NOT NULL DEFAULT '{"file_url":"","file_name":"","duration":0,"sample_rate":44100,"bpm":null,"key":null,"waveform_data":[]}',
  vocal   JSONB NOT NULL DEFAULT '{"file_url":null,"file_name":null,"duration":null,"recording_method":null,"offset_ms":0,"waveform_data":null}',
  mix     JSONB NOT NULL DEFAULT '{"beat_volume":0.8,"vocal_volume":0.9,"beat_pan":0,"vocal_pan":0}',
  effects JSONB NOT NULL DEFAULT '{}',

  ai_feedback   JSONB DEFAULT NULL,
  transcription JSONB DEFAULT NULL,
  exports       JSONB NOT NULL DEFAULT '[]'
);

-- Row-level security
ALTER TABLE studio_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can CRUD their own projects" ON studio_projects;
CREATE POLICY "Users can CRUD their own projects"
  ON studio_projects FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_studio_projects_user_id ON studio_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_studio_projects_status  ON studio_projects(status);
CREATE INDEX IF NOT EXISTS idx_studio_projects_genre   ON studio_projects(genre);
CREATE INDEX IF NOT EXISTS idx_studio_projects_updated ON studio_projects(updated_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION studio_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS studio_projects_updated_at ON studio_projects;
CREATE TRIGGER studio_projects_updated_at
  BEFORE UPDATE ON studio_projects
  FOR EACH ROW EXECUTE FUNCTION studio_set_updated_at();

-- Storage buckets (run separately if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('studio-audio', 'studio-audio', false) ON CONFLICT DO NOTHING;
-- CREATE POLICY "Users can manage their own audio files"
--   ON storage.objects FOR ALL
--   USING (auth.uid()::text = (storage.foldername(name))[1]);
