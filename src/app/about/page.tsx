import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import About from '@/components/redesign/About';
import Footer from '@/components/redesign/Footer';

export const metadata: Metadata = {
  title: 'About | Henry Pineda Jr.',
  description:
    'About Henry Pineda Jr. — a developer focused on backends, Discord systems, and automation. Based in Manila, Philippines.',
};

export default function AboutPage() {
  return (
    <>
      <main>
        <section className="border-b border-[var(--rule)]">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 md:py-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)] hover:text-[var(--accent)] transition-colors"
            >
              <FiArrowLeft className="size-3.5" />
              BACK · /INDEX
            </Link>
            <h1 className="mt-10 mono font-bold uppercase tracking-[-0.02em] text-[var(--ink)] leading-[0.92] text-[clamp(2.6rem,10vw,7rem)]">
              ABOUT<span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[var(--ink-dim)] text-base md:text-lg leading-relaxed">
              The short version: who I am, what I work on, and how I work.
            </p>
          </div>
        </section>
        <About />
      </main>
      <Footer />
    </>
  );
}
