'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Play, Pause, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { useToast } from '@/components/studio/ui/toast';
import { getProject, updateProject } from '@/lib/studio/db/projects';
import { AudioEngine, type PlaybackEffects } from '@/lib/studio/audio/engine';
import type { Project, EQSettings, CompressorSettings, ReverbSettings, AutotuneSettings, NoiseGateSettings } from '@/types/studio';

type SectionKey = 'eq' | 'compressor' | 'reverb' | 'autotune' | 'noise_gate';

function Slider({
  label,
  value,
  min,
  max,
  step = 0.01,
  unit = '',
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-mono">{value.toFixed(step < 1 ? 2 : 0)}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-primary h-1.5 rounded-full cursor-pointer"
      />
    </div>
  );
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${enabled ? 'bg-primary' : 'bg-border'}`}
    >
      <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${enabled ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
    </button>
  );
}

function Section({
  title,
  enabled,
  onToggle,
  children,
}: {
  title: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Toggle enabled={enabled} onChange={onToggle} />
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        {enabled && (
          <button onClick={() => setOpen((o) => !o)} className="text-muted-foreground hover:text-foreground">
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        )}
      </div>
      {enabled && open && <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">{children}</div>}
    </div>
  );
}

const GENRE_PRESETS: Record<string, Partial<Project['effects'] & { mix: Partial<Project['mix']> }>> = {
  'hip-hop': {
    mix: { beat_volume: 0.75, vocal_volume: 0.95 },
    eq: { enabled: true, low_gain: 2, mid_gain: -1, high_gain: 3 },
    compressor: { enabled: true, threshold: -18, ratio: 4, attack: 10, release: 80, makeup_gain: 4 },
    reverb: { enabled: true, type: 'room', decay: 1.5, pre_delay: 20, wet_level: 0.2, dry_level: 0.8 },
  },
  trap: {
    mix: { beat_volume: 0.7, vocal_volume: 1 },
    eq: { enabled: true, low_gain: 3, mid_gain: -2, high_gain: 4 },
    compressor: { enabled: true, threshold: -20, ratio: 6, attack: 5, release: 60, makeup_gain: 6 },
    reverb: { enabled: true, type: 'hall', decay: 2, pre_delay: 30, wet_level: 0.3, dry_level: 0.7 },
  },
  rnb: {
    mix: { beat_volume: 0.7, vocal_volume: 0.95 },
    eq: { enabled: true, low_gain: 1, mid_gain: 2, high_gain: 2 },
    compressor: { enabled: true, threshold: -15, ratio: 3, attack: 20, release: 100, makeup_gain: 3 },
    reverb: { enabled: true, type: 'plate', decay: 2.5, pre_delay: 25, wet_level: 0.35, dry_level: 0.65 },
  },
};

export default function MixPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const engineRef = useRef<AudioEngine | null>(null);

  // Local mix state (synced from project)
  const [mix, setMix] = useState({ beat_volume: 0.8, vocal_volume: 0.9, beat_pan: 0, vocal_pan: 0 });
  const [eq, setEq] = useState<EQSettings>({ enabled: false, low_gain: 0, mid_gain: 0, high_gain: 0 });
  const [comp, setComp] = useState<CompressorSettings>({ enabled: false, threshold: -18, ratio: 4, attack: 10, release: 80, makeup_gain: 3 });
  const [reverb, setReverb] = useState<ReverbSettings>({ enabled: false, type: 'room', decay: 1.5, pre_delay: 20, wet_level: 0.25, dry_level: 0.75 });
  const [autotune, setAutotune] = useState<AutotuneSettings>({ enabled: false, key: 'C', scale: 'major', strength: 0.5, retune_speed: 20, preserve_formants: true });
  const [noiseGate, setNoiseGate] = useState<NoiseGateSettings>({ enabled: false, threshold: -50, attack: 5, release: 50 });

  useEffect(() => {
    engineRef.current = new AudioEngine();
    return () => { engineRef.current?.dispose(); };
  }, []);

  useEffect(() => {
    getProject(id).then(async (p) => {
      if (!p) { setLoading(false); return; }
      setProject(p);
      setMix(p.mix);
      if (p.effects.eq) setEq(p.effects.eq);
      if (p.effects.compressor) setComp(p.effects.compressor);
      if (p.effects.reverb) setReverb(p.effects.reverb);
      if (p.effects.autotune) setAutotune(p.effects.autotune);
      if (p.effects.noise_gate) setNoiseGate(p.effects.noise_gate);

      const engine = engineRef.current!;
      try {
        if (p.beat?.file_url) await engine.loadBeat(p.beat.file_url);
        if (p.vocal?.file_url) await engine.loadVocal(p.vocal.file_url);
      } finally {
        setLoading(false);
      }
    });
  }, [id]);

  function buildEffects(): PlaybackEffects {
    return {
      beatVolume: mix.beat_volume,
      vocalVolume: mix.vocal_volume,
      beatPan: mix.beat_pan,
      vocalPan: mix.vocal_pan,
      eq: eq.enabled ? { low: eq.low_gain, mid: eq.mid_gain, high: eq.high_gain } : null,
      compressor: comp.enabled ? { threshold: comp.threshold, ratio: comp.ratio, attack: comp.attack, release: comp.release, makeup: comp.makeup_gain } : null,
      reverb: reverb.enabled ? { decay: reverb.decay, wet: reverb.wet_level } : null,
    };
  }

  function togglePlayback() {
    const engine = engineRef.current;
    if (!engine) return;
    if (isPlaying) {
      engine.pause();
      setIsPlaying(false);
    } else {
      engine.play(project?.vocal?.offset_ms ?? 0, buildEffects(), () => setIsPlaying(false));
      setIsPlaying(true);
    }
  }

  function applyPreset(genre: string) {
    const preset = GENRE_PRESETS[genre];
    if (!preset) return;
    if (preset.mix) setMix((m) => ({ ...m, ...preset.mix }));
    if (preset.eq) setEq({ ...eq, ...preset.eq } as EQSettings);
    if (preset.compressor) setComp({ ...comp, ...preset.compressor } as CompressorSettings);
    if (preset.reverb) setReverb({ ...reverb, ...preset.reverb } as ReverbSettings);
  }

  async function save() {
    if (!project) return;
    setSaving(true);
    try {
      const updated = await updateProject(id, {
        mix,
        effects: {
          eq: eq.enabled ? eq : null,
          compressor: comp.enabled ? comp : null,
          reverb: reverb.enabled ? reverb : null,
          autotune: autotune.enabled ? autotune : null,
          noise_gate: noiseGate.enabled ? noiseGate : null,
          deesser: project.effects.deesser,
        },
        status: 'mixing',
      });
      setProject(updated);
      toast('Mix & effects saved');
    } catch {
      toast('Failed to save mix', 'error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Mix</h2>
          <p className="text-sm text-muted-foreground mt-1">Adjust levels, panning, and effects.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={togglePlayback}>
            {isPlaying ? <Pause className="h-3.5 w-3.5 mr-1.5" /> : <Play className="h-3.5 w-3.5 mr-1.5" />}
            {isPlaying ? 'Pause' : 'Preview'}
          </Button>
        </div>
      </div>

      {/* Genre preset */}
      {project?.genre && GENRE_PRESETS[project.genre] && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            AI preset available for <span className="text-foreground font-medium capitalize">{project.genre}</span>
          </p>
          <Button variant="outline" size="sm" onClick={() => applyPreset(project.genre)}>
            Apply Preset
          </Button>
        </div>
      )}

      {/* Levels */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-4">
        <h3 className="text-sm font-medium text-foreground">Levels</h3>
        <Slider label="Beat Volume" value={mix.beat_volume} min={0} max={1.5} step={0.01} unit="" onChange={(v) => setMix((m) => ({ ...m, beat_volume: v }))} />
        <Slider label="Beat Pan" value={mix.beat_pan} min={-1} max={1} step={0.01} unit="" onChange={(v) => setMix((m) => ({ ...m, beat_pan: v }))} />
        <Slider label="Vocal Volume" value={mix.vocal_volume} min={0} max={1.5} step={0.01} unit="" onChange={(v) => setMix((m) => ({ ...m, vocal_volume: v }))} />
        <Slider label="Vocal Pan" value={mix.vocal_pan} min={-1} max={1} step={0.01} unit="" onChange={(v) => setMix((m) => ({ ...m, vocal_pan: v }))} />
      </div>

      {/* EQ */}
      <Section title="EQ (3-Band)" enabled={eq.enabled} onToggle={(v) => setEq((e) => ({ ...e, enabled: v }))}>
        <Slider label="Low Shelf (250Hz)" value={eq.low_gain} min={-12} max={12} step={0.5} unit=" dB" onChange={(v) => setEq((e) => ({ ...e, low_gain: v }))} />
        <Slider label="Mid Peak (1kHz)" value={eq.mid_gain} min={-12} max={12} step={0.5} unit=" dB" onChange={(v) => setEq((e) => ({ ...e, mid_gain: v }))} />
        <Slider label="High Shelf (8kHz)" value={eq.high_gain} min={-12} max={12} step={0.5} unit=" dB" onChange={(v) => setEq((e) => ({ ...e, high_gain: v }))} />
      </Section>

      {/* Compressor */}
      <Section title="Compressor" enabled={comp.enabled} onToggle={(v) => setComp((c) => ({ ...c, enabled: v }))}>
        <Slider label="Threshold" value={comp.threshold} min={-60} max={0} step={1} unit=" dB" onChange={(v) => setComp((c) => ({ ...c, threshold: v }))} />
        <Slider label="Ratio" value={comp.ratio} min={1} max={20} step={0.5} unit=":1" onChange={(v) => setComp((c) => ({ ...c, ratio: v }))} />
        <Slider label="Attack" value={comp.attack} min={0} max={200} step={1} unit=" ms" onChange={(v) => setComp((c) => ({ ...c, attack: v }))} />
        <Slider label="Release" value={comp.release} min={10} max={1000} step={10} unit=" ms" onChange={(v) => setComp((c) => ({ ...c, release: v }))} />
        <Slider label="Makeup Gain" value={comp.makeup_gain} min={0} max={20} step={0.5} unit=" dB" onChange={(v) => setComp((c) => ({ ...c, makeup_gain: v }))} />
      </Section>

      {/* Reverb */}
      <Section title="Reverb" enabled={reverb.enabled} onToggle={(v) => setReverb((r) => ({ ...r, enabled: v }))}>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Type</label>
          <select
            value={reverb.type}
            onChange={(e) => setReverb((r) => ({ ...r, type: e.target.value as ReverbSettings['type'] }))}
            className="w-full rounded-md border border-border bg-input px-3 py-1.5 text-sm text-foreground"
          >
            {['room', 'hall', 'plate', 'spring'].map((t) => (
              <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>
        <Slider label="Decay" value={reverb.decay} min={0.1} max={8} step={0.1} unit=" s" onChange={(v) => setReverb((r) => ({ ...r, decay: v }))} />
        <Slider label="Pre-Delay" value={reverb.pre_delay} min={0} max={100} step={1} unit=" ms" onChange={(v) => setReverb((r) => ({ ...r, pre_delay: v }))} />
        <Slider label="Wet/Dry" value={reverb.wet_level} min={0} max={1} step={0.01} unit="" onChange={(v) => setReverb((r) => ({ ...r, wet_level: v, dry_level: 1 - v }))} />
      </Section>

      {/* Autotune */}
      <Section title="Autotune / Pitch Correction" enabled={autotune.enabled} onToggle={(v) => setAutotune((a) => ({ ...a, enabled: v }))}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Key</label>
            <select
              value={autotune.key}
              onChange={(e) => setAutotune((a) => ({ ...a, key: e.target.value }))}
              className="w-full rounded-md border border-border bg-input px-3 py-1.5 text-sm text-foreground"
            >
              {['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'].map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Scale</label>
            <select
              value={autotune.scale}
              onChange={(e) => setAutotune((a) => ({ ...a, scale: e.target.value as AutotuneSettings['scale'] }))}
              className="w-full rounded-md border border-border bg-input px-3 py-1.5 text-sm text-foreground"
            >
              {['major', 'minor', 'chromatic'].map((s) => (
                <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
        <Slider label="Strength" value={autotune.strength} min={0} max={1} step={0.05} onChange={(v) => setAutotune((a) => ({ ...a, strength: v }))} />
        <Slider label="Retune Speed" value={autotune.retune_speed} min={0} max={100} step={5} unit=" ms" onChange={(v) => setAutotune((a) => ({ ...a, retune_speed: v }))} />
        <p className="text-xs text-muted-foreground">Note: Pitch correction is applied on export via offline rendering.</p>
      </Section>

      {/* Noise Gate */}
      <Section title="Noise Gate" enabled={noiseGate.enabled} onToggle={(v) => setNoiseGate((n) => ({ ...n, enabled: v }))}>
        <Slider label="Threshold" value={noiseGate.threshold} min={-90} max={-20} step={1} unit=" dB" onChange={(v) => setNoiseGate((n) => ({ ...n, threshold: v }))} />
        <Slider label="Attack" value={noiseGate.attack} min={0} max={100} step={1} unit=" ms" onChange={(v) => setNoiseGate((n) => ({ ...n, attack: v }))} />
        <Slider label="Release" value={noiseGate.release} min={10} max={500} step={10} unit=" ms" onChange={(v) => setNoiseGate((n) => ({ ...n, release: v }))} />
      </Section>

      {/* Save */}
      <div className="flex gap-3">
        <Button onClick={save} disabled={saving}>
          {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving…</> : 'Save Mix'}
        </Button>
        <Button variant="outline" onClick={() => router.push(`/studio/project/${id}/feedback`)}>
          Next: AI Feedback →
        </Button>
      </div>
    </div>
  );
}
