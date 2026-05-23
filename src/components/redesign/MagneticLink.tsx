'use client';

import Link from 'next/link';
import { forwardRef, type ReactNode } from 'react';
import { useMagnetic } from '@/lib/motion/useMagnetic';

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}

const MagneticLink = forwardRef<HTMLAnchorElement, Props>(function MagneticLink(
  { href, children, className, external, ariaLabel },
  _ref
) {
  const { ref, style } = useMagnetic<HTMLAnchorElement>({ strength: 0.25, max: 6 });

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  if (external || href.startsWith('http')) {
    return (
      <a
        ref={ref}
        href={href}
        className={className}
        style={style}
        aria-label={ariaLabel}
        {...externalProps}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
});

export default MagneticLink;
