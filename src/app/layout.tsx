import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header/Header';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://henrypineda.com'),
  title: 'Henry Pineda Jr. | Portfolio',
  description:
    'Henry Pineda Jr. — Backend Developer, Discord Developer, and Automation Specialist. Explore my projects, experience, and skills.',
  authors: [{ name: 'Henry Pineda Jr.' }],
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    title: 'Henry Pineda Jr. | Portfolio',
    description:
      'Backend Developer, Discord Developer, and Automation Specialist. Explore my projects, experience, and skills.',
    images: ['/my-png.webp'],
    siteName: 'Henry Pineda Jr.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Henry Pineda Jr. | Portfolio',
    description: 'Backend Developer, Discord Developer, and Automation Specialist.',
    images: ['/my-png.webp'],
  },
};

export const viewport: Viewport = {
  themeColor: '#F5CB5C',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.add('light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
