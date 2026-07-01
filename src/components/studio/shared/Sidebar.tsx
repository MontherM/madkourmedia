'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/studio';
import { Badge } from '@/components/studio/ui/badge';
import { NewProjectModal } from '@/components/studio/project/NewProjectModal';

const STATUS_VARIANT = {
  draft: 'secondary',
  mixing: 'warning',
  ready: 'success',
  exported: 'outline',
} as const;

interface SidebarProps {
  projects: Project[];
}

export function Sidebar({ projects }: SidebarProps) {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-background">
        <div className="flex items-center justify-between px-3 py-3 border-b border-border">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Projects</span>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center h-6 w-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title="New project"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {projects.length === 0 ? (
            <div className="px-3 py-6 text-center">
              <p className="text-xs text-muted-foreground mb-3">No projects yet</p>
              <button
                onClick={() => setModalOpen(true)}
                className="text-xs text-primary hover:underline"
              >
                Create your first demo
              </button>
            </div>
          ) : (
            <ul className="space-y-0.5 px-2">
              {projects.map((project) => {
                const href = `/studio/project/${project.id}/setup`;
                const isActive = pathname.startsWith(`/studio/project/${project.id}`);
                const variant = STATUS_VARIANT[project.status] ?? 'secondary';
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
                      <Badge variant={variant} className="text-[10px] px-1.5 py-0 shrink-0">
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

      <NewProjectModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
