import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectRoot({ params }: Props) {
  const { id } = await params;
  redirect(`/studio/project/${id}/setup`);
}
