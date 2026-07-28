import { redirect } from 'next/navigation';

export default function ProjectPage({ params }: { params: { id: string } }) {
  // Redirect to the first step of the workflow
  redirect(`/projects/${params.id}/source`);
}
