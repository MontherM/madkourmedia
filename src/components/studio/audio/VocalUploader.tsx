'use client';

import { useRef, useState } from 'react';
import { Upload, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSupabaseBrowserClient } from '@/lib/studio/db/supabase';
import { updateProject } from '@/lib/studio/db/projects';
import { MAX_VOCAL_SIZE_MB } from '@/lib/studio/constants';
import type { Project } from '@/types/studio';

interface VocalUploaderProps {
  projectId: string;
  project: Project;
  onUploaded: (updated: Project) => void;
}

export function VocalUploader({ projectId, project, onUploaded }: VocalUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadVocal(file: File) {
    if (file.size > MAX_VOCAL_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Max ${MAX_VOCAL_SIZE_MB}MB.`);
      return;
    }
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['mp3', 'wav', 'flac'].includes(ext ?? '')) {
      setError('Unsupported format. Use MP3, WAV, or FLAC.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const path = `${user.id}/${projectId}/vocal.${ext}`;
      const { error: storageError } = await supabase.storage
        .from('studio-audio')
        .upload(path, file, { upsert: true });
      if (storageError) throw new Error(storageError.message);

      const { data: { signedUrl } } = await supabase.storage
        .from('studio-audio')
        .createSignedUrl(path, 60 * 60 * 24 * 7);

      const duration = await getAudioDuration(file);
      const updated = await updateProject(projectId, {
        vocal: {
          ...project.vocal,
          file_url: signedUrl ?? '',
          file_name: file.name,
          duration,
          recording_method: 'upload',
          offset_ms: 0,
          waveform_data: null,
        },
        status: 'mixing',
      });
      onUploaded(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function getAudioDuration(file: File): Promise<number> {
    return new Promise((resolve) => {
      const audio = document.createElement('audio');
      audio.src = URL.createObjectURL(file);
      audio.onloadedmetadata = () => { resolve(audio.duration); URL.revokeObjectURL(audio.src); };
      audio.onerror = () => resolve(0);
    });
  }

  const hasVocal = !!project.vocal?.file_url;

  return (
    <div className="space-y-3">
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-colors',
          isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-border/60',
          hasVocal && 'border-primary/40 bg-primary/5'
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) uploadVocal(f); }}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input ref={fileInputRef} type="file" accept=".mp3,.wav,.flac" className="sr-only"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadVocal(f); }} />

        <Music className={cn('h-8 w-8', hasVocal ? 'text-primary' : 'text-muted-foreground')} />
        <div className="text-center">
          {uploading ? (
            <p className="text-sm font-medium text-foreground">Uploading...</p>
          ) : hasVocal ? (
            <>
              <p className="text-sm font-medium text-foreground">{project.vocal.file_name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {project.vocal.duration ? `${Math.round(project.vocal.duration)}s` : ''} · Click to replace
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-foreground">Drop vocal file here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-0.5">MP3, WAV, or FLAC · max {MAX_VOCAL_SIZE_MB}MB</p>
            </>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
