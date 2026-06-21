'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/studio';
import { Badge } from '@/components/studio/ui/badge';
import { Music } from 'lucide-react';

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'success' | 'outline'> = {
  draft: 'secondary',
  mixing: 'warning' as 'secondary',
  ready: 'success',
  exported: 'outline',
};

interface SidebarProps {
  projects: Project[];
}

export function Sidebar({ projects }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-background">
      <div className="flex-1 overflow-y-auto py-4">
        {projects.length === 0 ? (
          <p className="px-4 text-xs text-muted-foreground">No projects yet</p>
        ) : (
          <ul className="space-y-0.5 px-2">
            {projects.map((project) => {
              const href = `/studio/project/${project.id}/setup`;
              const isActive = pathname.startsWith(`/studio/project/${project.id}`);
              return (
                <li key={project.id}>
                  <Link
                    href={href}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-accent text-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    <Music className="h-3.5 w-3.5 shrink-0" />
                    <span className="flex-1 truncate">{project.name}</span>
                    <Badge variant={STATUS_VARIANT[project.status] ?? 'secondary'} className="text-[10px] px-1.5 py-0">
                      {project.status}
                    </Badge>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
