'use client';

import Link from 'next/link';
import { Music2, User, LogOut } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { getSupabaseBrowserClient } from '@/lib/studio/db/supabase';
import { useRouter } from 'next/navigation';

export function StudioHeader() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/studio/login');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center px-4 gap-4">
        <Link href="/studio/dashboard" className="flex items-center gap-2 font-semibold text-foreground">
          <Music2 className="h-5 w-5 text-primary" />
          <span>DemoCoach</span>
        </Link>

        <div className="flex-1" />

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
            <span className="sr-only">Profile</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
