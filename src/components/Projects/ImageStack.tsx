'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

const STACK_POSITIONS = [
  { rotate: 0, scale: 1, y: 0, opacity: 1 },
  { rotate: 4, scale: 0.95, y: 10, opacity: 1 },
  { rotate: -3, scale: 0.9, y: 18, opacity: 1 },
  { rotate: 5, scale: 0.85, y: 24, opacity: 0.8 },
  { rotate: -4, scale: 0.8, y: 28, opacity: 0.6 },
];

const CYCLE_INTERVAL = 2500;
const DRAG_THRESHOLD = 80;

function getStackStyle(position: number, totalImages: number) {
  const config = STACK_POSITIONS[Math.min(position, STACK_POSITIONS.length - 1)];
  return {
    ...config,
    zIndex: totalImages - position,
  };
}

interface ImageStackProps {
  images: string[];
  title: string;
  onImageClick?: (index: number) => void;
}

function ImageStack({ images, title, onImageClick }: ImageStackProps) {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isDragging = useRef(false);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (reduced) return;
    intervalRef.current = setInterval(advance, CYCLE_INTERVAL);
  }, [advance, reduced]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  function handleDragStart() {
    isDragging.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    isDragging.current = false;
    if (Math.abs(info.offset.x) > DRAG_THRESHOLD) {
      advance();
    }
    startInterval();
  }

  const VISIBLE_COUNT = STACK_POSITIONS.length;

  return (
    <div className="relative w-full aspect-video select-none">
      {images.map((src, i) => {
        const position = (i - activeIndex + images.length) % images.length;

        if (position >= VISIBLE_COUNT) return null;

        const style = getStackStyle(position, images.length);
        const isTop = position === 0;

        return (
          <motion.div
            key={src}
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl border border-border"
            animate={{
              rotate: style.rotate,
              scale: style.scale,
              y: style.y,
              opacity: style.opacity,
              zIndex: style.zIndex,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag={isTop && !reduced ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={() => {
              if (isTop && !isDragging.current) onImageClick?.(activeIndex);
            }}
            style={{ cursor: isTop ? 'pointer' : 'default' }}
            whileDrag={{ cursor: 'grabbing' }}
          >
            <img
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover pointer-events-none"
            />
          </motion.div>
        );
      })}

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              startInterval();
            }}
            aria-label={`Show image ${i + 1}`}
            className="group flex size-11 items-center justify-center"
          >
            <span
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-4 bg-primary' : 'w-1.5 bg-border'
              }`}
            />
          </button>
        ))}
      </div>

      <motion.div
        animate={reduced ? undefined : { y: [0, 6, 0] }}
        transition={reduced ? undefined : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-xs text-muted-foreground"
      >
        Click to view
      </motion.div>
    </div>
  );
}

export default ImageStack;
