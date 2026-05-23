import type { Metadata } from 'next';
import ProjectsView from './ProjectsView';

export const metadata: Metadata = {
  title: 'Projects | Henry Pineda Jr.',
  description:
    "A collection of things I've built, from full-stack web applications and internal ops platforms to Discord bots and workflow automations, as well as graphic design projects.",
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
