'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Play, Pause, Square, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { getProject, updateProject } from '@/lib/studio/db/projects';
import { AudioEngine, type PlaybackEffects } from '@/lib/studio/audio/engine';
import type { Project } from '@/types/studio';

const DEFAULT_EFFECTS: PlaybackEffects = {
  beatVolume: 0.8,
  vocalVolume: 0.9,
  beatPan: 0,
  vocalPan: 0,
  eq: null,
  compressor: null,
  reverb: null,
};

function drawWaveform(canvas: HTMLCanvasElement, data: Float32Array, color: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const step = Math.ceil(data.length / w);
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    let min = 1, max = -1;
    for (let s = 0; s < step; s++) {
      const v = data[x * step + s] ?? 0;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    ctx.moveTo(x, (1 + min) * (h / 2));
    ctx.lineTo(x, (1 + max) * (h / 2));
  }
  ctx.stroke();
}

async function loadWaveform(url: string): Promise<Float32Array> {
  const ctx = new AudioContext();
  const res = await fetch(url);
  const ab = await res.arrayBuffer();
  const buf = await ctx.decodeAudioData(ab);
  const data = buf.getChannelData(0);
  ctx.close();
  return data;
}

export default function TimelinePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [offsetMs, setOffsetMs] = useState(0);
  const [saving, setSaving] = useState(false);
  const [beatDuration, setBeatDuration] = useState(0);
  const [vocalDuration, setVocalDuration] = useState(0);

  const engineRef = useRef<AudioEngine | null>(null);
  const beatCanvasRef = useRef<HTMLCanvasElement>(null);
  const vocalCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const pxPerMsRef = useRef(0.1);

  useEffect(() => {
    engineRef.current = new AudioEngine();
    return () => { engineRef.current?.dispose(); };
  }, []);

  useEffect(() => {
    getProject(id).then(async (p) => {
      if (!p) { setLoading(false); return; }
      setProject(p);
      setOffsetMs(p.vocal?.offset_ms ?? 0);

      const engine = engineRef.current!;
      try {
        if (p.beat?.file_url) {
          const [waveData] = await Promise.all([
            loadWaveform(p.beat.file_url),
            engine.loadBeat(p.beat.file_url),
          ]);
          setBeatDuration(p.beat.duration ?? 0);
          if (beatCanvasRef.current) {
            drawWaveform(beatCanvasRef.current, waveData, 'hsl(142 70% 45%)');
          }
        }
        if (p.vocal?.file_url) {
          const [waveData] = await Promise.all([
            loadWaveform(p.vocal.file_url),
            engine.loadVocal(p.vocal.file_url),
          ]);
          setVocalDuration(p.vocal.duration ?? 0);
          if (vocalCanvasRef.current) {
            drawWaveform(vocalCanvasRef.current, waveData, 'hsl(220 70% 60%)');
          }
        }
      } finally {
        setLoading(false);
      }
    });
  }, [id]);

  // recalc pxPerMs based on canvas width and beat duration
  useEffect(() => {
    if (beatDuration > 0 && beatCanvasRef.current) {
      pxPerMsRef.current = beatCanvasRef.current.offsetWidth / (beatDuration * 1000);
    }
  }, [beatDuration]);

  function togglePlayback() {
    const engine = engineRef.current;
    if (!engine) return;
    if (isPlaying) {
      engine.pause();
      setIsPlaying(false);
    } else {
      const effects: PlaybackEffects = {
        ...DEFAULT_EFFECTS,
        beatVolume: project?.mix?.beat_volume ?? 0.8,
        vocalVolume: project?.mix?.vocal_volume ?? 0.9,
      };
      engine.play(offsetMs, effects, () => setIsPlaying(false));
      setIsPlaying(true);
    }
  }

  function stopPlayback() {
    engineRef.current?.stop();
    setIsPlaying(false);
  }

  function nudge(deltaMs: number) {
    setOffsetMs((prev) => Math.max(0, prev + deltaMs));
  }

  async function saveOffset() {
    if (!project) return;
    setSaving(true);
    try {
      const updated = await updateProject(id, {
        vocal: { ...project.vocal, offset_ms: offsetMs },
      });
      setProject(updated);
    } finally {
      setSaving(false);
    }
  }

  // drag handlers on vocal strip
  function onMouseDown(e: React.MouseEvent) {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetMs;
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    const newOffset = Math.max(0, dragStartOffsetRef.current + dx / pxPerMsRef.current);
    setOffsetMs(Math.round(newOffset));
  }
  function onMouseUp() { isDraggingRef.current = false; }

  const vocalLeftPx = offsetMs * pxPerMsRef.current;
  const hasVocal = !!project?.vocal?.file_url;
  const fmtMs = (ms: number) => ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Timeline</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Sync your vocal to the beat. Drag the blue track to adjust offset.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Playback controls */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={togglePlayback}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={stopPlayback}>
              <Square className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground ml-2">
              {isPlaying ? 'Playing…' : 'Preview mix'}
            </span>
          </div>

          {/* Two-track editor */}
          <div
            className="relative overflow-hidden rounded-xl border border-border bg-card"
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {/* Beat track */}
            <div className="border-b border-border">
              <div className="flex items-center gap-3 px-4 py-2">
                <span className="text-xs font-medium text-muted-foreground w-16 shrink-0">BEAT</span>
                <div className="flex-1 relative">
                  <canvas
                    ref={beatCanvasRef}
                    width={800}
                    height={60}
                    className="w-full h-15 rounded"
                  />
                  {beatDuration > 0 && (
                    <span className="absolute right-1 top-1 text-xs text-muted-foreground">
                      {Math.floor(beatDuration / 60)}:{String(Math.floor(beatDuration % 60)).padStart(2, '0')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Vocal track */}
            <div>
              <div className="flex items-center gap-3 px-4 py-2">
                <span className="text-xs font-medium text-muted-foreground w-16 shrink-0">VOCAL</span>
                <div className="flex-1 relative h-15 overflow-hidden">
                  {hasVocal ? (
                    <div
                      className="absolute top-0 cursor-grab active:cursor-grabbing"
                      style={{ left: `${vocalLeftPx}px` }}
                      onMouseDown={onMouseDown}
                    >
                      <canvas
                        ref={vocalCanvasRef}
                        width={Math.round((vocalDuration / Math.max(beatDuration, 1)) * 800)}
                        height={60}
                        className="rounded border border-blue-500/40 bg-blue-500/10"
                      />
                    </div>
                  ) : (
                    <div className="flex h-15 items-center">
                      <p className="text-xs text-muted-foreground">
                        No vocal yet — go to{' '}
                        <button
                          className="text-primary hover:underline"
                          onClick={() => router.push(`/studio/project/${id}/record`)}
                        >
                          Record
                        </button>{' '}
                        first.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Offset controls */}
          {hasVocal && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => nudge(-100)}>
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                <span className="text-sm font-mono w-24 text-center text-foreground">
                  {fmtMs(offsetMs)}
                </span>
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => nudge(100)}>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">vocal offset</span>
              <Button size="sm" onClick={saveOffset} disabled={saving}>
                {saving ? 'Saving…' : 'Save Sync'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/studio/project/${id}/mix`)}
              >
                Next: Mix →
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
