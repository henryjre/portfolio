'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MagneticLink from './MagneticLink';
import ScrambleText from './ScrambleText';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

const ROLES = ['FULL STACK', 'AUTOMATION', 'SYSTEM INTEGRATION', 'API INTEGRATION', 'BACKEND'];

export default function Hero() {
  const reduced = useReducedMotion();
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState(reduced ? ROLES[0] : '');
  const [clockText, setClockText] = useState('');
  const [coordsText, setCoordsText] = useState('14.5995° N, 120.9842° E');

  // Typewriter: type the current role, pause, delete it, then advance.
  useEffect(() => {
    if (reduced) {
      setTyped(ROLES[roleIdx]);
      return;
    }

    const target = ROLES[roleIdx];
    let pos = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    setTyped('');

    const tick = () => {
      if (cancelled) return;

      setTyped(target.slice(0, pos));

      if (!deleting && pos < target.length) {
        pos += 1;
        timeoutId = setTimeout(tick, 60);
        return;
      }

      if (!deleting) {
        deleting = true;
        timeoutId = setTimeout(tick, 1200);
        return;
      }

      if (pos > 0) {
        pos -= 1;
        timeoutId = setTimeout(tick, 40);
        return;
      }

      setRoleIdx((i) => (i + 1) % ROLES.length);
    };

    pos = 1;
    timeoutId = setTimeout(tick, 60);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [roleIdx, reduced]);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getUTCHours().toString().padStart(2, '0');
      const m = d.getUTCMinutes().toString().padStart(2, '0');
      const s = d.getUTCSeconds().toString().padStart(2, '0');
      setClockText(`${h}:${m}:${s} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // small jitter on coordinate display, refreshes every few seconds
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      const lat = (14.5995 + (Math.random() - 0.5) * 0.0002).toFixed(4);
      const lng = (120.9842 + (Math.random() - 0.5) * 0.0002).toFixed(4);
      setCoordsText(`${lat}° N, ${lng}° E`);
    }, 4000);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section
      id="top"
      className="relative w-full min-h-[calc(100vh-3.5rem)] flex flex-col border-b border-[var(--rule)] overflow-hidden"
    >
      {/* Grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 flex flex-col flex-1 relative">
        {/* Top meta bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 pb-10 border-b border-[var(--rule)] mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
          <div>
            <div className="text-[var(--ink-dim)]/70">FILE</div>
            <div className="text-[var(--ink)] mt-1">/index.tsx</div>
          </div>
          <div>
            <div className="text-[var(--ink-dim)]/70">LOCATION</div>
            <div className="text-[var(--ink)] mt-1 tabular-nums">{coordsText}</div>
          </div>
          <div>
            <div className="text-[var(--ink-dim)]/70">LOCAL TIME</div>
            <div className="text-[var(--ink)] mt-1 tabular-nums">{clockText || '—'}</div>
          </div>
          <div>
            <div className="text-[var(--ink-dim)]/70">STATUS</div>
            <div className="text-[var(--accent)] mt-1 flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 bg-[var(--accent)]"
                style={
                  reduced
                    ? undefined
                    : { animation: 'term-blink 1.6s steps(1) infinite' }
                }
              />
              AVAILABLE
            </div>
          </div>
        </div>

        {/* Main headline area */}
        <div className="flex-1 grid grid-cols-12 gap-4 py-10 md:py-16">
          {/* Left: section index */}
          <div className="hidden md:flex col-span-1 flex-col items-start">
            <ScrambleText
              text="[00/INDEX]"
              className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)]"
            />
          </div>

          {/* Center: name + role */}
          <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mono font-bold text-[var(--ink)] leading-[0.92] tracking-[-0.02em] text-[clamp(2.6rem,9vw,7rem)]"
            >
              <ScrambleText text="HENRY" as="div" duration={700} />
              <ScrambleText text="PINEDA JR." as="div" duration={1100} className="text-[var(--ink-dim)]" />
            </motion.h1>

            <div className="mt-8 border-l-2 border-[var(--accent)] pl-4">
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)] mb-1">
                FOCUS
              </div>
              <div className="h-7 md:h-9 flex items-center">
                <span className="mono text-lg md:text-2xl uppercase tracking-tight text-[var(--ink)] term-cursor">
                  {typed}
                </span>
              </div>
            </div>
          </div>

          {/* Right: meta block */}
          <div className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col justify-end gap-4">
            <div className="border border-[var(--rule)] p-4">
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
                / NOTE
              </div>
              <p className="mt-2 text-sm text-[var(--ink)] leading-relaxed">
                I build full-stack websites, automations, and system integrations that save time, reduce manual work, and keep things moving in the background.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[var(--rule)]">
          <MagneticLink
            href="/projects"
            className="group flex items-center justify-between p-6 md:p-8 border-b md:border-b-0 md:border-r border-[var(--rule)] hover:bg-[var(--paper)] transition-colors"
          >
            <div>
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)] mb-2">
                01 / SEE PROJECTS
              </div>
              <div className="mono text-2xl md:text-3xl uppercase text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                Featured Projects
              </div>
            </div>
            <span
              aria-hidden
              className="mono text-3xl text-[var(--ink)] group-hover:text-[var(--accent)] transition-all group-hover:translate-x-1"
            >
              →
            </span>
          </MagneticLink>

          <MagneticLink
            href="/#contact"
            className="group flex items-center justify-between p-6 md:p-8 hover:bg-[var(--paper)] transition-colors"
          >
            <div>
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)] mb-2">
                02 / REACH OUT
              </div>
              <div className="mono text-2xl md:text-3xl uppercase text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                Get in Touch
              </div>
            </div>
            <span
              aria-hidden
              className="mono text-3xl text-[var(--ink)] group-hover:text-[var(--accent)] transition-all group-hover:translate-x-1"
            >
              →
            </span>
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
