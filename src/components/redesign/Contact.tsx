'use client';

import { useState } from 'react';
import SectionHeader from './SectionHeader';
import MagneticLink from './MagneticLink';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!fields.name.trim()) errs.name = 'Required.';
    if (!fields.email.trim()) errs.email = 'Required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errs.email = 'Invalid email format.';
    if (!fields.message.trim()) errs.message = 'Required.';
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(data?.error ?? 'Failed to send message.');
        setStatus('error');
        return;
      }
      setStatus('success');
      setFields({ name: '', email: '', message: '' });
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  const fieldClass = `
    w-full bg-transparent border border-[var(--rule)] px-4 py-3
    mono text-sm text-[var(--ink)] placeholder:text-[var(--ink-dim)]/60
    focus:outline-none focus:border-[var(--accent)]
    aria-[invalid=true]:border-[var(--accent)]
    transition-colors
  `;

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-[var(--rule)] scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader index="05" label="CONTACT" meta="/INPUT" />

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-5">
            <h2 className="mono text-3xl md:text-5xl uppercase tracking-tight leading-[0.95] text-[var(--ink)]">
              SEND A<br />
              <span className="text-[var(--accent)]">TRANSMISSION.</span>
            </h2>
            <p className="mt-6 text-[var(--ink-dim)] leading-relaxed max-w-prose">
              Work, collaboration, or a quiet hello. Routed straight to my inbox — usually
              answered within a day.
            </p>

            <div className="mt-10 border-t border-[var(--rule)]">
              {[
                { k: 'CHANNEL', v: 'EMAIL' },
                { k: 'CIPHER', v: 'RESEND · TLS' },
                { k: 'ETA', v: '< 24H' },
              ].map((f) => (
                <div
                  key={f.k}
                  className="grid grid-cols-[100px_1fr] gap-4 py-3 border-b border-[var(--rule)]"
                >
                  <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
                    {f.k}
                  </span>
                  <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]">
                    {f.v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 md:border-l md:border-[var(--rule)] md:pl-10">
            {status === 'success' ? (
              <div className="border border-[var(--accent)] p-8">
                <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] mb-3">
                  / TRANSMISSION ACK
                </div>
                <p className="text-2xl mono uppercase tracking-tight text-[var(--ink)] mb-3">
                  MESSAGE RECEIVED.
                </p>
                <p className="text-[var(--ink-dim)] leading-relaxed">
                  Thanks for reaching out. I&apos;ll reply within a day.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] border border-[var(--rule)] hover:border-[var(--accent)] hover:text-[var(--accent)] px-5 py-3 transition-colors"
                >
                  SEND ANOTHER →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)] mb-2"
                  >
                    01 / NAME
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    className={fieldClass}
                    placeholder="JOHN DOE"
                  />
                  {errors.name && (
                    <p className="mt-1 mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                      ERR · {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)] mb-2"
                  >
                    02 / EMAIL
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    className={fieldClass}
                    placeholder="JOHN@EXAMPLE.COM"
                  />
                  {errors.email && (
                    <p className="mt-1 mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                      ERR · {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)] mb-2"
                  >
                    03 / MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={fields.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    className={`${fieldClass} resize-none`}
                    placeholder="WHAT ARE YOU BUILDING?"
                  />
                  {errors.message && (
                    <p className="mt-1 mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                      ERR · {errors.message}
                    </p>
                  )}
                </div>

                {status === 'error' && errorMessage && (
                  <p
                    role="alert"
                    className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] border border-[var(--accent)] p-3"
                  >
                    ERR · {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-2 group inline-flex items-center justify-between border border-[var(--ink)] hover:border-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--ink)] hover:bg-[var(--accent)] text-[var(--bg)] hover:text-[var(--bg)] px-6 py-4 transition-colors"
                >
                  <span className="mono text-sm uppercase tracking-[0.18em]">
                    {status === 'loading' ? 'TRANSMITTING…' : 'TRANSMIT MESSAGE'}
                  </span>
                  <span aria-hidden className="mono text-xl group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
