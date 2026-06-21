import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DemoCoach — AI Demo Studio',
  description: 'Upload a beat, record vocals, mix and export your demo — powered by AI.',
};

export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
