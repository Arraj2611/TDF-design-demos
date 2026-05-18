import type { CSSProperties } from 'react';
import { V1Page } from '@/components/variants/v1/Page';

export const metadata = {
  title: 'V10 · African Trade — TDF Solapur',
};

// African Trade — inspired by African Union, COMESA, African Development Bank
// Dark cocoa warmth + warm sand + ochre gold + earth red
const theme: CSSProperties = {
  '--navy':   '#2c1508',
  '--navy-2': '#3c2010',
  '--navy-3': '#4e2c18',
  '--cream':  '#f5e8d0',
  '--cream-2':'#ead8b8',
  '--cream-3':'#dcc8a0',
  '--ink':    '#180c04',
  '--ink-2':  '#4a3020',
  '--rust':   '#b07020',
  '--rust-2': '#c88028',
  '--gold':   '#904030',
  '--line':   '#d4c0a0',
  '--line-2': '#bca880',
  '--paper':  '#f5e8d0',
  '--mute':   'rgba(44,21,8,0.66)',
} as CSSProperties;

export default function Page() {
  return <V1Page theme={theme} />;
}
