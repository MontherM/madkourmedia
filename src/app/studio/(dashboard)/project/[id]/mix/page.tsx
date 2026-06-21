'use client';

import { useParams } from 'next/navigation';
import { Sliders } from 'lucide-react';

export default function MixPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Mix</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Adjust levels, panning, and apply effects to your vocal.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card py-20 text-center">
        <Sliders className="h-10 w-10 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">Mixer coming in Phase 5-7</p>
          <p className="mt-1 text-sm text-muted-foreground">
            EQ, Compressor, Reverb, De-esser, and Autotune — with AI genre presets.
          </p>
        </div>
      </div>
    </div>
  );
}
