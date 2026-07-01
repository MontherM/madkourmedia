'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Mic, Square, Play, Pause, AlertCircle } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { cn } from '@/lib/utils';
import { getSupabaseBrowserClient } from '@/lib/studio/db/supabase';
import { updateProject } from '@/lib/studio/db/projects';
import type { Project } from '@/types/studio';

interface BrowserRecorderProps {
  projectId: string;
  project: Project;
  onRecorded: (updated: Project) => void;
}

type RecorderState = 'idle' | 'requesting' | 'ready' | 'recording' | 'recorded' | 'uploading' | 'error';

export function BrowserRecorder({ projectId, project, onRecorded }: BrowserRecorderProps) {
  const [state, setState] = useState<RecorderState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [level, setLevel] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const beatAudioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recordedBlobRef = useRef<Blob | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const [previewing, setPreviewing] = useState(false);

  const cleanup = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (beatAudioRef.current) { beatAudioRef.current.pause(); beatAudioRef.current.currentTime = 0; }
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  async function requestMic() {
    setState('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      streamRef.current = stream;

      // Set up analyser for level meter
      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      setState('ready');
    } catch {
      setErrorMsg('Microphone access denied. Please allow microphone access and try again.');
      setState('error');
    }
  }

  function startRecording() {
    if (!streamRef.current) return;
    chunksRef.current = [];

    // Play beat if available
    if (project.beat?.file_url) {
      beatAudioRef.current = new Audio(project.beat.file_url);
      beatAudioRef.current.play().catch(() => {});
    }

    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus' : 'audio/webm';
    const recorder = new MediaRecorder(streamRef.current, { mimeType });
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    recorder.onstop = () => {
      recordedBlobRef.current = new Blob(chunksRef.current, { type: mimeType });
    };
    recorder.start(100);
    mediaRecorderRef.current = recorder;

    // Timer
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000);

    // Level meter
    drawLevel();
    setState('recording');
  }

  function stopRecording() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (beatAudioRef.current) { beatAudioRef.current.pause(); beatAudioRef.current.currentTime = 0; }
    mediaRecorderRef.current?.stop();
    setState('recorded');
  }

  function drawLevel() {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);
    const avg = data.reduce((s, v) => s + v, 0) / data.length;
    setLevel(avg / 128);

    // Waveform canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'hsl(220 13% 6%)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'hsl(131 34% 57%)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const sliceWidth = canvas.width / data.length;
        data.forEach((v, i) => {
          const y = (1 - v / 255) * canvas.height;
          i === 0 ? ctx.moveTo(0, y) : ctx.lineTo(i * sliceWidth, y);
        });
        ctx.stroke();
      }
    }
    animFrameRef.current = requestAnimationFrame(drawLevel);
  }

  async function uploadRecording() {
    if (!recordedBlobRef.current) return;
    setState('uploading');
    try {
      const supabase = getSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const path = `${user.id}/${projectId}/vocal.webm`;
      const { error: storageError } = await supabase.storage
        .from('studio-audio')
        .upload(path, recordedBlobRef.current, { upsert: true, contentType: 'audio/webm' });
      if (storageError) throw new Error(storageError.message);

      const { data: { signedUrl } } = await supabase.storage
        .from('studio-audio')
        .createSignedUrl(path, 60 * 60 * 24 * 7);

      const updated = await updateProject(projectId, {
        vocal: {
          ...project.vocal,
          file_url: signedUrl ?? '',
          file_name: 'recording.webm',
          duration: elapsed,
          recording_method: 'browser',
          offset_ms: 0,
          waveform_data: null,
        },
        status: 'mixing',
      });
      onRecorded(updated);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Upload failed');
      setState('error');
    }
  }

  function togglePreview() {
    if (!recordedBlobRef.current) return;
    if (previewing) {
      previewAudioRef.current?.pause();
      setPreviewing(false);
    } else {
      const url = URL.createObjectURL(recordedBlobRef.current);
      previewAudioRef.current = new Audio(url);
      previewAudioRef.current.play();
      previewAudioRef.current.onended = () => setPreviewing(false);
      setPreviewing(true);
    }
  }

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="space-y-4">
      {state === 'error' && (
        <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Waveform canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={80}
        className="w-full rounded-lg bg-card border border-border"
      />

      {/* Level meter */}
      {state === 'recording' && (
        <div className="flex items-center gap-2">
          <Mic className="h-4 w-4 text-destructive animate-pulse" />
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-75 rounded-full"
              style={{ width: `${level * 100}%` }}
            />
          </div>
          <span className="text-sm font-mono text-muted-foreground">{fmt(elapsed)}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3">
        {state === 'idle' && (
          <Button onClick={requestMic}>
            <Mic className="h-4 w-4 mr-2" />
            Enable Microphone
          </Button>
        )}

        {state === 'requesting' && (
          <Button disabled>Requesting access...</Button>
        )}

        {state === 'ready' && (
          <Button onClick={startRecording} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            <Mic className="h-4 w-4 mr-2" />
            Start Recording
          </Button>
        )}

        {state === 'recording' && (
          <Button onClick={stopRecording} variant="outline">
            <Square className="h-4 w-4 mr-2" />
            Stop · {fmt(elapsed)}
          </Button>
        )}

        {state === 'recorded' && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={togglePreview}>
              {previewing ? <Pause className="h-3.5 w-3.5 mr-1" /> : <Play className="h-3.5 w-3.5 mr-1" />}
              {previewing ? 'Pause' : 'Preview'}
            </Button>
            <Button onClick={uploadRecording} size="sm">
              Save Take
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { recordedBlobRef.current = null; setState('ready'); }}>
              Discard
            </Button>
          </div>
        )}

        {state === 'uploading' && <Button disabled>Saving...</Button>}
      </div>
    </div>
  );
}
