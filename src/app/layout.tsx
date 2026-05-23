import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Inter_Tight } from 'next/font/google';
import Header from '@/components/redesign/Header';
import ScrollRail from '@/components/redesign/ScrollRail';
import Cursor from '@/components/redesign/Cursor';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, sameAs } from '@/lib/seo';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Henry Pineda Jr',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Henry Pineda Jr.' }],
  creator: 'Henry Pineda Jr.',
  publisher: 'Henry Pineda Jr.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.svg?v=3', type: 'image/svg+xml' },
      { url: '/favicon.ico?v=3', sizes: 'any' },
    ],
    shortcut: '/favicon.ico?v=3',
    apple: '/apple-icon.png?v=3',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_TITLE }],
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Henry Pineda Jr.',
    url: SITE_URL,
    image: `${SITE_URL}/my-png.webp`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pampanga',
      addressCountry: 'PH',
    },
    jobTitle: 'Full-Stack Developer',
    knowsAbout: [
      'Full-stack web development',
      'Workflow automation',
      'System integrations',
      'Discord systems',
      'Odoo ERP integrations',
    ],
    sameAs,
  };

  return (
    <html lang="en" className={`dark ${jetbrainsMono.variable} ${interTight.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ScrollRail />
        <Cursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
