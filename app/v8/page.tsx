import type { CSSProperties } from 'react';
import { V1Page } from '@/components/variants/v1/Page';

export const metadata = {
  title: 'V8 · Global Progress — TDF Solapur',
};

// Global Progress — inspired by ILO, World Bank, Commonwealth Secretariat
// ILO slate blue + light grey-white + deep crimson + warm gold
const theme: CSSProperties = {
  '--navy':   '#283868',
  '--navy-2': '#324880',
  '--navy-3': '#3c5898',
  '--cream':  '#f4f6f8',
  '--cream-2':'#e8ecf0',
  '--cream-3':'#d8dfe6',
  '--ink':    '#101828',
  '--ink-2':  '#303848',
  '--rust':   '#982848',
  '--rust-2': '#ae3058',
  '--gold':   '#b08828',
  '--line':   '#c8d0dc',
  '--line-2': '#a8b4c4',
  '--paper':  '#f4f6f8',
  '--mute':   'rgba(40,56,104,0.64)',
} as CSSProperties;

export default function Page() {
  return <V1Page theme={theme} />;
}
