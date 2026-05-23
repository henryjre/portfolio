import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Inter_Tight } from 'next/font/google';
import Header from '@/components/redesign/Header';
import ScrollRail from '@/components/redesign/ScrollRail';
import Cursor from '@/components/redesign/Cursor';
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
  metadataBase: new URL('https://henrypineda.com'),
  title: 'Henry Pineda Jr. — Backend & Automation Engineer',
  description:
    'Henry Pineda Jr. — Backend Developer, Discord Developer, and Automation Specialist. Selected work, experience, and contact.',
  authors: [{ name: 'Henry Pineda Jr.' }],
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    title: 'Henry Pineda Jr. — Backend & Automation Engineer',
    description:
      'Backend Developer, Discord Developer, and Automation Specialist. Selected work, experience, and contact.',
    images: ['/my-png.webp'],
    siteName: 'Henry Pineda Jr.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Henry Pineda Jr. — Backend & Automation Engineer',
    description: 'Backend Developer, Discord Developer, and Automation Specialist.',
    images: ['/my-png.webp'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${interTight.variable}`}>
      <body>
        <ScrollRail />
        <Cursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
