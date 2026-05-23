'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import ProjectSection from '@/components/Projects/ProjectSection';
import ScrambleText from '@/components/redesign/ScrambleText';
import projects from '@/data/projects';

export default function ProjectsView() {
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getUTCHours().toString().padStart(2, '0');
      const m = d.getUTCMinutes().toString().padStart(2, '0');
      const s = d.getUTCSeconds().toString().padStart(2, '0');
      setClock(`${h}:${m}:${s} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-y-scroll snap-y snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Intro */}
      <section className="h-[calc(100vh-3.5rem)] snap-start flex flex-col px-6 md:px-10 py-12 bg-[var(--bg)] border-b border-[var(--rule)] relative">
        {/* Grid backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.15]"
          style={{
            backgroundImage:
              'linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="max-w-[1400px] w-full mx-auto flex flex-col flex-1 relative">
          {/* Meta bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-[var(--rule)] mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
            <div>
              <div className="text-[var(--ink-dim)]/70">FILE</div>
              <div className="text-[var(--ink)] mt-1">/projects.tsx</div>
            </div>
            <div>
              <div className="text-[var(--ink-dim)]/70">COUNT</div>
              <div className="text-[var(--ink)] mt-1 tabular-nums">{String(projects.length).padStart(2, '0')} / WORKS</div>
            </div>
            <div>
              <div className="text-[var(--ink-dim)]/70">RANGE</div>
              <div className="text-[var(--ink)] mt-1">2021 → NOW</div>
            </div>
            <div>
              <div className="text-[var(--ink-dim)]/70">UTC</div>
              <div className="text-[var(--ink)] mt-1 tabular-nums">{clock || '—'}</div>
            </div>
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)] hover:text-[var(--accent)] transition-colors self-start"
          >
            <FiArrowLeft className="size-3.5" />
            BACK · /INDEX
          </Link>

          {/* Massive heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex-1 flex flex-col justify-center"
          >
            <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)] mb-4">
              [02 / PROJECTS · ARCHIVE]
            </p>
            <h1 className="mono font-bold uppercase tracking-[-0.02em] text-[var(--ink)] leading-[0.92] text-[clamp(3rem,12vw,10rem)]">
              <ScrambleText text="FEATURED" as="div" duration={700} />
              <ScrambleText text="PROJECTS." as="div" duration={1000} className="text-[var(--accent)]" />
            </h1>

            <p className="mt-8 text-[var(--ink-dim)] max-w-2xl text-base md:text-lg leading-relaxed">
              Things I&apos;ve built — full-stack apps, internal ops platforms, Discord systems,
              n8n workflows, and graphic design work. Scroll for the archive.
            </p>
          </motion.div>

          <div className="border-t border-[var(--rule)] pt-4 flex items-center justify-between mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
            <span>SCROLL DOWN</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[var(--accent)] text-base"
            >
              ↓
            </motion.span>
          </div>
        </div>
      </section>

      {projects.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
