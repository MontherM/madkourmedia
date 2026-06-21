'use client';

import { useParams } from 'next/navigation';
import { GitBranch } from 'lucide-react';

export default function TimelinePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Timeline</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Sync your beat and vocal. Drag the vocal track to adjust offset.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card py-20 text-center">
        <GitBranch className="h-10 w-10 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">Timeline coming in Phase 4</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Two-track editor with draggable vocal offset and precise sync controls.
          </p>
        </div>
      </div>
    </div>
  );
}
