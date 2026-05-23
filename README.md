# Henry Pineda Jr. Portfolio

Source code for my personal portfolio site, built to showcase full-stack websites, automations, integrations, selected projects, experience, and contact details.

The current version is a redesigned Next.js portfolio with a dark brutalist/grid interface, terminal-inspired motion, custom cursor interactions, and a Resend-backed contact form.

## Stack

- **Framework:** Next.js 16 App Router
- **UI:** React 19, TypeScript
- **Styling:** Tailwind CSS 4 with custom CSS variables
- **Motion:** Framer Motion plus small custom hooks
- **Icons:** React Icons
- **Email:** Resend
- **Primitives:** Radix UI components used through local `components/ui` wrappers

## Features

- Responsive portfolio homepage with hero, skills, featured projects, experience, about, contact, and footer sections.
- Dedicated `/projects`, `/about`, and `/contact` pages.
- Project archive with full-screen snap sections and image modal support.
- Typewriter focus text that types, pauses, deletes, and cycles through roles.
- Scramble text, magnetic links, marquee skills strip, scroll rail, and custom cursor effects.
- Reduced-motion handling for users who prefer less animation.
- Contact form with client-side validation, API-side validation, simple IP rate limiting, and Resend email delivery.
- SEO metadata, Open Graph metadata, and Twitter card metadata.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Main portfolio index |
| `/projects` | Featured projects archive |
| `/about` | About page |
| `/contact` | Contact page |
| `/api/contact` | Contact form email endpoint |

## Project Structure

```txt
src/
  app/
    api/contact/route.ts
    about/page.tsx
    contact/page.tsx
    projects/page.tsx
    projects/ProjectsView.tsx
    layout.tsx
    page.tsx
  components/
    Projects/
    redesign/
    ui/
  data/
    projects.ts
  lib/
    motion/
    utils.ts
public/
  logos/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Environment Variables

The contact form uses Resend. Copy `.env.example` to `.env.local` and fill in:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_FROM=Portfolio <noreply@yourdomain.com>
CONTACT_TO=you@yourdomain.com
```

`CONTACT_FROM` must use a sender/domain verified in Resend.

## Notes

- Main visual styling lives in `src/app/globals.css`.
- Homepage section components live in `src/components/redesign`.
- Project content is defined in `src/data/projects.ts`.
- Static assets such as the Cursor logo live in `public/logos`.
