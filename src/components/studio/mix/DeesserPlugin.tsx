'use client';

import type { DeesserSettings } from '@/types/studio';

interface Props { settings: DeesserSettings; onChange: (s: DeesserSettings) => void; }

export function DeesserPlugin({ settings, onChange }: Props) {
  const set = (k: keyof DeesserSettings, v: unknown) => onChange({ ...settings, [k]: v });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input type="checkbox" id="ds-enabled" checked={settings.enabled}
          onChange={(e) => set('enabled', e.target.checked)} className="accent-primary" />
        <label htmlFor="ds-enabled" className="text-sm font-medium text-foreground cursor-pointer">De-esser</label>
      </div>
      {settings.enabled && (
        <div className="space-y-2 pl-4 border-l border-border">
          {[
            { label: 'Frequency', key: 'frequency' as const, min: 2000, max: 10000, step: 100, unit: 'Hz', fmt: (v: number) => `${(v/1000).toFixed(1)}kHz` },
            { label: 'Threshold', key: 'threshold' as const, min: -60, max: 0, step: 1, unit: 'dB', fmt: (v: number) => `${v}dB` },
            { label: 'Reduction', key: 'reduction' as const, min: -20, max: 0, step: 1, unit: 'dB', fmt: (v: number) => `${v}dB` },
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
