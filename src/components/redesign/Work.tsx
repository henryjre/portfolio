'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import projects from '@/data/projects';
import SectionHeader from './SectionHeader';
import MagneticLink from './MagneticLink';

export default function Work() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="work" className="py-20 md:py-28 border-b border-[var(--rule)] scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          index="02"
          label="WORK"
          meta={`05 PROJECTS / 2021—NOW`}
        />

        {/* Column headers (desktop only) */}
        <div className="hidden md:grid grid-cols-[60px_1fr_2fr_120px] gap-6 pb-4 border-b border-[var(--rule)] mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
          <span>NO.</span>
          <span>PROJECT</span>
          <span>STACK</span>
          <span className="text-right">VIEW</span>
        </div>

        <ul className="relative">
          {projects.slice(0, 5).map((p, i) => {
            const idx = String(i + 1).padStart(2, '0');
            const isHovered = hovered === i;
            return (
              <li
                key={p.id}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative border-b border-[var(--rule)] group"
              >
                <Link
                  href="/projects"
                  className="grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr_2fr_120px] gap-6 py-5 md:py-7 items-center hover:bg-[var(--paper)] transition-colors"
                >
                  <span className="mono text-[11px] text-[var(--ink-dim)] tabular-nums self-start md:self-center">
                    {idx}
                  </span>
                  <div className="min-w-0">
                    <h3 className="mono text-lg md:text-2xl uppercase tracking-tight text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors truncate">
                      {p.title}
                    </h3>
                    <p className="md:hidden mt-1 mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-dim)] truncate">
                      {p.tags.slice(0, 3).join(' · ')}
                    </p>
                  </div>
                  <div className="hidden md:flex flex-wrap gap-x-3 gap-y-1">
                    {p.tags.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-dim)]"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 5 && (
                      <span className="mono text-[11px] tracking-[0.12em] text-[var(--ink-dim)]/60">
                        +{p.tags.length - 5}
                      </span>
                    )}
                  </div>
                  <span
                    aria-hidden
                    className="hidden md:inline-block text-right mono text-xl text-[var(--ink)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all"
                  >
                    →
                  </span>
                </Link>

                {/* Floating image preview on hover (desktop) */}
                {isHovered && p.images[0] && (
                  <div
                    aria-hidden
                    className="hidden md:block absolute right-32 top-1/2 -translate-y-1/2 w-56 aspect-[4/3] border border-[var(--rule)] pointer-events-none overflow-hidden bg-[var(--paper)] z-10"
                  >
                    <Image
                      src={p.images[0]}
                      alt=""
                      fill
                      sizes="224px"
                      className="object-cover"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-10">
          <MagneticLink
            href="/projects"
            className="inline-flex items-center gap-3 mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] border border-[var(--rule)] hover:border-[var(--accent)] hover:text-[var(--accent)] px-5 py-3 transition-colors"
          >
            VIEW ALL WORK <span aria-hidden>→</span>
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
