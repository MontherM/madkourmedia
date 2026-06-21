import { notFound } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/studio/db/supabase-server';
import { getProject } from '@/lib/studio/db/projects-server';
import { ProjectTabs } from '@/components/studio/project/ProjectTabs';

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const project = await getProject(supabase, id);

  if (!project) notFound();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="border-b border-border px-6 py-3">
        <h2 className="text-sm font-medium text-foreground truncate">{project.name}</h2>
        <p className="text-xs text-muted-foreground capitalize">{project.genre} · {project.status}</p>
      </div>
      <ProjectTabs projectId={id} />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
