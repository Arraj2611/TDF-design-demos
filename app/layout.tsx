import type { Metadata, Viewport } from 'next';
import { LangProvider } from '@/components/shared/LangProvider';
import { caslon, plexSans, plexMono, fraunces, workSans, devanagari, playfair, slab, inter, spectral, plexSerif } from '@/lib/fonts';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Textile Development Foundation — Solapur',
  description:
    'The Association of Textile Manufacturers, Solapur. Representing 240 member units across Terry Towels, Chaddars, Spinning, Processing & Dyeing, and Exports.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${caslon.variable} ${plexSans.variable} ${plexMono.variable} ${fraunces.variable} ${workSans.variable} ${devanagari.variable} ${playfair.variable} ${slab.variable} ${inter.variable} ${spectral.variable} ${plexSerif.variable}`}
    >
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
