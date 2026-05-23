import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import MagneticLink from './MagneticLink';

const SOCIALS = [
  { Icon: FaLinkedin, href: 'https://linkedin.com/in/pinedahenryjre/', name: 'LinkedIn', code: 'LI' },
  { Icon: FaGithub, href: 'https://github.com/henryjre', name: 'GitHub', code: 'GH' },
  { Icon: FaDiscord, href: 'https://discord.com/users/748568303219245117', name: 'Discord', code: 'DC' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--bg)]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Giant wordmark */}
        <div className="py-12 md:py-20 border-b border-[var(--rule)]">
          <h2 className="mono font-bold uppercase tracking-[-0.02em] text-[var(--ink)] leading-[0.9] text-[clamp(3rem,14vw,11rem)]">
            HENRY<br />
            <span className="text-[var(--ink-dim)]">PINEDA<span className="text-[var(--accent)]">.</span></span>
          </h2>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-12 gap-6 py-10">
          <div className="col-span-12 md:col-span-4">
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)] mb-3">
              /ELSEWHERE
            </div>
            <ul className="space-y-1">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <MagneticLink
                    href={s.href}
                    external
                    ariaLabel={`Visit ${s.name}`}
                    className="group flex items-center justify-between py-2 border-b border-[var(--rule)] mono uppercase tracking-tight text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <s.Icon className="size-4" aria-hidden />
                      <span className="text-lg">{s.name}</span>
                    </span>
                    <span className="flex items-center gap-2 mono text-[10px] tracking-[0.18em] text-[var(--ink-dim)]">
                      {s.code} <span aria-hidden>↗</span>
                    </span>
                  </MagneticLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-6">
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)] mb-3">
              /NAVIGATE
            </div>
            <ul className="space-y-1">
              {[
                { label: 'Index', href: '/' },
                { label: 'Work', href: '/projects' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <li key={l.label}>
                  <MagneticLink
                    href={l.href}
                    className="group flex items-center justify-between py-2 border-b border-[var(--rule)] mono uppercase tracking-tight text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                  >
                    <span className="text-lg">{l.label}</span>
                    <span aria-hidden className="text-[var(--ink-dim)] mono text-sm group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </MagneticLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal strip */}
        <div className="border-t border-[var(--rule)] py-5 flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
          <div>© {year} HENRY PINEDA JR. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-4">
            <span>BUILT WITH NEXT.JS</span>
            <span className="hidden md:inline">·</span>
            <span>RUN ON PM2</span>
            <span className="hidden md:inline">·</span>
            <span className="text-[var(--accent)]">END OF TRANSMISSION ●</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
