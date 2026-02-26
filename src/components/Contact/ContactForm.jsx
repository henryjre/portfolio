import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  function validate() {
    const errs = {};
    if (!fields.name.trim()) errs.name = 'Name is required.';
    if (!fields.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!fields.message.trim()) errs.message = 'Message is required.';
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('loading');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: fields.name,
          email: fields.email,
          message: fields.message,
          time: new Date().toLocaleString(),
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus('success');
      setFields({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="w-full py-16 md:py-24 scroll-mt-20 bg-secondary/40">
      <div className="container max-w-2xl mx-auto px-[4vw]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Card>
            <CardHeader>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Get in Touch</p>
              <CardTitle className="text-3xl sm:text-4xl font-extrabold mt-1">Contact Me</CardTitle>
              <CardDescription className="text-base mt-1">
                Have a project in mind or just want to say hello? Send me a message and I'll get back to you.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {status === 'success' ? (
                <div className="rounded-lg bg-primary/10 border border-primary/20 px-6 py-8 text-center">
                  <p className="text-2xl font-extrabold text-primary mb-2">Message sent!</p>
                  <p className="text-muted-foreground">Thanks for reaching out. I'll reply as soon as I can.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-6"
                    onClick={() => setStatus('idle')}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={fields.name}
                      onChange={handleChange}
                      aria-invalid={!!errors.name}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 aria-invalid:border-destructive transition"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 aria-invalid:border-destructive transition"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-semibold text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={fields.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 aria-invalid:border-destructive resize-none transition"
                      placeholder="Tell me about your project or just say hello..."
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-destructive">
                      Something went wrong. Please try again or reach out directly via email.
                    </p>
                  )}

                  <Button type="submit" disabled={status === 'loading'} size="lg" className="mt-1">
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                        </svg>
                        Sending…
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactForm;