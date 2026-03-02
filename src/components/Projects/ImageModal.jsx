import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function ImageModal({ images, startIndex, title, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const hasMultiple = images.length > 1;

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
        aria-label="Close"
      >
        <FiX className="size-7" />
      </button>

      {/* Prev */}
      {hasMultiple && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 text-white/70 hover:text-white transition-colors p-2"
          aria-label="Previous image"
        >
          <FiChevronLeft className="size-8" />
        </button>
      )}

      {/* Image */}
      <img
        src={images[index]}
        alt={`${title} screenshot ${index + 1}`}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      {hasMultiple && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 text-white/70 hover:text-white transition-colors p-2"
          aria-label="Next image"
        >
          <FiChevronRight className="size-8" />
        </button>
      )}

      {/* Counter */}
      {hasMultiple && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
          {index + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  );
}

export default ImageModal;
