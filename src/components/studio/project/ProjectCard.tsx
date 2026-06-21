'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Music, MoreVertical, Trash2 } from 'lucide-react';
import type { Project } from '@/types/studio';
import { Badge } from '@/components/studio/ui/badge';
import { Button } from '@/components/studio/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'success' | 'outline' | 'warning'> = {
  draft: 'secondary',
  mixing: 'warning',
  ready: 'success',
  exported: 'outline',
};

const GENRE_COLORS: Record<string, string> = {
  'hip-hop': 'from-orange-500/20 to-yellow-500/20',
  rnb: 'from-purple-500/20 to-pink-500/20',
  trap: 'from-red-500/20 to-orange-500/20',
  drill: 'from-blue-500/20 to-cyan-500/20',
  dancehall: 'from-green-500/20 to-teal-500/20',
  afrobeat: 'from-amber-500/20 to-orange-500/20',
  pop: 'from-pink-500/20 to-rose-500/20',
  'singer-songwriter': 'from-slate-500/20 to-gray-500/20',
  other: 'from-indigo-500/20 to-violet-500/20',
};

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const gradientClass = GENRE_COLORS[project.genre] ?? GENRE_COLORS.other;
  const hasBeat = !!project.beat?.file_url;
  const hasVocal = !!project.vocal?.file_url;

  const relativeTime = project.updated_at
    ? formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })
    : '';

  return (
    <div className="group relative rounded-xl border border-border bg-card transition-shadow hover:shadow-md hover:shadow-black/20">
      {/* Gradient thumbnail */}
      <Link href={`/studio/project/${project.id}/setup`}>
        <div
          className={cn(
            'flex h-32 items-center justify-center rounded-t-xl bg-gradient-to-br',
            gradientClass
          )}
        >
          <Music className="h-10 w-10 text-foreground/30" />
        </div>
      </Link>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/studio/project/${project.id}/setup`}>
              <h3 className="truncate font-medium text-foreground leading-snug hover:text-primary transition-colors">
                {project.name}
              </h3>
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground capitalize">{project.genre}</p>
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-8 z-20 w-36 rounded-md border border-border bg-popover p-1 shadow-lg">
                  <button
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-accent transition-colors"
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete(project.id);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span
              className={cn(
                'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold',
                hasBeat ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              )}
              title={hasBeat ? 'Beat uploaded' : 'No beat'}
            >
              B
            </span>
            <span
              className={cn(
                'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold',
                hasVocal ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              )}
              title={hasVocal ? 'Vocal recorded' : 'No vocal'}
            >
              V
            </span>
          </div>
          <Badge variant={STATUS_VARIANT[project.status] ?? 'secondary'} className="capitalize">
            {project.status}
          </Badge>
        </div>

        {relativeTime && (
          <p className="mt-2 text-[11px] text-muted-foreground">{relativeTime}</p>
        )}
      </div>
    </div>
  );
}
