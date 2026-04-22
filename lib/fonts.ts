import {
  Libre_Caslon_Text, IBM_Plex_Sans, IBM_Plex_Mono, Fraunces, Work_Sans,
  Noto_Serif_Devanagari, Playfair_Display, Roboto_Slab, Inter, Spectral,
  IBM_Plex_Serif,
} from 'next/font/google';

export const caslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-caslon' });
export const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-plex-sans' });
export const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-plex-mono' });
export const fraunces = Fraunces({ subsets: ['latin'], weight: ['400','500','700','900'], variable: '--font-fraunces' });
export const workSans = Work_Sans({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-work-sans' });
export const devanagari = Noto_Serif_Devanagari({ subsets: ['devanagari'], weight: ['400','600','700'], variable: '--font-devanagari' });

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

export const slab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-slab',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

export const spectral = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-spectral',
});

export const plexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-plex-serif',
});
