import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const QuoteContainer = () => {
  return (
    <section className="w-full py-10 md:py-20 flex items-center justify-center bg-secondary">
      <div className="max-w-[1440px] text-center px-4">
        <FaQuoteLeft className="mx-auto size-6 text-primary opacity-50 mb-4" aria-hidden="true" />

        <blockquote className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-snug">
          Opportunities multiply as they are seized.
        </blockquote>

        <FaQuoteRight className="mx-auto size-6 text-primary opacity-50 mt-4" aria-hidden="true" />

        <p className="mt-4 text-md md:text-lg font-medium text-muted-foreground italic">
          — Sun Tzu
        </p>
      </div>
    </section>
  );
};

export default QuoteContainer;
