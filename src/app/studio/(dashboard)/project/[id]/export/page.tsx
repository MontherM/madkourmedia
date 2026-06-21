'use client';

import { useParams } from 'next/navigation';
import { Download } from 'lucide-react';

export default function ExportPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Export</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Render and download your demo as WAV or MP3.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card py-20 text-center">
        <Download className="h-10 w-10 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">Export coming in Phase 5</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Client-side WAV/MP3 export via FFmpeg.wasm — no server needed.
          </p>
        </div>
      </div>
    </div>
  );
}
