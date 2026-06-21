'use client';

import { useParams } from 'next/navigation';
import { Mic, Upload, Headphones } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';

export default function RecordPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Record</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Upload a vocal take or record directly in your browser.
        </p>
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 flex items-center gap-3">
        <Headphones className="h-5 w-5 text-amber-400 shrink-0" />
        <p className="text-sm text-amber-300">
          Wear headphones to prevent the beat from bleeding into your recording.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center transition-colors hover:border-primary hover:bg-primary/5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Mic className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Record in Browser</p>
            <p className="mt-1 text-xs text-muted-foreground">Use your microphone</p>
          </div>
        </button>

        <button className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center transition-colors hover:border-primary hover:bg-primary/5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Upload className="h-7 w-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">Upload Vocal</p>
            <p className="mt-1 text-xs text-muted-foreground">MP3, WAV, or FLAC</p>
          </div>
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Full recording UI coming in Phase 3 — drop a vocal file to continue now.
      </p>
    </div>
  );
}
