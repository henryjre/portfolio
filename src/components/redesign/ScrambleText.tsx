'use client';

import { useEffect, useRef, useState } from 'react';
import { useScramble } from '@/lib/motion/useScramble';

interface Props {
  text: string;
  className?: string;
  duration?: number;
  /** Wait until in view before scrambling. */
  inView?: boolean;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

export default function ScrambleText({
  text,
  className,
  duration = 900,
  inView = false,
  as: Tag = 'span',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [start, setStart] = useState(!inView);
  const out = useScramble(text, { duration, start });

  useEffect(() => {
    if (!inView) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      aria-label={text}
    >
      {out || ' '}
    </Tag>
  );
}
