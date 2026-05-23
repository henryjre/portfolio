import ScrambleText from './ScrambleText';

interface Props {
  /** Two-digit section index, e.g. "01". */
  index: string;
  /** Uppercase section label, e.g. "WORK". */
  label: string;
  /** Optional right-aligned mono meta string. */
  meta?: string;
}

export default function SectionHeader({ index, label, meta }: Props) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-[var(--rule)] pb-3 mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
        <ScrambleText
          inView
          text={`[${index} / ${label}]`}
          className="text-[var(--ink)] shrink-0"
        />
        {meta && <span className="max-w-full text-right break-words">{meta}</span>}
      </div>
    </div>
  );
}
