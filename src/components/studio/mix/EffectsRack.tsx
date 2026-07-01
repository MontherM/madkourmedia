'use client';

import { AutotunePlugin } from './AutotunePlugin';
import { EQPlugin } from './EQPlugin';
import { CompressorPlugin } from './CompressorPlugin';
import { ReverbPlugin } from './ReverbPlugin';
import { DeesserPlugin } from './DeesserPlugin';
import { NoiseGatePlugin } from './NoiseGatePlugin';
import type { ProjectEffects, AutotuneSettings, EQSettings, CompressorSettings, ReverbSettings, DeesserSettings, NoiseGateSettings } from '@/types/studio';

const DEFAULT_AUTOTUNE: AutotuneSettings = { enabled: false, key: 'C', scale: 'minor', strength: 0.5, retune_speed: 0.5, preserve_formants: true };
const DEFAULT_EQ: EQSettings = { enabled: false, low_gain: 0, mid_gain: 0, high_gain: 0 };
const DEFAULT_COMPRESSOR: CompressorSettings = { enabled: false, threshold: -18, ratio: 4, attack: 3, release: 100, makeup_gain: 0 };
const DEFAULT_REVERB: ReverbSettings = { enabled: false, type: 'room', decay: 1.5, pre_delay: 10, wet_level: 0.2, dry_level: 0.8 };
const DEFAULT_DEESSER: DeesserSettings = { enabled: false, frequency: 6000, threshold: -20, reduction: -6 };
const DEFAULT_NOISE_GATE: NoiseGateSettings = { enabled: false, threshold: -40, attack: 1, release: 100 };

interface Props {
  effects: ProjectEffects;
  onChange: (effects: ProjectEffects) => void;
}

export function EffectsRack({ effects, onChange }: Props) {
  const set = (k: keyof ProjectEffects, v: unknown) => onChange({ ...effects, [k]: v });

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">Vocal Effects Chain</h3>
      <div className="space-y-4 divide-y divide-border">
        <div className="pt-0">
          <AutotunePlugin settings={effects.autotune ?? DEFAULT_AUTOTUNE} onChange={(v) => set('autotune', v)} />
        </div>
        <div className="pt-4">
          <EQPlugin settings={effects.eq ?? DEFAULT_EQ} onChange={(v) => set('eq', v)} />
        </div>
        <div className="pt-4">
          <CompressorPlugin settings={effects.compressor ?? DEFAULT_COMPRESSOR} onChange={(v) => set('compressor', v)} />
        </div>
        <div className="pt-4">
          <ReverbPlugin settings={effects.reverb ?? DEFAULT_REVERB} onChange={(v) => set('reverb', v)} />
        </div>
        <div className="pt-4">
          <DeesserPlugin settings={effects.deesser ?? DEFAULT_DEESSER} onChange={(v) => set('deesser', v)} />
        </div>
        <div className="pt-4">
          <NoiseGatePlugin settings={effects.noise_gate ?? DEFAULT_NOISE_GATE} onChange={(v) => set('noise_gate', v)} />
        </div>
      </div>
    </div>
  );
}
