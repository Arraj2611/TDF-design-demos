import type { CSSProperties } from 'react';
import { V1Page } from '@/components/variants/v1/Page';

export const metadata = {
  title: 'V5 · Japanese Indigo — TDF Solapur',
};

// Japanese Indigo — inspired by Japan Textile Federation, Nishijin Weave, JETRO
// Deep indigo authority + rice paper cream + lacquer red + bronze
const theme: CSSProperties = {
  '--navy':   '#1c2042',
  '--navy-2': '#242858',
  '--navy-3': '#2c326e',
  '--cream':  '#f7f3ea',
  '--cream-2':'#ede8da',
  '--cream-3':'#e0d8c8',
  '--ink':    '#100e20',
  '--ink-2':  '#383450',
  '--rust':   '#b82010',
  '--rust-2': '#cc2818',
  '--gold':   '#8a6838',
  '--line':   '#ccc8b8',
  '--line-2': '#aca890',
  '--paper':  '#f7f3ea',
  '--mute':   'rgba(28,32,66,0.64)',
} as CSSProperties;

export default function Page() {
  return <V1Page theme={theme} />;
}
