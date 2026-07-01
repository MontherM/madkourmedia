import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getSupabaseServerClient } from '@/lib/studio/db/supabase-server';
import { getProject } from '@/lib/studio/db/projects-server';
import { ProjectTabs } from '@/components/studio/project/ProjectTabs';
import { Badge } from '@/components/studio/ui/badge';

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

const STATUS_VARIANT = {
  draft: 'secondary',
  mixing: 'warning',
  ready: 'success',
  exported: 'outline',
} as const;

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const project = await getProject(supabase, id);

  if (!project) notFound();

  const variant = STATUS_VARIANT[project.status] ?? 'secondary';

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 mb-0.5">
          <Link
            href="/studio/dashboard"
            className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-3 w-3" />
            Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-foreground truncate">{project.name}</h2>
          <span className="text-muted-foreground text-xs">·</span>
          <span className="text-xs text-muted-foreground capitalize">{project.genre}</span>
          <Badge variant={variant} className="text-[10px] px-1.5 py-0 ml-auto">
            {project.status}
          </Badge>
        </div>
      </div>
      <ProjectTabs projectId={id} />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
