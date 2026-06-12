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
  title: 'TDF Solapur — Design Directions',
  description: 'Ten design directions for the Textile Development Foundation, Solapur.',
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
