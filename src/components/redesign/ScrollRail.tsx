'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-50 h-px origin-left"
      style={{
        scaleX,
        background: 'var(--accent)',
      }}
    />
  );
}
