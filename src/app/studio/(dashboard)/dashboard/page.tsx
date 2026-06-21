'use client';

import { useEffect, useState } from 'react';
import { ProjectCard } from '@/components/studio/project/ProjectCard';
import { NewProjectModal } from '@/components/studio/project/NewProjectModal';
import { EmptyState } from '@/components/studio/shared/EmptyState';
import { LoadingState } from '@/components/studio/shared/LoadingState';
import { Button } from '@/components/studio/ui/button';
import { listProjects, deleteProject } from '@/lib/studio/db/projects';
import type { Project } from '@/types/studio';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <>
      {loading ? (
        <LoadingState />
      ) : projects.length === 0 ? (
        <EmptyState onCreateProject={() => setModalOpen(true)} />
      ) : (
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Your Projects</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {projects.length} project{projects.length !== 1 ? 's' : ''}
              </span>
              <Button size="sm" onClick={() => setModalOpen(true)}>
                + New Project
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}

      <NewProjectModal
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) {
            listProjects().then(setProjects).catch(() => {});
          }
        }}
      />
    </>
  );
}
