'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Upload, Play, Pause, Music2, Loader2 } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { Input } from '@/components/studio/ui/input';
import { Label } from '@/components/studio/ui/label';
import { Select } from '@/components/studio/ui/select';
import { getProject, updateProject } from '@/lib/studio/db/projects';
import { getSupabaseBrowserClient } from '@/lib/studio/db/supabase';
import { GENRE_OPTIONS, MAX_BEAT_SIZE_MB, ACCEPTED_AUDIO_EXTENSIONS } from '@/lib/studio/constants';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/studio';

export default function SetupPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Form state
  const [bpm, setBpm] = useState('');
  const [key, setKey] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    getProject(id).then((p) => {
      if (!p) return;
      setProject(p);
      setBpm(p.beat?.bpm?.toString() ?? '');
      setKey(p.beat?.key ?? '');
      setGenre(p.genre ?? '');
    });
  }, [id]);

  async function uploadBeat(file: File) {
    if (file.size > MAX_BEAT_SIZE_MB * 1024 * 1024) {
      setUploadError(`File too large. Max size is ${MAX_BEAT_SIZE_MB}MB.`);
      return;
    }
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['mp3', 'wav', 'flac'].includes(ext ?? '')) {
      setUploadError(`Unsupported format. Use ${ACCEPTED_AUDIO_EXTENSIONS.join(', ')}.`);
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const path = `${user.id}/${id}/beat.${ext}`;
      const { error: storageError } = await supabase.storage
        .from('studio-audio')
        .upload(path, file, { upsert: true });

      if (storageError) throw new Error(storageError.message);

      const { data: { signedUrl } } = await supabase.storage
        .from('studio-audio')
        .createSignedUrl(path, 60 * 60 * 24 * 7); // 7 days

      // Get audio duration
      const duration = await getAudioDuration(file);

      const updated = await updateProject(id, {
        beat: {
          ...project?.beat,
          file_url: signedUrl ?? '',
          file_name: file.name,
          duration,
          sample_rate: 44100,
          bpm: bpm ? parseFloat(bpm) : null,
          key: key || null,
          waveform_data: [],
        },
        status: 'draft',
      });
      setProject(updated);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function getAudioDuration(file: File): Promise<number> {
    return new Promise((resolve) => {
      const audio = document.createElement('audio');
      audio.src = URL.createObjectURL(file);
      audio.onloadedmetadata = () => {
        resolve(audio.duration);
        URL.revokeObjectURL(audio.src);
      };
      audio.onerror = () => resolve(0);
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadBeat(file);
  }

  function togglePlayback() {
    if (!project?.beat?.file_url) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(project.beat.file_url);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  }

  async function saveMetadata() {
    setSaving(true);
    try {
      const updated = await updateProject(id, {
        genre: genre as Project['genre'],
        beat: {
          ...project!.beat,
          bpm: bpm ? parseFloat(bpm) : null,
          key: key || null,
        },
      });
      setProject(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  const hasBeat = !!project?.beat?.file_url;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Setup</h2>
        <p className="text-sm text-muted-foreground mt-1">Upload your beat and set project metadata.</p>
      </div>

      {/* Beat Uploader */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Beat</h3>

        <div
          className={cn(
            'relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 transition-colors cursor-pointer',
            isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-border/80',
            hasBeat && 'border-primary/40 bg-primary/5'
          )}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp3,.wav,.flac"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadBeat(file);
            }}
          />

          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : hasBeat ? (
            <Music2 className="h-8 w-8 text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}

          <div className="text-center">
            {hasBeat ? (
              <>
                <p className="text-sm font-medium text-foreground">{project.beat.file_name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {project.beat.duration ? `${Math.round(project.beat.duration)}s` : ''} · Click to replace
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-foreground">
                  {uploading ? 'Uploading...' : 'Drop your beat here or click to browse'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  MP3, WAV, or FLAC · max {MAX_BEAT_SIZE_MB}MB
                </p>
              </>
            )}
          </div>
        </div>

        {uploadError && (
          <p className="text-xs text-destructive">{uploadError}</p>
        )}

        {hasBeat && (
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={togglePlayback}>
              {isPlaying ? <Pause className="h-3.5 w-3.5 mr-1.5" /> : <Play className="h-3.5 w-3.5 mr-1.5" />}
              {isPlaying ? 'Pause' : 'Preview'}
            </Button>
            <span className="text-xs text-muted-foreground">
              {project?.beat?.duration ? `${Math.floor(project.beat.duration / 60)}:${String(Math.floor(project.beat.duration % 60)).padStart(2, '0')}` : ''}
            </span>
          </div>
        )}
      </section>

      {/* Metadata */}
      <section className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Metadata</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="bpm">BPM</Label>
            <Input
              id="bpm"
              type="number"
              placeholder="e.g. 140"
              min={40}
              max={300}
              value={bpm}
              onChange={(e) => setBpm(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              placeholder="e.g. C# minor"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="genre">Genre</Label>
          <Select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {GENRE_OPTIONS.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button onClick={saveMetadata} disabled={saving || !project} size="sm">
            {saving ? 'Saving...' : 'Save'}
          </Button>
          {hasBeat && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/studio/project/${id}/record`)}
            >
              Next: Record →
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
