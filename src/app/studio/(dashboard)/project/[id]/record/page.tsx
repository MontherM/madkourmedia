'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Mic, MicOff, Upload, Play, Pause, Headphones, Loader2, CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { getProject, updateProject } from '@/lib/studio/db/projects';
import { getSupabaseBrowserClient } from '@/lib/studio/db/supabase';
import { MAX_VOCAL_SIZE_MB } from '@/lib/studio/constants';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/studio';

type Mode = 'idle' | 'countdown' | 'recording' | 'recorded' | 'uploading' | 'done';

function VuMeter({ level }: { level: number }) {
  const bars = 20;
  return (
    <div className="flex items-end gap-0.5 h-10">
      {Array.from({ length: bars }).map((_, i) => {
        const threshold = (i + 1) / bars;
        const active = level > threshold;
        const color = i < 14 ? 'bg-primary' : i < 17 ? 'bg-amber-400' : 'bg-red-500';
        return (
          <div
            key={i}
            className={cn('w-2 rounded-sm transition-all duration-75', active ? color : 'bg-border')}
            style={{ height: `${30 + (i / bars) * 70}%` }}
          />
        );
      })}
    </div>
  );
}

function WaveformCanvas({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!url || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    const audioCtx = new AudioContext();
    fetch(url)
      .then((r) => r.arrayBuffer())
      .then((ab) => audioCtx.decodeAudioData(ab))
      .then((buf) => {
        const data = buf.getChannelData(0);
        const w = canvas.width;
        const h = canvas.height;
        const step = Math.ceil(data.length / w);
        ctx2d.clearRect(0, 0, w, h);
        ctx2d.strokeStyle = 'hsl(142 70% 45%)';
        ctx2d.lineWidth = 1;
        ctx2d.beginPath();
        for (let x = 0; x < w; x++) {
          let min = 1, max = -1;
          for (let s = 0; s < step; s++) {
            const v = data[x * step + s] ?? 0;
            if (v < min) min = v;
            if (v > max) max = v;
          }
          ctx2d.moveTo(x, (1 + min) * (h / 2));
          ctx2d.lineTo(x, (1 + max) * (h / 2));
        }
        ctx2d.stroke();
        audioCtx.close();
      })
      .catch(() => {});
  }, [url]);

  return <canvas ref={canvasRef} width={600} height={80} className="w-full h-20 rounded-lg bg-card" />;
}

export default function RecordPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [mode, setMode] = useState<Mode>('idle');
  const [countdown, setCountdown] = useState(3);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [vuLevel, setVuLevel] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    getProject(id).then((p) => p && setProject(p));
    return () => {
      clearInterval(timerRef.current!);
      cancelAnimationFrame(animRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      audioCtxRef.current?.close();
    };
  }, [id]);

  function startVuMeter(stream: MediaStream) {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const src = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    src.connect(analyser);
    analyserRef.current = analyser;
    const buf = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteFrequencyData(buf);
      const avg = buf.reduce((a, b) => a + b, 0) / buf.length / 255;
      setVuLevel(avg * 2.5);
      animRef.current = requestAnimationFrame(tick);
    };
    tick();
  }

  async function startCountdown() {
    setMode('countdown');
    setCountdown(3);
    for (let i = 3; i > 0; i--) {
      setCountdown(i);
      await new Promise((r) => setTimeout(r, 1000));
    }
    startRecording();
  }

  async function startRecording() {
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      startVuMeter(stream);

      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordedBlob(blob);
        setRecordedUrl(URL.createObjectURL(blob));
        setMode('recorded');
        cancelAnimationFrame(animRef.current);
        setVuLevel(0);
        stream.getTracks().forEach((t) => t.stop());
        clearInterval(timerRef.current!);
      };
      mr.start(100);
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
      setMode('recording');
    } catch {
      setMode('idle');
      setUploadError('Microphone access denied. Please allow microphone access and try again.');
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    clearInterval(timerRef.current!);
  }

  function togglePreview() {
    if (!recordedUrl) return;
    if (!audioRef.current) audioRef.current = new Audio(recordedUrl);
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      audioRef.current.onended = () => setIsPlaying(false);
      setIsPlaying(true);
    }
  }

  async function uploadVocal(source: Blob | File, ext: string) {
    if (!project) return;
    setMode('uploading');
    setUploadError(null);
    try {
      const supabase = getSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const path = `${user.id}/${id}/vocal.${ext}`;
      const { error: storageErr } = await supabase.storage
        .from('studio-audio')
        .upload(path, source, { upsert: true });
      if (storageErr) throw new Error(storageErr.message);

      const { data: { signedUrl } } = await supabase.storage
        .from('studio-audio')
        .createSignedUrl(path, 60 * 60 * 24 * 7);

      const duration = await getAudioDuration(source);
      const updated = await updateProject(id, {
        vocal: {
          ...project.vocal,
          file_url: signedUrl ?? '',
          file_name: `vocal.${ext}`,
          duration,
          recording_method: source instanceof File ? 'upload' : 'browser',
          offset_ms: project.vocal?.offset_ms ?? 0,
          waveform_data: null,
        },
        status: 'mixing',
      });
      setProject(updated);
      setMode('done');
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
      setMode('recorded');
    }
  }

  function getAudioDuration(source: Blob | File): Promise<number> {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(source);
      const a = document.createElement('audio');
      a.src = url;
      a.onloadedmetadata = () => { resolve(a.duration); URL.revokeObjectURL(url); };
      a.onerror = () => { resolve(0); URL.revokeObjectURL(url); };
    });
  }

  function handleFileUpload(file: File) {
    if (file.size > MAX_VOCAL_SIZE_MB * 1024 * 1024) {
      setUploadError(`File too large. Max ${MAX_VOCAL_SIZE_MB}MB.`);
      return;
    }
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'mp3';
    uploadVocal(file, ext);
  }

  function reset() {
    setMode('idle');
    setRecordedBlob(null);
    if (recordedUrl) URL.revokeObjectURL(recordedUrl);
    setRecordedUrl(null);
    setElapsed(0);
    setUploadError(null);
    audioRef.current = null;
  }

  const hasVocal = !!project?.vocal?.file_url;
  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

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
        <p className="text-sm text-amber-300">Wear headphones to prevent beat bleed into your recording.</p>
      </div>

      {/* Existing vocal */}
      {hasVocal && mode !== 'done' && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" /> Current Vocal
          </h3>
          <WaveformCanvas url={project!.vocal.file_url!} />
          <p className="text-xs text-muted-foreground">{project?.vocal?.file_name}</p>
        </section>
      )}

      {/* Done state */}
      {mode === 'done' && (
        <div className="rounded-xl border border-primary/40 bg-primary/5 p-6 text-center space-y-3">
          <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
          <p className="font-medium text-foreground">Vocal uploaded successfully!</p>
          {project?.vocal?.file_url && <WaveformCanvas url={project.vocal.file_url} />}
          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Record Again
            </Button>
            <Button size="sm" onClick={() => router.push(`/studio/project/${id}/timeline`)}>
              Next: Timeline →
            </Button>
          </div>
        </div>
      )}

      {mode !== 'done' && (
        <>
          {/* Mode select */}
          {mode === 'idle' && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={startCountdown}
                className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center transition-colors hover:border-primary hover:bg-primary/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Mic className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Record in Browser</p>
                  <p className="mt-1 text-xs text-muted-foreground">Use your microphone</p>
                </div>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center transition-colors hover:border-primary hover:bg-primary/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                  <Upload className="h-7 w-7 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Upload Vocal</p>
                  <p className="mt-1 text-xs text-muted-foreground">MP3, WAV, or FLAC</p>
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".mp3,.wav,.flac"
                className="sr-only"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }}
              />
            </div>
          )}

          {/* Countdown */}
          {mode === 'countdown' && (
            <div className="flex flex-col items-center justify-center gap-6 py-12">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-primary">
                <span className="text-6xl font-bold text-primary">{countdown}</span>
              </div>
              <p className="text-sm text-muted-foreground">Get ready…</p>
            </div>
          )}

          {/* Recording */}
          {mode === 'recording' && (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 animate-ping rounded-full bg-red-500/20" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-500">
                    <Mic className="h-8 w-8 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-mono text-foreground">{fmtTime(elapsed)}</p>
              </div>
              <VuMeter level={vuLevel} />
              <Button variant="destructive" className="w-full" onClick={stopRecording}>
                <MicOff className="h-4 w-4 mr-2" /> Stop Recording
              </Button>
            </div>
          )}

          {/* Recorded preview */}
          {mode === 'recorded' && recordedUrl && (
            <div className="space-y-4">
              <WaveformCanvas url={recordedUrl} />
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={togglePreview}>
                  {isPlaying ? <Pause className="h-3.5 w-3.5 mr-1.5" /> : <Play className="h-3.5 w-3.5 mr-1.5" />}
                  {isPlaying ? 'Pause' : 'Preview'}
                </Button>
                <span className="text-xs text-muted-foreground">{fmtTime(elapsed)} recorded</span>
              </div>
              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => recordedBlob && uploadVocal(recordedBlob, 'webm')}
                >
                  <Upload className="h-4 w-4 mr-2" /> Use This Take
                </Button>
                <Button variant="outline" onClick={reset}>
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Re-record
                </Button>
              </div>
            </div>
          )}

          {/* Uploading */}
          {mode === 'uploading' && (
            <div className="flex flex-col items-center gap-4 py-12">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Uploading vocal…</p>
            </div>
          )}
        </>
      )}

      {uploadError && (
        <p className="text-xs text-destructive">{uploadError}</p>
      )}
    </div>
  );
}
