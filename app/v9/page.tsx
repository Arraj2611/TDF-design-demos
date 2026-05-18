import type { CSSProperties } from 'react';
import { V1Page } from '@/components/variants/v1/Page';

export const metadata = {
  title: 'V9 · Cotton Heritage — TDF Solapur',
};

// Cotton Heritage — inspired by Cotton Council International, Indian Chambers of Commerce
// Forest green authority + fresh white + deep crimson + harvest gold
const theme: CSSProperties = {
  '--navy':   '#152a18',
  '--navy-2': '#1e3822',
  '--navy-3': '#28482e',
  '--cream':  '#f0f5f0',
  '--cream-2':'#e4ece4',
  '--cream-3':'#d4e0d4',
  '--ink':    '#0c1810',
  '--ink-2':  '#2c3c2e',
  '--rust':   '#b82020',
  '--rust-2': '#cc2828',
  '--gold':   '#8a7828',
  '--line':   '#c4d0c4',
  '--line-2': '#a4b4a4',
  '--paper':  '#f0f5f0',
  '--mute':   'rgba(21,42,24,0.64)',
} as CSSProperties;

export default function Page() {
  return <V1Page theme={theme} />;
}
