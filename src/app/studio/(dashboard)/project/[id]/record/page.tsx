'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Headphones } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { VocalUploader } from '@/components/studio/audio/VocalUploader';
import { BrowserRecorder } from '@/components/studio/audio/BrowserRecorder';
import { getProject } from '@/lib/studio/db/projects';
import type { Project } from '@/types/studio';

type Mode = 'upload' | 'record';

export default function RecordPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [mode, setMode] = useState<Mode>('upload');

  useEffect(() => {
    getProject(id).then(setProject);
  }, [id]);

  if (!project) return null;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Record</h2>
        <p className="text-sm text-muted-foreground mt-1">Upload a vocal take or record directly in your browser.</p>
      </div>

      {/* Headphones warning */}
      <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
        <Headphones className="h-5 w-5 text-amber-400 shrink-0" />
        <p className="text-sm text-amber-300">Wear headphones to prevent beat bleed into your recording.</p>
      </div>

      {/* Mode toggle */}
      <div className="flex rounded-lg border border-border overflow-hidden w-fit">
        {(['upload', 'record'] as Mode[]).map((m) => (
          <button
            key={m}
            className={`px-4 py-2 text-sm font-medium transition-colors capitalize ${
              mode === m ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setMode(m)}
          >
            {m === 'upload' ? 'Upload Vocal' : 'Record in Browser'}
          </button>
        ))}
      </div>

      {mode === 'upload' ? (
        <VocalUploader projectId={id} project={project} onUploaded={setProject} />
      ) : (
        <BrowserRecorder projectId={id} project={project} onRecorded={setProject} />
      )}

      {project.vocal?.file_url && (
        <div className="pt-2 flex items-center gap-3">
          <p className="text-sm text-muted-foreground">
            ✓ Vocal saved: <span className="text-foreground">{project.vocal.file_name}</span>
          </p>
          <Button variant="outline" size="sm" onClick={() => router.push(`/studio/project/${id}/timeline`)}>
            Next: Timeline →
          </Button>
        </div>
      )}
    </div>
  );
}
