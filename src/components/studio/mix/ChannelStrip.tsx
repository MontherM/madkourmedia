'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChannelStripProps {
  label: string;
  color?: string;
  volume: number;      // 0-1
  pan: number;         // -1 to 1
  muted: boolean;
  onVolumeChange: (v: number) => void;
  onPanChange: (v: number) => void;
  onMuteToggle: () => void;
}

export function ChannelStrip({ label, color = '#6DBB7D', volume, pan, muted, onVolumeChange, onPanChange, onMuteToggle }: ChannelStripProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 w-36">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>

      {/* Volume fader */}
      <div className="flex flex-col items-center gap-1 w-full">
        <input
          type="range"
          min={0} max={1} step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-full accent-primary"
          style={{ accentColor: color }}
        />
        <span className="text-xs font-mono text-muted-foreground">{Math.round(volume * 100)}%</span>
      </div>

      {/* Pan knob (simplified as range) */}
      <div className="flex flex-col items-center gap-1 w-full">
        <label className="text-[10px] text-muted-foreground">PAN</label>
        <input
          type="range"
          min={-1} max={1} step={0.01}
          value={pan}
          onChange={(e) => onPanChange(Number(e.target.value))}
          className="w-full"
        />
        <span className="text-xs font-mono text-muted-foreground">
          {pan === 0 ? 'C' : pan > 0 ? `R${Math.round(pan * 100)}` : `L${Math.round(-pan * 100)}`}
        </span>
      </div>

      {/* Mute */}
      <button
        onClick={onMuteToggle}
        className={cn(
          'flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors',
          muted ? 'bg-destructive/20 text-destructive' : 'bg-secondary text-muted-foreground hover:text-foreground'
        )}
      >
        {muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
        {muted ? 'Muted' : 'Live'}
      </button>
    </div>
  );
}
