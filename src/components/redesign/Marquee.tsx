'use client';

import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Seconds for one full loop. Lower = faster. */
  speed?: number;
  className?: string;
}

/**
 * Infinite horizontal marquee. Renders children twice; CSS animates -50%.
 * Children should be one continuous row of items with consistent gaps.
 */
export default function Marquee({ children, speed = 30, className }: Props) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <div
        className="animate-marquee flex w-max"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
