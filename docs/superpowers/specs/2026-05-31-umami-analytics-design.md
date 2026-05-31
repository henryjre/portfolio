# Umami Analytics Integration

**Date:** 2026-05-31
**Status:** Approved

## Goal

Add privacy-friendly Umami analytics to the portfolio to track page views,
using a self-hosted Umami instance, configured via environment variables, and
loaded only in production.

## Approach

Inject Umami's tracking script into the root layout using Next.js's
`next/script` component. Gate rendering behind `NODE_ENV === 'production'` and
the presence of both required environment variables.

## Configuration

Two public environment variables (must be `NEXT_PUBLIC_` to be available client-side):

- `NEXT_PUBLIC_UMAMI_SRC` — full URL to the self-hosted `script.js`
  (e.g. `https://analytics.example.com/script.js`)
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` — website UUID from the Umami dashboard

Documented in `.env.example`. Real values set on the droplet for production
(matching the existing Resend convention). The user wires these up themselves.

### Session replay (Umami v3.1.0+)

- `NEXT_PUBLIC_UMAMI_REPLAY` — `"true"` to enable session replay; defaults off.

Replay loads `recorder.js`, served from the same host as the tracker. Its URL is
derived from `NEXT_PUBLIC_UMAMI_SRC` by swapping a trailing `/script.js` for
`/recorder.js` (no-op if the src doesn't end in `script.js`). Replay is gated by
its own flag so it can be toggled independently of the tracker, and must also be
enabled per-website in the Umami dashboard. Only sessions started after enabling
are recorded; replays are retained 30 days. Uses Umami defaults (no sampling or
masking attributes); tune in the dashboard if needed.

## Implementation

In `src/app/layout.tsx`:

- Read both env vars.
- Render `<Script>` only when `process.env.NODE_ENV === 'production'` AND both
  vars are present.
- Use `strategy="afterInteractive"` and the `data-website-id` attribute.

Umami natively tracks SPA route changes, so no per-route instrumentation is needed.

## No-op Safety

If the env vars are missing or the build is not production, nothing renders —
no broken script tags, no console errors.

## Testing

No unit-test framework in this project. Verification:
- `next build` succeeds.
- Production render includes the `<script>` tag with correct `src` and
  `data-website-id` attributes.
