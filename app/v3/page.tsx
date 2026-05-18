import type { CSSProperties } from 'react';
import { V1Page } from '@/components/variants/v1/Page';

export const metadata = {
  title: 'V3 · Swiss Precision — TDF Solapur',
};

// Swiss Precision — inspired by Swiss Federal Office of Metrology, Richemont, Swatch Group
// Near-black authority + cool white + Swiss red accent + silver-grey
const theme: CSSProperties = {
  '--navy':   '#18181c',
  '--navy-2': '#242428',
  '--navy-3': '#323236',
  '--cream':  '#fafaf8',
  '--cream-2':'#f0f0ee',
  '--cream-3':'#e4e4e2',
  '--ink':    '#0c0c0e',
  '--ink-2':  '#3a3a3e',
  '--rust':   '#c01028',
  '--rust-2': '#d41830',
  '--gold':   '#78787e',
  '--line':   '#d8d8d6',
  '--line-2': '#b8b8b6',
  '--paper':  '#fafaf8',
  '--mute':   'rgba(24,24,28,0.62)',
} as CSSProperties;

export default function Page() {
  return <V1Page theme={theme} />;
}
