'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________';

interface Options {
  duration?: number;
  start?: boolean;
}

export function useScramble(target: string, { duration = 900, start = true }: Options = {}) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(reduced || !start ? target : '');
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setOut(target);
      return;
    }

    const t0 = performance.now();
    const len = target.length;

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      let s = '';
      for (let i = 0; i < len; i++) {
        const ch = target[i];
        if (ch === ' ' || ch === '\n') {
          s += ch;
          continue;
        }
        const settleAt = i / len;
        if (p >= settleAt) {
          s += ch;
        } else {
          s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setOut(s);
      if (p < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setOut(target);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [target, duration, start, reduced]);

  return out;
}
