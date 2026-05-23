'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

interface ExperienceItem {
  years: string;
  role: string;
  company: string;
  location: string;
  notes: React.ReactNode;
}

const EXPERIENCE: ExperienceItem[] = [
  {
    years: '2021 — 2023',
    role: 'Chief Technology Officer',
    company: 'Web3 Gaming Community',
    location: 'PH · Remote',
    notes: (
      <>
        Helped scale a Web3 gaming community of 20,000+ active members. Led Discord
        infrastructure for scholar management and in-game coordination, and built{' '}
        <span className="text-[var(--accent)]">automation tools</span> for SLP claiming, sending,
        and tracking — improving team efficiency and supporting daily operations.
      </>
    ),
  },
  {
    years: '2022 — 2024',
    role: 'Web Developer',
    company: 'Multi-platform retail',
    location: 'PH · Hybrid',
    notes: (
      <>
        Managed and developed the company&apos;s Discord communication platform. Built{' '}
        <span className="text-[var(--accent)]">custom automations and integrations</span> for
        Shopee, Lazada, and TikTok Shop to streamline order processing and customer handling.
        Delivered weekly executive updates aligning teams to company goals.
      </>
    ),
  },
  {
    years: '2023 — NOW',
    role: 'Technical Developer',
    company: 'Multi-branch retail',
    location: 'PH · Remote',
    notes: (
      <>
        Independently built and maintain a{' '}
        <span className="text-[var(--accent)]">full stack internal web app</span> integrated with
        Odoo ERP — covering attendance tracking, employee analytics, and a self-service employee
        dashboard. Serves multiple branches with real-time data sync and role-based access, giving
        management visibility across the whole organization.
      </>
    ),
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState<boolean[]>(() => EXPERIENCE.map(() => false));
  const [railTopPx, setRailTopPx] = useState(0);

  // Recompute rail height — target the last active dot, but if the LAST item is active,
  // extend the rail all the way to the bottom of the container (so it fully fills).
  useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;

      let lastIdx = -1;
      for (let i = active.length - 1; i >= 0; i--) {
        if (active[i]) {
          lastIdx = i;
          break;
        }
      }

      if (lastIdx < 0) {
        setRailTopPx(0);
        return;
      }

      // If the final item is active, fill the entire rail.
      if (lastIdx === EXPERIENCE.length - 1) {
        setRailTopPx(container.offsetHeight);
        return;
      }

      const dot = itemRefs.current[lastIdx]?.querySelector<HTMLElement>('[data-dot]');
      if (!dot) return;
      const dotRect = dot.getBoundingClientRect();
      const px = dotRect.top + dotRect.height / 2 - containerTop;
      setRailTopPx(px);
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [active]);

  // Activate AND deactivate items based on whether their dot is past the viewport midline.
  useEffect(() => {
    const refs = itemRefs.current;
    const obs = new IntersectionObserver(
      (entries) => {
        setActive((prev) => {
          const next = [...prev];
          entries.forEach((entry) => {
            const i = Number((entry.target as HTMLElement).dataset.idx);
            // active when the dot has scrolled above the viewport center OR is currently inside the band
            const dot = (entry.target as HTMLElement).querySelector<HTMLElement>('[data-dot]');
            if (!dot) return;
            const dotCenter = dot.getBoundingClientRect().top + dot.offsetHeight / 2;
            next[i] = dotCenter <= window.innerHeight / 2;
          });
          return next;
        });
      },
      // Wide band so the callback fires whenever the dot crosses the middle in either direction.
      { rootMargin: '0px', threshold: [0, 0.5, 1] }
    );
    refs.forEach((r) => r && obs.observe(r));

    // Also recompute on scroll for accuracy (the observer alone misses fast scrolls).
    const onScroll = () => {
      setActive((prev) => {
        const next = [...prev];
        const mid = window.innerHeight / 2;
        refs.forEach((r, i) => {
          if (!r) return;
          const dot = r.querySelector<HTMLElement>('[data-dot]');
          if (!dot) return;
          const dotCenter = dot.getBoundingClientRect().top + dot.offsetHeight / 2;
          next[i] = dotCenter <= mid;
        });
        return next;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="experience" className="py-20 md:py-28 border-b border-[var(--rule)] scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader index="03" label="HISTORY" meta="ROLES / PHILIPPINES" />

        <div ref={containerRef} className="relative">
          {/* Background rail */}
          <div
            aria-hidden
            className="absolute left-[14px] md:left-[120px] top-0 bottom-0 w-px bg-[var(--rule)]"
          />
          {/* Active rail — height driven by the last active dot's position */}
          <motion.div
            aria-hidden
            className="absolute left-[14px] md:left-[120px] top-0 w-px bg-[var(--accent)] origin-top"
            animate={{ height: railTopPx }}
            transition={{ type: 'spring', stiffness: 120, damping: 24, restDelta: 0.5 }}
          />

          {EXPERIENCE.map((item, i) => (
            <div
              key={i}
              data-idx={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="grid grid-cols-[40px_1fr] md:grid-cols-[140px_1fr_2fr] gap-x-6 md:gap-x-10 py-10 md:py-14 border-b border-[var(--rule)] last:border-b-0"
            >
              {/* Year column */}
              <div className="md:col-start-1 flex md:block">
                <span
                  data-dot
                  className={`relative inline-block w-3 h-3 mt-1.5 md:mt-2.5 border ${
                    active[i]
                      ? 'bg-[var(--accent)] border-[var(--accent)]'
                      : 'bg-[var(--bg)] border-[var(--ink-dim)]'
                  } transition-colors duration-500`}
                  style={{ marginLeft: '-1px' }}
                />
                <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)] ml-3 md:ml-4 md:mt-1.5 md:block tabular-nums">
                  {item.years}
                </span>
              </div>

              {/* Role/company */}
              <div>
                <h3 className="mono text-xl md:text-3xl uppercase tracking-tight text-[var(--ink)] leading-tight">
                  {item.role}
                </h3>
                <div className="mt-2 mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
                  {item.company}
                  <span className="mx-2">·</span>
                  {item.location}
                </div>
              </div>

              {/* Notes */}
              <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
                <p className="text-[var(--ink)] leading-relaxed text-base">{item.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
