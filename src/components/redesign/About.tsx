import Image from "next/image";
import SectionHeader from "./SectionHeader";

const FACTS = [
  { k: "BASED", v: "Manila, PH" },
  { k: "AVAILABILITY", v: "Open to work" },
  { k: "TIMEZONE", v: "UTC+8 (PHT)" },
  { k: "BACKGROUND", v: "Self-taught" },
  { k: "FOCUS", v: "Full Stack · Automation · Integration" },
  { k: "ALSO", v: "Graphic Design" },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 border-b border-[var(--rule)] scroll-mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader index="04" label="ABOUT" meta="A SHORT NOTE" />

        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
          {/* Portrait */}
          <div className="col-span-12 md:col-span-4">
            <div className="relative aspect-[4/5] border border-[var(--rule)] overflow-hidden bg-[var(--paper)]">
              <Image
                src="/my-png.webp"
                alt="Henry Pineda Jr."
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority={false}
              />
              <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2 mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-dim)] bg-gradient-to-t from-[var(--bg)]/90 to-transparent">
                <span>/IMG_001</span>
                <span>HP·JR</span>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="col-span-12 md:col-span-8 md:pl-4">
            <p className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)] mb-6">
              / TRANSCRIPT
            </p>
            <p className="text-2xl md:text-3xl leading-snug text-[var(--ink)] tracking-tight">
              I&apos;m a developer who enjoys turning ideas into things that
              actually <span className="text-[var(--accent)]">work</span>. Web
              apps, automations, small pieces of code that make everyday work
              easier.
            </p>
            <p className="mt-6 text-base text-[var(--ink-dim)] leading-relaxed max-w-prose">
              I like the challenge of turning business ideas into working
              systems, solving complex problems, and finding the right
              workarounds to build things the way i want them to be. Off-hours, I
              make minimal graphic design and keep upskilling on things that
              help me build better.
            </p>

            {/* Fact table */}
            <div className="mt-10 border-t border-[var(--rule)]">
              {FACTS.map((f) => (
                <div
                  key={f.k}
                  className="grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] gap-6 py-3 border-b border-[var(--rule)]"
                >
                  <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
                    {f.k}
                  </span>
                  <span className="mono text-sm uppercase tracking-tight text-[var(--ink)]">
                    {f.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
