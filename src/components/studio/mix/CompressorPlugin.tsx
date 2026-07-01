'use client';

import type { CompressorSettings } from '@/types/studio';

interface Props { settings: CompressorSettings; onChange: (s: CompressorSettings) => void; }

function Row({ label, min, max, step = 1, value, onChange, unit = '' }: {
  label: string; min: number; max: number; step?: number;
  value: number; onChange: (v: number) => void; unit?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-24 shrink-0">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} className="flex-1 accent-primary" />
      <span className="text-xs font-mono text-foreground w-16 text-right">{value}{unit}</span>
    </div>
  );
}

export function CompressorPlugin({ settings, onChange }: Props) {
  const set = (k: keyof CompressorSettings, v: unknown) => onChange({ ...settings, [k]: v });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input type="checkbox" id="cmp-enabled" checked={settings.enabled}
          onChange={(e) => set('enabled', e.target.checked)} className="accent-primary" />
        <label htmlFor="cmp-enabled" className="text-sm font-medium text-foreground cursor-pointer">Compressor</label>
      </div>
      {settings.enabled && (
        <div className="space-y-2 pl-4 border-l border-border">
          <Row label="Threshold" min={-60} max={0} value={settings.threshold} onChange={(v) => set('threshold', v)} unit="dB" />
          <Row label="Ratio" min={1} max={20} step={0.5} value={settings.ratio} onChange={(v) => set('ratio', v)} unit=":1" />
          <Row label="Attack" min={0.1} max={100} step={0.1} value={settings.attack} onChange={(v) => set('attack', v)} unit="ms" />
          <Row label="Release" min={10} max={1000} value={settings.release} onChange={(v) => set('release', v)} unit="ms" />
          <Row label="Makeup Gain" min={0} max={24} value={settings.makeup_gain} onChange={(v) => set('makeup_gain', v)} unit="dB" />
        </div>
      )}
    </div>
  );
}
