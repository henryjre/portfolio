'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';

const NAV_ITEMS: Array<{ label: string; href: string }> = [
  { label: 'INDEX', href: '/' },
  { label: 'WORK', href: '/projects' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--rule)]">
      <div className="mx-auto max-w-[1400px] flex items-center justify-between px-6 md:px-10 h-14">
        <Link
          href="/"
          className="mono text-[13px] font-bold tracking-[0.04em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
        >
          HENRY.PINEDA<span className="text-[var(--accent)]">/</span>JR
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 transition-colors ${
                  isActive
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--ink-dim)] hover:text-[var(--ink)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="md:hidden mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] border border-[var(--rule)] px-3 py-1.5 hover:bg-[var(--paper)]"
            >
              MENU
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:max-w-md bg-[var(--bg)] border-l border-[var(--rule)]"
          >
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="flex flex-col h-full p-8">
              <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)] border-b border-[var(--rule)] pb-3">
                NAVIGATE
              </div>
              <nav className="flex flex-col mt-6">
                {NAV_ITEMS.map((item, i) => (
                  <SheetClose key={item.label} asChild>
                    <Link href={item.href}>
                      <span className="flex items-baseline gap-4 py-4 border-b border-[var(--rule)] hover:text-[var(--accent)] transition-colors">
                        <span className="mono text-[11px] text-[var(--ink-dim)]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="mono text-2xl uppercase tracking-tight text-[var(--ink)]">
                          {item.label}
                        </span>
                      </span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
