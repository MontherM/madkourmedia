'use client';

import { Label } from '@/components/studio/ui/label';
import { Select } from '@/components/studio/ui/select';
import type { AutotuneSettings } from '@/types/studio';

const MUSICAL_KEYS = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

interface Props {
  settings: AutotuneSettings;
  onChange: (s: AutotuneSettings) => void;
}

function Slider({ label, min, max, step = 0.01, value, onChange, fmt }: {
  label: string; min: number; max: number; step?: number;
  value: number; onChange: (v: number) => void; fmt?: (v: number) => string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs font-mono text-foreground">{fmt ? fmt(value) : value.toFixed(2)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-primary" />
    </div>
  );
}

export function AutotunePlugin({ settings, onChange }: Props) {
  const set = (k: keyof AutotuneSettings, v: unknown) => onChange({ ...settings, [k]: v });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input type="checkbox" id="at-enabled" checked={settings.enabled}
          onChange={(e) => set('enabled', e.target.checked)} className="accent-primary" />
        <label htmlFor="at-enabled" className="text-sm font-medium text-foreground cursor-pointer">Autotune</label>
      </div>
      {settings.enabled && (
        <div className="space-y-3 pl-4 border-l border-border">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Key</Label>
              <Select value={settings.key.split(' ')[0]} onChange={(e) => set('key', `${e.target.value} ${settings.scale}`)}>
                {MUSICAL_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Scale</Label>
              <Select value={settings.scale} onChange={(e) => set('scale', e.target.value)}>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
                <option value="chromatic">Chromatic</option>
              </Select>
            </div>
          </div>
          <Slider label="Strength" min={0} max={1} value={settings.strength} onChange={(v) => set('strength', v)}
            fmt={(v) => `${Math.round(v * 100)}%`} />
          <Slider label="Retune Speed" min={0} max={1} value={settings.retune_speed} onChange={(v) => set('retune_speed', v)}
            fmt={(v) => v < 0.3 ? 'Fast' : v < 0.7 ? 'Medium' : 'Slow'} />
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={settings.preserve_formants}
              onChange={(e) => set('preserve_formants', e.target.checked)} className="accent-primary" />
            Preserve Formants
          </label>
        </div>
      )}
    </div>
  );
}
