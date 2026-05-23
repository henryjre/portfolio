import type { ComponentProps } from 'react';
import { FaNodeJs, FaHtml5, FaDiscord, FaReact, FaGithub, FaLinux } from 'react-icons/fa';
import {
  SiOdoo,
  SiGooglesheets,
  SiPostgresql,
  SiMysql,
  SiN8N,
  SiTailwindcss,
  SiNextdotjs,
  SiOpenai,
  SiClaude,
} from 'react-icons/si';
import SectionHeader from './SectionHeader';
import Marquee from './Marquee';

function CursorLogo({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={[className, 'inline-block bg-current'].filter(Boolean).join(' ')}
      style={{
        mask: 'url(/logos/cursor.svg) center / contain no-repeat',
        WebkitMask: 'url(/logos/cursor.svg) center / contain no-repeat',
      }}
      {...props}
    />
  );
}

const SKILLS = [
  { icon: FaDiscord, label: 'Discord.js' },
  { icon: FaNodeJs, label: 'Node.js' },
  { icon: SiOdoo, label: 'Odoo ERP' },
  { icon: SiN8N, label: 'n8n' },
  { icon: SiPostgresql, label: 'PostgreSQL' },
  { icon: SiMysql, label: 'MySQL' },
  { icon: SiGooglesheets, label: 'Sheets / Apps Script' },
  { icon: FaReact, label: 'React' },
  { icon: SiTailwindcss, label: 'Tailwind' },
  { icon: FaHtml5, label: 'HTML' },
  { icon: SiClaude, label: 'Claude Code' },
  { icon: SiOpenai, label: 'ChatGPT Codex' },
  { icon: CursorLogo, label: 'Cursor' },
  { icon: FaGithub, label: 'Git / GitHub' },
  { icon: SiNextdotjs, label: 'Next.js' },
  { icon: FaLinux, label: 'Linux' },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 border-b border-[var(--rule)] scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader index="01" label="STACK" meta="16 TOOLS / DAILY DRIVERS" />
      </div>

      <Marquee speed={40}>
        {SKILLS.map((skill, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-8 md:px-12 py-8 border-r border-[var(--rule)] shrink-0 group"
          >
            <skill.icon
              className="size-8 md:size-10 text-[var(--ink-dim)] group-hover:text-[var(--accent)] transition-colors"
              aria-hidden
            />
            <span className="mono text-xl md:text-3xl uppercase tracking-tight text-[var(--ink)] whitespace-nowrap">
              {skill.label}
            </span>
            <span className="mono text-[10px] tracking-[0.18em] text-[var(--ink-dim)]">
              / {String(i + 1).padStart(2, '0')}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
