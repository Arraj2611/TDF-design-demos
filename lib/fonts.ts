import { Libre_Caslon_Text, IBM_Plex_Sans, IBM_Plex_Mono, Noto_Serif_Devanagari } from 'next/font/google';

// V1 (the production edition) uses exactly four families: a Caslon serif for
// display, IBM Plex Sans/Mono for body & labels, and Noto Serif Devanagari for
// the Marathi toggle. display:'swap' renders text immediately in the fallback.
export const caslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-caslon', display: 'swap' });
export const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-plex-sans', display: 'swap' });
export const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono', display: 'swap' });
export const devanagari = Noto_Serif_Devanagari({ subsets: ['devanagari'], weight: ['400', '600', '700'], variable: '--font-devanagari', display: 'swap' });
