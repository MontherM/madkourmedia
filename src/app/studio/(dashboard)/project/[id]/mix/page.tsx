'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { ChannelStrip } from '@/components/studio/mix/ChannelStrip';
import { EffectsRack } from '@/components/studio/mix/EffectsRack';
import { useToast } from '@/components/studio/ui/toast';
import { getProject, updateProject } from '@/lib/studio/db/projects';
import { getPreset } from '@/lib/studio/ai/presets';
import type { Project, ProjectEffects, GenreValue } from '@/types/studio';

export default function MixPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [beatMuted, setBeatMuted] = useState(false);
  const [vocalMuted, setVocalMuted] = useState(false);

  const [beatVol, setBeatVol] = useState(0.8);
  const [vocalVol, setVocalVol] = useState(0.9);
  const [beatPan, setBeatPan] = useState(0);
  const [vocalPan, setVocalPan] = useState(0);
  const [effects, setEffects] = useState<ProjectEffects>({ eq: null, compressor: null, deesser: null, reverb: null, autotune: null, noise_gate: null });

  useEffect(() => {
    getProject(id).then((p) => {
      if (!p) return;
      setProject(p);
      setBeatVol(p.mix?.beat_volume ?? 0.8);
      setVocalVol(p.mix?.vocal_volume ?? 0.9);
      setBeatPan(p.mix?.beat_pan ?? 0);
      setVocalPan(p.mix?.vocal_pan ?? 0);
      setEffects(p.effects ?? { eq: null, compressor: null, deesser: null, reverb: null, autotune: null, noise_gate: null });
    });
  }, [id]);

  function applyPreset() {
    if (!project?.genre) return;
    const preset = getPreset(project.genre as GenreValue);
    setEffects((prev) => ({
      ...prev,
      ...(preset.eq !== undefined ? { eq: preset.eq ?? null } : {}),
      ...(preset.compressor !== undefined ? { compressor: preset.compressor ?? null } : {}),
      ...(preset.reverb !== undefined ? { reverb: preset.reverb ?? null } : {}),
      ...(preset.autotune !== undefined ? { autotune: preset.autotune ?? null } : {}),
    }));
  }

  async function saveMix() {
    if (!project) return;
    setSaving(true);
    try {
      const updated = await updateProject(id, {
        mix: { beat_volume: beatVol, vocal_volume: vocalVol, beat_pan: beatPan, vocal_pan: vocalPan },
        effects,
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

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Mix</h2>
          <p className="text-sm text-muted-foreground mt-1">Adjust levels, panning, and apply effects to your vocal.</p>
        </div>
        {project?.genre && (
          <Button variant="outline" size="sm" onClick={applyPreset} className="shrink-0 gap-1.5">
            <Wand2 className="h-3.5 w-3.5" />
            Apply {project.genre} Preset
          </Button>
        )}
      </div>

      {/* Channel strips */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Channels</h3>
        <div className="flex gap-4">
          <ChannelStrip label="Beat" color="#6DBB7D" volume={beatVol} pan={beatPan} muted={beatMuted}
            onVolumeChange={setBeatVol} onPanChange={setBeatPan} onMuteToggle={() => setBeatMuted(v => !v)} />
          <ChannelStrip label="Vocal" color="#60A5FA" volume={vocalVol} pan={vocalPan} muted={vocalMuted}
            onVolumeChange={setVocalVol} onPanChange={setVocalPan} onMuteToggle={() => setVocalMuted(v => !v)} />
        </div>
      </div>

      {/* Effects Rack */}
      <EffectsRack effects={effects} onChange={setEffects} />

      <div className="flex items-center gap-3">
        <Button onClick={saveMix} size="sm" disabled={saving}>
          {saving ? 'Saving…' : 'Save Mix & Effects'}
        </Button>
        <Button variant="outline" size="sm" onClick={() => router.push(`/studio/project/${id}/feedback`)}>
          Next: AI Feedback →
        </Button>
      </div>
    </div>
  );
}
