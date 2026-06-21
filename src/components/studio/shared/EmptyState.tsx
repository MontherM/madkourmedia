import { Music2 } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';

interface EmptyStateProps {
  onCreateProject: () => void;
}

export function EmptyState({ onCreateProject }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Music2 className="h-10 w-10 text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">No projects yet</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Upload a beat, record your vocals, and export a demo — all in your browser.
        </p>
      </div>
      <Button onClick={onCreateProject} size="lg">
        Create your first demo
      </Button>
    </div>
  );
}
