'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import ImageStack from './ImageStack';
import ImageModal from './ImageModal';
import MagneticLink from '@/components/redesign/MagneticLink';
import type { Project } from '@/data/projects';

interface ProjectImageProps {
  images: string[];
  title: string;
  onImageClick: (index: number) => void;
}

function ProjectImage({ images, title, onImageClick }: ProjectImageProps) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] flex items-center justify-center bg-[var(--paper)] border border-[var(--rule)]">
        <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
          NO PREVIEW
        </span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="w-full">
        <button
          onClick={() => onImageClick(0)}
          className="block w-full border border-[var(--rule)] hover:border-[var(--accent)] transition-colors group"
          aria-label="View image full size"
        >
          <img
            src={images[0]}
            alt={`${title} screenshot`}
            loading="lazy"
            className="w-full aspect-[4/3] object-cover group-hover:opacity-90 transition-opacity"
          />
          <div className="flex justify-between items-center px-3 py-2 border-t border-[var(--rule)] mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)] group-hover:text-[var(--accent)] transition-colors">
            <span>/IMG_001</span>
            <span>CLICK TO EXPAND →</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pb-12">
      <ImageStack images={images} title={title} onImageClick={onImageClick} />
    </div>
  );
}

interface ProjectSectionProps {
  project: Project;
  index: number;
  sectionId: string;
  nextSectionId?: string;
}

function ProjectSection({ project, index, sectionId, nextSectionId }: ProjectSectionProps) {
  const isEven = index % 2 === 0;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  function openModal(i: number) {
    setModalIndex(i);
    setModalOpen(true);
  }

  return (
    <section
      id={sectionId}
      className="min-h-[calc(100dvh-3.5rem)] md:snap-start flex items-center justify-center px-6 md:px-10 py-16 md:py-20 bg-[var(--bg)] border-b border-[var(--rule)] scroll-mt-14 md:scroll-mt-0"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
            isEven ? '' : 'md:[direction:rtl]'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:col-span-7 md:[direction:ltr]"
          >
            <ProjectImage images={project.images} title={project.title} onImageClick={openModal} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="md:col-span-5 md:[direction:ltr] flex flex-col gap-5"
          >
            <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)] flex items-center gap-2">
              <span>[{String(index + 1).padStart(2, '0')} / PROJECT]</span>
              <span className="flex-1 h-px bg-[var(--rule)]" />
            </div>

            <h2 className="mono text-3xl md:text-5xl uppercase tracking-tight text-[var(--ink)] leading-[0.95]">
              {project.title}
            </h2>

            <p className="text-[var(--ink-dim)] leading-relaxed text-base">
              {project.description}
            </p>

            <div className="border-t border-[var(--rule)] pt-4">
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)] mb-2">
                / STACK
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 flex-wrap pt-2">
              {project.githubUrl && (
                <MagneticLink
                  href={project.githubUrl}
                  external
                  className="group inline-flex min-h-11 items-center gap-2 mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] border border-[var(--rule)] hover:border-[var(--accent)] hover:text-[var(--accent)] px-4 py-3 transition-colors"
                >
                  <FiGithub className="size-4" />
                  GITHUB <span aria-hidden>↗</span>
                </MagneticLink>
              )}
              {project.demoUrl && (
                <MagneticLink
                  href={project.demoUrl}
                  external
                  className="group inline-flex min-h-11 items-center gap-2 mono text-[11px] uppercase tracking-[0.18em] text-[var(--bg)] bg-[var(--ink)] hover:bg-[var(--accent)] px-4 py-3 transition-colors"
                >
                  <FiExternalLink className="size-4" />
                  LIVE DEMO <span aria-hidden>↗</span>
                </MagneticLink>
              )}
              {!project.githubUrl && !project.demoUrl && (
                <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
                  / PRIVATE PROJECT
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {nextSectionId && (
          <a
            href={`#${nextSectionId}`}
            className="mt-10 flex min-h-11 items-center justify-between border-t border-[var(--rule)] pt-4 mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)] hover:text-[var(--accent)] transition-colors md:hidden"
          >
            <span>Next Project</span>
            <span aria-hidden className="text-base text-[var(--accent)]">
              ↓
            </span>
          </a>
        )}
      </div>

      {modalOpen && (
        <ImageModal
          images={project.images}
          startIndex={modalIndex}
          title={project.title}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}

export default ProjectSection;
