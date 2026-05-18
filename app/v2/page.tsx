import type { CSSProperties } from 'react';
import { V1Page } from '@/components/variants/v1/Page';

export const metadata = {
  title: 'V2 · British Heritage — TDF Solapur',
};

// British Heritage — inspired by UKFT, Bradford mills, Savile Row
// Deep bottle green authority + warm linen + claret + aged brass
const theme: CSSProperties = {
  '--navy':   '#122e20',
  '--navy-2': '#1a3e2c',
  '--navy-3': '#285038',
  '--cream':  '#f4f0e6',
  '--cream-2':'#e8e2d4',
  '--cream-3':'#dbd3c0',
  '--ink':    '#141210',
  '--ink-2':  '#3a3228',
  '--rust':   '#7a2535',
  '--rust-2': '#923040',
  '--gold':   '#9a7a28',
  '--line':   '#d0c8b0',
  '--line-2': '#b4a88c',
  '--paper':  '#f4f0e6',
  '--mute':   'rgba(18,46,32,0.64)',
} as CSSProperties;

export default function Page() {
  return <V1Page theme={theme} />;
}
