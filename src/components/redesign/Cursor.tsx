'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

export default function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // Touch / coarse pointer? skip entirely.
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    setEnabled(true);

    let raf = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (ref.current) {
            ref.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
          }
          raf = 0;
        });
      }
    };

    const onEnterLink = () => ref.current?.setAttribute('data-hover', 'true');
    const onLeaveLink = () => ref.current?.removeAttribute('data-hover');

    window.addEventListener('mousemove', onMove, { passive: true });

    const linkSel = 'a, button, [role="button"], input, textarea, label';
    document.querySelectorAll(linkSel).forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.querySelectorAll(linkSel).forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[60] hidden md:block"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        style={{
          color: 'var(--accent)',
          transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        data-cursor-svg
      >
        <line x1="11" y1="0" x2="11" y2="7" stroke="currentColor" strokeWidth="1" />
        <line x1="11" y1="15" x2="11" y2="22" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="11" x2="7" y2="11" stroke="currentColor" strokeWidth="1" />
        <line x1="15" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="1" />
        <circle cx="11" cy="11" r="1" fill="currentColor" />
      </svg>
      <style jsx>{`
        div[data-hover='true'] svg {
          transform: scale(1.6);
        }
      `}</style>
    </div>
  );
}
