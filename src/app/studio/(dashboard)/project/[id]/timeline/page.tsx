'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/studio/ui/button';
import { WaveformDisplay } from '@/components/studio/audio/WaveformDisplay';
import { TransportControls } from '@/components/studio/audio/TransportControls';
import { getProject, updateProject } from '@/lib/studio/db/projects';
import { loadAudioBuffer, generateWaveformPeaks, ensureAudioContext } from '@/lib/studio/audio/player';
import type { Project } from '@/types/studio';

export default function TimelinePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [beatPeaks, setBeatPeaks] = useState<number[]>([]);
  const [vocalPeaks, setVocalPeaks] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [offsetMs, setOffsetMs] = useState(0);

  const beatBufRef = useRef<AudioBuffer | null>(null);
  const vocalBufRef = useRef<AudioBuffer | null>(null);
  const beatSrcRef = useRef<AudioBufferSourceNode | null>(null);
  const vocalSrcRef = useRef<AudioBufferSourceNode | null>(null);
  const startTimeRef = useRef(0);
  const startOffsetRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    async function init() {
      const p = await getProject(id);
      if (!p) return;
      setProject(p);
      setOffsetMs(p.vocal?.offset_ms ?? 0);

      if (p.beat?.file_url) {
        try {
          const buf = await loadAudioBuffer(p.beat.file_url);
          beatBufRef.current = buf;
          setBeatPeaks(generateWaveformPeaks(buf));
          setDuration(buf.duration);
        } catch { /* Non-fatal */ }
      }
      if (p.vocal?.file_url) {
        try {
          const buf = await loadAudioBuffer(p.vocal.file_url);
          vocalBufRef.current = buf;
          setVocalPeaks(generateWaveformPeaks(buf));
        } catch { /* Non-fatal */ }
      }
      setLoading(false);
    }
    init();
    return () => { stopAll(); };
  }, [id]);

  function stopAll() {
    beatSrcRef.current?.stop();
    vocalSrcRef.current?.stop();
    beatSrcRef.current = null;
    vocalSrcRef.current = null;
    cancelAnimationFrame(rafRef.current);
  }

  async function play() {
    const ctx = await ensureAudioContext();
    stopAll();

    const now = ctx.currentTime;
    startOffsetRef.current = currentTime;
    startTimeRef.current = now;

    if (beatBufRef.current) {
      const src = ctx.createBufferSource();
      src.buffer = beatBufRef.current;
      src.connect(ctx.destination);
      src.start(now, currentTime);
      beatSrcRef.current = src;
    }
    if (vocalBufRef.current) {
      const vocalOffset = offsetMs / 1000;
      const src = ctx.createBufferSource();
      src.buffer = vocalBufRef.current;
      src.connect(ctx.destination);
      const vocalStart = Math.max(0, vocalOffset - currentTime);
      const vocalStartAt = vocalOffset > currentTime ? now + vocalStart : now;
      const startIn = vocalOffset > currentTime ? 0 : currentTime - vocalOffset;
      src.start(vocalStartAt, startIn);
      vocalSrcRef.current = src;
    }

    setIsPlaying(true);
    tick();
  }

  function tick() {
    const ctx = beatSrcRef.current?.context ?? vocalSrcRef.current?.context;
    if (!ctx) return;
    const t = startOffsetRef.current + (ctx.currentTime - startTimeRef.current);
    setCurrentTime(Math.min(t, duration));
    if (t < duration) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }

  function pause() {
    stopAll();
    setIsPlaying(false);
  }

  function stop() {
    stopAll();
    setIsPlaying(false);
    setCurrentTime(0);
  }

  async function saveOffset() {
    if (!project) return;
    const updated = await updateProject(id, {
      vocal: { ...project.vocal, offset_ms: offsetMs },
    });
    setProject(updated);
  }

  const progress = duration > 0 ? currentTime / duration : 0;

  if (loading) return <div className="p-6 text-sm text-muted-foreground">Loading audio...</div>;

  const hasBeat = beatPeaks.length > 0;
  const hasVocal = vocalPeaks.length > 0;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Timeline</h2>
        <p className="text-sm text-muted-foreground mt-1">Sync your beat and vocal. Adjust the vocal offset below.</p>
      </div>

      {!hasBeat && (
        <p className="text-sm text-muted-foreground">No beat uploaded yet. Go to Setup first.</p>
      )}

      {hasBeat && (
        <div className="space-y-3 rounded-xl border border-border bg-card p-4">
          {/* Beat track */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground w-12">BEAT</span>
              <div className="flex-1">
                <WaveformDisplay peaks={beatPeaks} color="#6DBB7D" height={48} progress={progress} />
              </div>
            </div>
          </div>

          {/* Vocal track */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground w-12">VOCAL</span>
              <div className="flex-1" style={{ marginLeft: `${Math.min(50, (offsetMs / 1000 / duration) * 100)}%` }}>
                {hasVocal ? (
                  <WaveformDisplay peaks={vocalPeaks} color="#60A5FA" height={48} progress={Math.max(0, progress - offsetMs / 1000 / duration)} />
                ) : (
                  <div className="h-12 rounded bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">No vocal recorded</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transport */}
      <div className="flex flex-wrap items-center gap-4">
        <TransportControls
          isPlaying={isPlaying}
          onPlay={play}
          onPause={pause}
          onStop={stop}
          onRestart={() => { stop(); }}
          currentTime={currentTime}
          duration={duration}
        />
      </div>

      {/* Offset control */}
      {hasVocal && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Vocal Offset</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={-5000}
              max={Math.max(5000, (duration * 1000) / 2)}
              value={offsetMs}
              onChange={(e) => setOffsetMs(Number(e.target.value))}
              className="flex-1 accent-primary"
            />
            <span className="font-mono text-sm text-muted-foreground w-20 text-right">
              {offsetMs >= 0 ? '+' : ''}{(offsetMs / 1000).toFixed(2)}s
            </span>
            <Button size="sm" onClick={saveOffset}>Save</Button>
          </div>
          <p className="text-xs text-muted-foreground">Drag to shift vocal start relative to beat</p>
        </div>
      )}

      {hasBeat && (
        <Button variant="outline" size="sm" onClick={() => router.push(`/studio/project/${id}/mix`)}>
          Next: Mix →
        </Button>
      )}
    </div>
  );
}
