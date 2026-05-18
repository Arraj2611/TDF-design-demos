import type { CSSProperties } from 'react';
import { V1Page } from '@/components/variants/v1/Page';

export const metadata = {
  title: 'V6 · Italian Editorial — TDF Solapur',
};

// Italian Editorial — inspired by Camera Nazionale della Moda, Confindustria Moda, Pitti Immagine
// Near-black sophistication + warm ivory + champagne gold + taupe
const theme: CSSProperties = {
  '--navy':   '#141210',
  '--navy-2': '#201e1c',
  '--navy-3': '#2e2a28',
  '--cream':  '#f8f4ec',
  '--cream-2':'#eee8dc',
  '--cream-3':'#e2dace',
  '--ink':    '#0c0a08',
  '--ink-2':  '#3c3830',
  '--rust':   '#b89a30',
  '--rust-2': '#cca838',
  '--gold':   '#8a7060',
  '--line':   '#d4ccb8',
  '--line-2': '#b8ae98',
  '--paper':  '#f8f4ec',
  '--mute':   'rgba(20,18,16,0.66)',
} as CSSProperties;

export default function Page() {
  return <V1Page theme={theme} />;
}
