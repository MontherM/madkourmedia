'use client';

import { useParams } from 'next/navigation';
import { BrainCircuit } from 'lucide-react';

export default function FeedbackPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">AI Feedback</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Get intelligent analysis of your recording quality, timing, and structure.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card py-20 text-center">
        <BrainCircuit className="h-10 w-10 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">AI Feedback coming in Phase 8</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Transcription, timing analysis, mix suggestions, and creative feedback powered by GPT-4o-mini.
          </p>
        </div>
      </div>
    </div>
  );
}
