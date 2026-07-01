'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/studio/ui/button';
import { ChannelStrip } from '@/components/studio/mix/ChannelStrip';
import { getProject, updateProject } from '@/lib/studio/db/projects';
import { TransportControls } from '@/components/studio/audio/TransportControls';
import { ensureAudioContext } from '@/lib/studio/audio/player';
import type { Project } from '@/types/studio';

export default function MixPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [beatMuted, setBeatMuted] = useState(false);
  const [vocalMuted, setVocalMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Local mix state
  const [beatVol, setBeatVol] = useState(0.8);
  const [vocalVol, setVocalVol] = useState(0.9);
  const [beatPan, setBeatPan] = useState(0);
  const [vocalPan, setVocalPan] = useState(0);

  useEffect(() => {
    getProject(id).then((p) => {
      if (!p) return;
      setProject(p);
      setBeatVol(p.mix?.beat_volume ?? 0.8);
      setVocalVol(p.mix?.vocal_volume ?? 0.9);
      setBeatPan(p.mix?.beat_pan ?? 0);
      setVocalPan(p.mix?.vocal_pan ?? 0);
    });
  }, [id]);

  async function saveMix() {
    if (!project) return;
    setSaving(true);
    try {
      const updated = await updateProject(id, {
        mix: { beat_volume: beatVol, vocal_volume: vocalVol, beat_pan: beatPan, vocal_pan: vocalPan },
      });
      setProject(updated);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Mix</h2>
        <p className="text-sm text-muted-foreground mt-1">Adjust levels and panning for each track.</p>
      </div>

      {/* Channel strips */}
      <div className="flex gap-4">
        <ChannelStrip
          label="Beat"
          color="#6DBB7D"
          volume={beatVol}
          pan={beatPan}
          muted={beatMuted}
          onVolumeChange={setBeatVol}
          onPanChange={setBeatPan}
          onMuteToggle={() => setBeatMuted((v) => !v)}
        />
        <ChannelStrip
          label="Vocal"
          color="#60A5FA"
          volume={vocalVol}
          pan={vocalPan}
          muted={vocalMuted}
          onVolumeChange={setVocalVol}
          onPanChange={setVocalPan}
          onMuteToggle={() => setVocalMuted((v) => !v)}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={saveMix} size="sm" disabled={saving}>
          {saving ? 'Saving…' : 'Save Mix'}
        </Button>
        <Button variant="outline" size="sm" onClick={() => router.push(`/studio/project/${id}/feedback`)}>
          Next: AI Feedback →
        </Button>
      </div>
    </div>
  );
}
