export interface Variant {
  id: `v${number}`;
  slug: string;
  label: string;
  blurb: string;
  swatch: readonly [string, string, string];
  signature: string;
}

export const VARIANTS: readonly Variant[] = [
  { id: 'v1',  slug: 'v1',  label: 'Institutional Editorial', blurb: 'Navy + cream editorial with live weaving canvas.',                         swatch: ['#0f2340', '#f4ede0', '#a8542b'], signature: 'Weaving canvas' },
  { id: 'v2',  slug: 'v2',  label: 'Workshop Atelier',        blurb: 'Terracotta atelier with jacquard motif-inlay loom.',                       swatch: ['#b9431f', '#f5f0e6', '#2a1e2e'], signature: 'Motif-inlay loom' },
  { id: 'v3',  slug: 'v3',  label: 'Trade Journal',           blurb: 'Broadsheet typography on a visible warp × weft grid.',                      swatch: ['#faf7f0', '#141414', '#e13727'], signature: 'Warp × weft type grid' },
  { id: 'v4',  slug: 'v4',  label: 'Corporate Dossier',       blurb: 'Annual-report lockup with live fabric-spec thread-draw.',                  swatch: ['#0a1f3a', '#b8923d', '#f4ede0'], signature: 'Specimen № lockup' },
  { id: 'v5',  slug: 'v5',  label: 'Heritage Ledger',         blurb: 'Parchment, wax seals, and a Peshwa-era grant-scroll unroll.',              swatch: ['#efe3c9', '#7a1c1c', '#2b241a'], signature: 'Grant-scroll unroll' },
  { id: 'v6',  slug: 'v6',  label: 'Industrial Monograph',    blurb: 'Archival-style b/w factory stills with technical footnotes.',              swatch: ['#2f3438', '#f2ece2', '#a8542b'], signature: 'Archival monograph' },
  { id: 'v7',  slug: 'v7',  label: 'Data Monograph',          blurb: 'One authoritative chart: 25k → 15k looms, threads snapping.',              swatch: ['#2a3138', '#c98a1a', '#f4ede0'], signature: 'Loom-count collapse chart' },
  { id: 'v8',  slug: 'v8',  label: 'Export Portfolio',        blurb: 'Collective member tapestry — every logo an equal thread.',                 swatch: ['#f4ede0', '#141414', '#5b1a1a'], signature: 'Member tapestry' },
  { id: 'v9',  slug: 'v9',  label: 'Swiss Restrained',        blurb: 'Helvetica grid with a faint binary warp-up/warp-down strip.',              swatch: ['#ffffff', '#141414', '#e13727'], signature: 'Binary warp strip' },
  { id: 'v10', slug: 'v10', label: 'Minimal Gallery',         blurb: 'Fabric macro zoom from cloth, to yarn, to fibre.',                         swatch: ['#f4ede0', '#2b241a', '#a8542b'], signature: 'Fabric macro zoom' },
] as const;

export const getVariant = (slug: string): Variant | undefined =>
  VARIANTS.find((v) => v.slug === slug);
