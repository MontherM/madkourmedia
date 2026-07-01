'use client';

import { Play, Pause, Square, SkipBack } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { cn } from '@/lib/utils';

interface TransportControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onRestart: () => void;
  currentTime: number;
  duration: number;
  className?: string;
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

export function TransportControls({
  isPlaying, onPlay, onPause, onStop, onRestart,
  currentTime, duration, className,
}: TransportControlsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button variant="ghost" size="icon" onClick={onRestart} title="Restart">
        <SkipBack className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={isPlaying ? onPause : onPlay}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <Button variant="ghost" size="icon" onClick={onStop} title="Stop">
        <Square className="h-4 w-4" />
      </Button>
      <span className="ml-2 font-mono text-sm text-muted-foreground tabular-nums">
        {fmt(currentTime)} / {fmt(duration)}
      </span>
    </div>
  );
}
