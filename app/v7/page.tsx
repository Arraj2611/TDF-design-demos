import type { CSSProperties } from 'react';
import { V1Page } from '@/components/variants/v1/Page';

export const metadata = {
  title: 'V7 · Geneva Authority — TDF Solapur',
};

// Geneva Authority — inspired by WTO, ITC, UNCTAD, UN agencies in Geneva
// UN deep blue authority + cool white + teal accent + amber
const theme: CSSProperties = {
  '--navy':   '#0a2a60',
  '--navy-2': '#103580',
  '--navy-3': '#184098',
  '--cream':  '#f2f2f0',
  '--cream-2':'#e8e8e6',
  '--cream-3':'#d8d8d6',
  '--ink':    '#080e20',
  '--ink-2':  '#283050',
  '--rust':   '#007878',
  '--rust-2': '#009090',
  '--gold':   '#b87820',
  '--line':   '#c8ccd8',
  '--line-2': '#a8aec0',
  '--paper':  '#f2f2f0',
  '--mute':   'rgba(10,42,96,0.64)',
} as CSSProperties;

export default function Page() {
  return <V1Page theme={theme} />;
}
