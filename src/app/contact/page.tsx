import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Contact from '@/components/redesign/Contact';
import Footer from '@/components/redesign/Footer';
import ScrambleText from '@/components/redesign/ScrambleText';
import { OG_IMAGE } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Henry Pineda Jr. for full-stack websites, automations, system integrations, collaboration, or work inquiries.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Henry Pineda Jr',
    description:
      'Contact Henry Pineda Jr. for full-stack websites, automations, system integrations, collaboration, or work inquiries.',
    url: '/contact',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Contact Henry Pineda Jr' }],
  },
};

export default function ContactPage() {
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
              <ScrambleText text="CONTACT" duration={700} />
              <ScrambleText text="." duration={1000} className="text-[var(--accent)]" />
            </h1>
            <p className="mt-6 max-w-2xl text-[var(--ink-dim)] text-base md:text-lg leading-relaxed">
              Work, collaboration, or a quiet hello. Direct line below.
            </p>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
