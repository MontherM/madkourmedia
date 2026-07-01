import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/studio/db/supabase-server';
import { listProjects } from '@/lib/studio/db/projects-server';
import { StudioHeader } from '@/components/studio/shared/Header';
import { Sidebar } from '@/components/studio/shared/Sidebar';
import { ToastProvider } from '@/components/studio/ui/toast';
import type { Project } from '@/types/studio';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/studio/login');
  }

  let projects: Project[] = [];
  try {
    projects = await listProjects(supabase);
  } catch {
    // Non-fatal — show empty sidebar
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <StudioHeader />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar projects={projects} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
