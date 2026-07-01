'use client';

import { Select } from '@/components/studio/ui/select';
import type { ReverbSettings } from '@/types/studio';

interface Props { settings: ReverbSettings; onChange: (s: ReverbSettings) => void; }

function Row({ label, min, max, step = 0.01, value, onChange, unit = '' }: {
  label: string; min: number; max: number; step?: number;
  value: number; onChange: (v: number) => void; unit?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-24 shrink-0">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} className="flex-1 accent-primary" />
      <span className="text-xs font-mono text-foreground w-16 text-right">{value.toFixed(2)}{unit}</span>
    </div>
  );
}

export function ReverbPlugin({ settings, onChange }: Props) {
  const set = (k: keyof ReverbSettings, v: unknown) => onChange({ ...settings, [k]: v });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input type="checkbox" id="rev-enabled" checked={settings.enabled}
          onChange={(e) => set('enabled', e.target.checked)} className="accent-primary" />
        <label htmlFor="rev-enabled" className="text-sm font-medium text-foreground cursor-pointer">Reverb</label>
      </div>
      {settings.enabled && (
        <div className="space-y-2 pl-4 border-l border-border">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-24 shrink-0">Type</span>
            <Select value={settings.type} onChange={(e) => set('type', e.target.value)} className="flex-1">
              <option value="room">Room</option>
              <option value="hall">Hall</option>
              <option value="plate">Plate</option>
              <option value="spring">Spring</option>
            </Select>
          </div>
          <Row label="Decay" min={0.1} max={10} step={0.1} value={settings.decay} onChange={(v) => set('decay', v)} unit="s" />
          <Row label="Pre-delay" min={0} max={100} step={1} value={settings.pre_delay} onChange={(v) => set('pre_delay', v)} unit="ms" />
          <Row label="Wet" min={0} max={1} value={settings.wet_level} onChange={(v) => set('wet_level', v)} />
          <Row label="Dry" min={0} max={1} value={settings.dry_level} onChange={(v) => set('dry_level', v)} />
        </div>
      )}
    </div>
  );
}
