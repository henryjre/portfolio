import type { Metadata } from 'next';
import ProjectsView from './ProjectsView';
import { OG_IMAGE } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Featured projects by Henry Pineda Jr., including full-stack web apps, internal operations platforms, Discord systems, workflow automations, and design work.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects | Henry Pineda Jr',
    description:
      'Featured projects by Henry Pineda Jr., including full-stack web apps, internal operations platforms, Discord systems, workflow automations, and design work.',
    url: '/projects',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Projects by Henry Pineda Jr' }],
  },
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
