'use client';

import type { NoiseGateSettings } from '@/types/studio';

interface Props { settings: NoiseGateSettings; onChange: (s: NoiseGateSettings) => void; }

export function NoiseGatePlugin({ settings, onChange }: Props) {
  const set = (k: keyof NoiseGateSettings, v: unknown) => onChange({ ...settings, [k]: v });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input type="checkbox" id="ng-enabled" checked={settings.enabled}
          onChange={(e) => set('enabled', e.target.checked)} className="accent-primary" />
        <label htmlFor="ng-enabled" className="text-sm font-medium text-foreground cursor-pointer">Noise Gate</label>
      </div>
      {settings.enabled && (
        <div className="space-y-2 pl-4 border-l border-border">
          {[
            { label: 'Threshold', key: 'threshold' as const, min: -60, max: 0, step: 1, fmt: (v: number) => `${v}dB` },
            { label: 'Attack', key: 'attack' as const, min: 0.1, max: 100, step: 0.1, fmt: (v: number) => `${v}ms` },
            { label: 'Release', key: 'release' as const, min: 10, max: 1000, step: 10, fmt: (v: number) => `${v}ms` },
          ].map(({ label, key, min, max, step, fmt }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-24 shrink-0">{label}</span>
              <input type="range" min={min} max={max} step={step} value={settings[key]}
                onChange={(e) => set(key, Number(e.target.value))} className="flex-1 accent-primary" />
              <span className="text-xs font-mono text-foreground w-16 text-right">{fmt(settings[key] as number)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
