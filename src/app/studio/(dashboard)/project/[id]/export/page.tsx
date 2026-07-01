'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Download, Loader2, CheckCircle2, Music2 } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { getProject, updateProject } from '@/lib/studio/db/projects';
import { AudioEngine, type PlaybackEffects } from '@/lib/studio/audio/engine';
import type { Project, ExportRecord } from '@/types/studio';
import { cn } from '@/lib/utils';

type Format = 'wav' | 'mp3';
type WavQuality = '16bit' | '24bit';
type Mp3Bitrate = '128' | '192' | '320';
type ExportState = 'idle' | 'loading' | 'rendering' | 'encoding' | 'done' | 'error';

function toPlaybackEffects(project: Project): PlaybackEffects {
  return {
    beatVolume: project.mix?.beat_volume ?? 0.8,
    vocalVolume: project.mix?.vocal_volume ?? 0.9,
    beatPan: project.mix?.beat_pan ?? 0,
    vocalPan: project.mix?.vocal_pan ?? 0,
    eq: project.effects?.eq?.enabled
      ? { low: project.effects.eq.low_gain, mid: project.effects.eq.mid_gain, high: project.effects.eq.high_gain }
      : null,
    compressor: project.effects?.compressor?.enabled
      ? {
          threshold: project.effects.compressor.threshold,
          ratio: project.effects.compressor.ratio,
          attack: project.effects.compressor.attack,
          release: project.effects.compressor.release,
          makeup: project.effects.compressor.makeup_gain,
        }
      : null,
    reverb: project.effects?.reverb?.enabled
      ? { decay: project.effects.reverb.decay, wet: project.effects.reverb.wet_level }
      : null,
  };
}

async function encodeToMp3(wavBuffer: ArrayBuffer, bitrate: string): Promise<Blob> {
  const { FFmpeg } = await import('@ffmpeg/ffmpeg');
  const { fetchFile } = await import('@ffmpeg/util');

  const ffmpeg = new FFmpeg();
  await ffmpeg.load({
    coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js',
  });

  const inFile = 'input.wav';
  const outFile = 'output.mp3';
  await ffmpeg.writeFile(inFile, new Uint8Array(wavBuffer));
  await ffmpeg.exec(['-i', inFile, '-b:a', `${bitrate}k`, '-q:a', '2', outFile]);
  const data = await ffmpeg.readFile(outFile);
  // FFmpeg returns FileData (Uint8Array | string); copy into a fresh ArrayBuffer-backed array for Blob
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : new Uint8Array(data);
  return new Blob([bytes], { type: 'audio/mpeg' });
}

export default function ExportPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [format, setFormat] = useState<Format>('wav');
  const [wavQuality] = useState<WavQuality>('16bit');
  const [mp3Bitrate, setMp3Bitrate] = useState<Mp3Bitrate>('320');
  const [exportState, setExportState] = useState<ExportState>('idle');
  const [progress, setProgress] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [exportError, setExportError] = useState<string | null>(null);
  const [pastExports, setPastExports] = useState<ExportRecord[]>([]);

  const engineRef = useRef<AudioEngine | null>(null);

  useEffect(() => {
    engineRef.current = new AudioEngine();
    getProject(id).then(async (p) => {
      if (!p) return;
      setProject(p);
      setPastExports(p.exports ?? []);
      if (p.beat?.file_url) await engineRef.current!.loadBeat(p.beat.file_url);
      if (p.vocal?.file_url) await engineRef.current!.loadVocal(p.vocal.file_url);
    });
    return () => {
      engineRef.current?.dispose();
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [id]);

  async function doExport() {
    if (!project || !engineRef.current) return;
    setExportState('rendering');
    setExportError(null);
    setDownloadUrl(null);

    try {
      setProgress('Rendering audio mix…');
      const wavBuffer = await engineRef.current.renderToWav(
        project.vocal?.offset_ms ?? 0,
        toPlaybackEffects(project)
      );

      let blob: Blob;
      let ext: string;

      if (format === 'mp3') {
        setExportState('encoding');
        setProgress(`Encoding MP3 at ${mp3Bitrate}kbps…`);
        blob = await encodeToMp3(wavBuffer, mp3Bitrate);
        ext = 'mp3';
      } else {
        blob = new Blob([wavBuffer], { type: 'audio/wav' });
        ext = 'wav';
      }

      const name = `${project.name.replace(/\s+/g, '_')}_demo.${ext}`;
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setFileName(name);
      setExportState('done');

      // Save export record
      const record: ExportRecord = {
        id: crypto.randomUUID(),
        format,
        quality: format === 'mp3' ? `${mp3Bitrate}kbps` : wavQuality,
        url: '',
        created_at: new Date().toISOString(),
        settings_snapshot: { mix: project.mix, effects: project.effects },
      };
      const newExports = [record, ...(project.exports ?? [])].slice(0, 10);
      const updated = await updateProject(id, { exports: newExports, status: 'exported' });
      setProject(updated);
      setPastExports(updated.exports ?? []);
    } catch (err) {
      setExportError(err instanceof Error ? err.message : 'Export failed');
      setExportState('error');
    }
  }

  const hasBeat = !!project?.beat?.file_url;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Export</h2>
        <p className="text-sm text-muted-foreground mt-1">Render and download your demo.</p>
      </div>

      {!hasBeat && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card py-16 text-center">
          <Music2 className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Upload a beat on the Setup tab first.</p>
        </div>
      )}

      {hasBeat && (
        <>
          {/* Format selection */}
          <section className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Format</h3>
            <div className="grid grid-cols-2 gap-3">
              {(['wav', 'mp3'] as Format[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={cn(
                    'rounded-xl border p-4 text-left transition-colors',
                    format === f ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-border/80'
                  )}
                >
                  <p className="font-medium text-foreground uppercase">{f}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {f === 'wav' ? 'Lossless · 16-bit · Studio quality' : 'Compressed · Smaller file size'}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* MP3 bitrate */}
          {format === 'mp3' && (
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Bitrate</h3>
              <div className="flex gap-3">
                {(['128', '192', '320'] as Mp3Bitrate[]).map((b) => (
                  <button
                    key={b}
                    onClick={() => setMp3Bitrate(b)}
                    className={cn(
                      'rounded-lg border px-4 py-2 text-sm transition-colors',
                      mp3Bitrate === b ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {b}kbps
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Export button / progress */}
          {exportState === 'idle' || exportState === 'error' ? (
            <Button className="w-full" onClick={doExport} size="lg">
              <Download className="h-4 w-4 mr-2" />
              Export {format.toUpperCase()}
            </Button>
          ) : exportState === 'done' ? (
            <div className="space-y-3">
              <div className="rounded-xl border border-primary/40 bg-primary/5 p-5 flex items-center gap-4">
                <CheckCircle2 className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Export ready!</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{fileName}</p>
                </div>
                <a href={downloadUrl!} download={fileName} className="ml-auto">
                  <Button size="sm">
                    <Download className="h-3.5 w-3.5 mr-1.5" /> Download
                  </Button>
                </a>
              </div>
              <Button variant="outline" className="w-full" onClick={() => { setExportState('idle'); setDownloadUrl(null); }}>
                Export Another Format
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-10">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">{progress}</p>
            </div>
          )}

          {exportError && (
            <p className="text-xs text-destructive">{exportError}</p>
          )}

          {/* Past exports */}
          {pastExports.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Export History</h3>
              <div className="divide-y divide-border rounded-xl border border-border bg-card overflow-hidden">
                {pastExports.map((ex) => (
                  <div key={ex.id} className="flex items-center gap-3 px-4 py-3">
                    <Download className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground uppercase">{ex.format}</p>
                      <p className="text-xs text-muted-foreground">{ex.quality} · {new Date(ex.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
