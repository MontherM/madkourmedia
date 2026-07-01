'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Download, FileAudio } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { getProject, updateProject } from '@/lib/studio/db/projects';
import { renderMix, type ExportOptions } from '@/lib/studio/audio/export';
import type { Project } from '@/types/studio';

export default function ExportPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [format, setFormat] = useState<'wav' | 'mp3'>('wav');
  const [includeBeat, setIncludeBeat] = useState(true);
  const [includeVocal, setIncludeVocal] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState('');
  const [pct, setPct] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProject(id).then(setProject);
  }, [id]);

  async function handleExport() {
    if (!project) return;
    setExporting(true);
    setError(null);
    setDownloadUrl(null);
    setPct(0);

    try {
      const blob = await renderMix(
        project,
        { format, includeBeat, includeVocal },
        (stage, p) => { setProgress(stage); setPct(p); }
      );
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Save export record to project
      const record = {
        id: crypto.randomUUID(),
        format,
        quality: format === 'wav' ? '44.1kHz/16bit' : '320kbps',
        url,
        created_at: new Date().toISOString(),
        settings_snapshot: { mix: project.mix, effects: project.effects },
      };
      const updated = await updateProject(id, {
        exports: [...(project.exports ?? []), record],
        status: 'exported',
      });
      setProject(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setExporting(false);
    }
  }

  const canExport = project && (project.beat?.file_url || project.vocal?.file_url);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Export</h2>
        <p className="text-sm text-muted-foreground mt-1">Render your mix and download the demo.</p>
      </div>

      {/* Settings */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Format</label>
          <div className="flex gap-2">
            {(['wav', 'mp3'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`flex-1 rounded-md border py-2 text-sm font-medium transition-colors ${
                  format === f ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {f === 'wav' ? 'WAV (Lossless)' : 'MP3 (320kbps)'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Include</label>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Beat', value: includeBeat, set: setIncludeBeat },
              { label: 'Vocal', value: includeVocal, set: setIncludeVocal },
            ].map(({ label, value, set }) => (
              <label key={label} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={value} onChange={(e) => set(e.target.checked)}
                  className="accent-primary" />
                <span className="text-sm text-foreground">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      {exporting && (
        <div className="space-y-1">
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">{progress}</p>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* Download */}
      {downloadUrl && (
        <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <FileAudio className="h-6 w-6 text-primary shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Export ready</p>
            <p className="text-xs text-muted-foreground">{format.toUpperCase()}</p>
          </div>
          <a href={downloadUrl} download={`demo-${id}.${format}`}>
            <Button size="sm">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Download
            </Button>
          </a>
        </div>
      )}

      <Button onClick={handleExport} disabled={exporting || !canExport} className="w-full">
        {exporting ? `${progress} (${pct}%)` : 'Export Demo'}
      </Button>

      {!canExport && (
        <p className="text-xs text-muted-foreground text-center">Upload a beat or record a vocal first.</p>
      )}
    </div>
  );
}
