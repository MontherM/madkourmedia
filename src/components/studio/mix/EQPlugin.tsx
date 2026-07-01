'use client';

import type { EQSettings } from '@/types/studio';

interface Props { settings: EQSettings; onChange: (s: EQSettings) => void; }

function GainSlider({ label, freq, value, onChange }: { label: string; freq: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] text-muted-foreground">{freq}</span>
      <input type="range" min={-12} max={12} step={0.5} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-24 accent-primary cursor-pointer"
        style={{ writingMode: 'vertical-lr', direction: 'rtl' }} />
      <span className="text-[10px] font-mono text-foreground">{value > 0 ? '+' : ''}{value}dB</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}

export function EQPlugin({ settings, onChange }: Props) {
  const set = (k: keyof EQSettings, v: unknown) => onChange({ ...settings, [k]: v });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input type="checkbox" id="eq-enabled" checked={settings.enabled}
          onChange={(e) => set('enabled', e.target.checked)} className="accent-primary" />
        <label htmlFor="eq-enabled" className="text-sm font-medium text-foreground cursor-pointer">3-Band EQ</label>
      </div>
      {settings.enabled && (
        <div className="flex justify-around items-end pl-4 border-l border-border py-2">
          <GainSlider label="Low" freq="100Hz" value={settings.low_gain} onChange={(v) => set('low_gain', v)} />
          <GainSlider label="Mid" freq="1kHz" value={settings.mid_gain} onChange={(v) => set('mid_gain', v)} />
          <GainSlider label="High" freq="10kHz" value={settings.high_gain} onChange={(v) => set('high_gain', v)} />
        </div>
      )}
    </div>
  );
}
