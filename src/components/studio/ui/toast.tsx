'use client';

import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastVariant = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = { current: 0 };

  const toast = useCallback((message: string, variant: ToastVariant = 'success') => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-lg backdrop-blur animate-in fade-in slide-in-from-bottom-2',
              t.variant === 'success' && 'border-emerald-500/30 bg-card text-emerald-400',
              t.variant === 'error' && 'border-destructive/30 bg-card text-destructive',
              t.variant === 'info' && 'border-border bg-card text-foreground'
            )}
          >
            {t.variant === 'success' && <CheckCircle className="h-4 w-4 shrink-0" />}
            {t.variant === 'error' && <XCircle className="h-4 w-4 shrink-0" />}
            <span>{t.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className="ml-auto opacity-60 hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
