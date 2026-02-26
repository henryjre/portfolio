import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Visual config for each position in the stack (0 = top/active)
const STACK_POSITIONS = [
  { rotate: 0,   scale: 1,    y: 0,  opacity: 1 },
  { rotate: 4,   scale: 0.95, y: 10, opacity: 1 },
  { rotate: -3,  scale: 0.90, y: 18, opacity: 1 },
  { rotate: 5,   scale: 0.85, y: 24, opacity: 0.8 },
  { rotate: -4,  scale: 0.80, y: 28, opacity: 0.6 },
];

const CYCLE_INTERVAL = 2500;
const DRAG_THRESHOLD = 80;

function getStackStyle(position, totalImages) {
  const config = STACK_POSITIONS[Math.min(position, STACK_POSITIONS.length - 1)];
  return {
    ...config,
    zIndex: totalImages - position,
  };
}

function ImageStack({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const isDragging = useRef(false);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(advance, CYCLE_INTERVAL);
  }, [advance]);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  function handleDragStart() {
    isDragging.current = true;
    clearInterval(intervalRef.current);
  }

  function handleDragEnd(_, info) {
    isDragging.current = false;
    if (Math.abs(info.offset.x) > DRAG_THRESHOLD) {
      advance();
    }
    startInterval();
  }

  return (
    <div className="relative w-full aspect-video select-none">
      {images.map((src, i) => {
        const position = (i - activeIndex + images.length) % images.length;
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
            drag={isTop ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ cursor: isTop ? 'grab' : 'default' }}
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

      {/* Dot indicators */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActiveIndex(i); startInterval(); }}
            aria-label={`Show image ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-primary w-4' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageStack;
