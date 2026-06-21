'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/studio/ui/dialog';
import { Button } from '@/components/studio/ui/button';
import { Input } from '@/components/studio/ui/input';
import { Label } from '@/components/studio/ui/label';
import { Select } from '@/components/studio/ui/select';
import { GENRE_OPTIONS } from '@/lib/studio/constants';
import { createProject } from '@/lib/studio/db/projects';

const schema = z.object({
  name: z.string().min(1, 'Project name is required').max(80, 'Name too long'),
  genre: z.string().min(1, 'Please select a genre'),
});

type FormValues = z.infer<typeof schema>;

interface NewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProjectModal({ open, onOpenChange }: NewProjectModalProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', genre: '' },
  });

  async function onSubmit(values: FormValues) {
    setIsCreating(true);
    setError(null);
    try {
      const project = await createProject({
        name: values.name,
        genre: values.genre,
      });
      reset();
      onOpenChange(false);
      router.push(`/studio/project/${project.id}/setup`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setIsCreating(false);
    }
  }

  function handleClose(open: boolean) {
    if (!open) reset();
    onOpenChange(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Give your demo a name and choose a genre to get genre-specific presets.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              placeholder="e.g. Trap Idea #3"
              {...register('name')}
              autoFocus
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="project-genre">Genre</Label>
            <Select id="project-genre" placeholder="Select a genre" {...register('genre')}>
              {GENRE_OPTIONS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </Select>
            {errors.genre && (
              <p className="text-xs text-destructive">{errors.genre.message}</p>
            )}
          </div>

          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
