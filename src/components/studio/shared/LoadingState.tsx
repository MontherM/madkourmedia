import { cn } from '@/lib/utils';

interface LoadingStateProps {
  className?: string;
  text?: string;
}

export function LoadingState({ className, text = 'Loading...' }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-1 items-center justify-center gap-3 py-24', className)}>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  );
}
