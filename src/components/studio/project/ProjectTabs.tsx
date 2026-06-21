'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PROJECT_TABS } from '@/lib/studio/constants';

interface ProjectTabsProps {
  projectId: string;
}

export function ProjectTabs({ projectId }: ProjectTabsProps) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-0 border-b border-border overflow-x-auto">
      {PROJECT_TABS.map((tab) => {
        const href = `/studio/project/${projectId}/${tab.path}`;
        const isActive = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={tab.id}
            href={href}
            className={cn(
              'relative flex shrink-0 items-center px-4 py-3 text-sm font-medium transition-colors',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
