import type { CSSProperties } from 'react';
import { V1Page } from '@/components/variants/v1/Page';

export const metadata = {
  title: 'V4 · Nordic Character — TDF Solapur',
};

// Nordic Character — inspired by Nordic Council, Finnish Design, Scandinavian Trade bodies
// Fjord blue authority + warm off-white + deep teal + copper
const theme: CSSProperties = {
  '--navy':   '#1e3a58',
  '--navy-2': '#264870',
  '--navy-3': '#305888',
  '--cream':  '#f5f4f0',
  '--cream-2':'#ece9e4',
  '--cream-3':'#dedad4',
  '--ink':    '#121820',
  '--ink-2':  '#303848',
  '--rust':   '#3d7878',
  '--rust-2': '#4a9090',
  '--gold':   '#a06030',
  '--line':   '#ccd0d8',
  '--line-2': '#a8b0bc',
  '--paper':  '#f5f4f0',
  '--mute':   'rgba(30,58,88,0.62)',
} as CSSProperties;

export default function Page() {
  return <V1Page theme={theme} />;
}
