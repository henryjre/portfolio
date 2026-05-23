'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ImageModalProps {
  images: string[];
  startIndex: number;
  title: string;
  onClose: () => void;
}

function ImageModal({ images, startIndex, title, onClose }: ImageModalProps) {
  const [index, setIndex] = useState(startIndex);
  const [mounted, setMounted] = useState(false);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] bg-[var(--bg)]/95 backdrop-blur-sm flex flex-col"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image viewer`}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b border-[var(--rule)] mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)]"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[var(--ink)]">
          [/IMG · {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}]
        </span>
        <span className="hidden md:inline truncate max-w-md">{title}</span>
        <button
          onClick={onClose}
          className="flex min-h-11 items-center gap-2 px-2 text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
          aria-label="Close image viewer"
        >
          CLOSE <FiX className="size-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {hasMultiple && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 md:left-6 z-10 mono text-[var(--ink)] hover:text-[var(--accent)] border border-[var(--rule)] hover:border-[var(--accent)] p-3 transition-colors"
            aria-label="Previous image"
          >
            <FiChevronLeft className="size-6" />
          </button>
        )}

        <img
          src={images[index]}
          alt={`${title} screenshot ${index + 1}`}
          className="max-h-[80dvh] max-w-[85vw] object-contain border border-[var(--rule)]"
          onClick={(e) => e.stopPropagation()}
        />

        {hasMultiple && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 md:right-6 z-10 mono text-[var(--ink)] hover:text-[var(--accent)] border border-[var(--rule)] hover:border-[var(--accent)] p-3 transition-colors"
            aria-label="Next image"
          >
            <FiChevronRight className="size-6" />
          </button>
        )}
      </div>

      {/* Bottom bar */}
      <div
        className="px-6 py-3 border-t border-[var(--rule)] mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)] flex items-center justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <span>ESC TO CLOSE</span>
        {hasMultiple && <span>← → TO NAVIGATE</span>}
      </div>
    </div>,
    document.body
  );
}

export default ImageModal;
