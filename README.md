# TDF Design Demos

Ten design directions for the Textile Development Foundation, Solapur — a 30-year-old trade association of ~240 terry-towel and chaddar manufacturers. This repo is a demo site for TDF to review and converge on a preferred direction before commissioning a production site.

Live preview: deployed via Vercel (preview URL updates on every push to `main`).

## Stack

- Next.js 16 (App Router, TypeScript strict, Turbopack)
- React 19
- Tailwind v4 for shared chrome + CSS Modules per variant
- framer-motion 12 for scroll/reveal animations
- Noto Serif Devanagari for Marathi · Libre Caslon, Fraunces, IBM Plex, Work Sans for Latin
- Vitest + React Testing Library for unit/component · Playwright for smoke E2E

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Test

```bash
npm run test      # Vitest unit + component (27 specs)
npm run e2e       # Playwright smoke (5 specs)
```

## Routes

| Route | Variant |
|-------|---------|
| `/`     | Landing — grid of 10 editions |
| `/v1`   | Institutional Editorial (Caslon + navy + cream, live weaving canvas) |
| `/v2`   | Workshop Atelier (Fraunces + terracotta + ivory, motif-inlay loom) |
| `/v3`–`/v10` | Pending — Plans 2 & 3 |

The floating **Edition** switcher (bottom-right) moves between variants. The EN · मराठी toggle in each variant's nav flips bilingual content.

## Design

- Spec: [`docs/specs/2026-04-21-tdf-demos-design.md`](docs/specs/2026-04-21-tdf-demos-design.md)
- Plan 1: [`docs/superpowers/plans/2026-04-21-plan-1-foundation-v1-v2.md`](docs/superpowers/plans/2026-04-21-plan-1-foundation-v1-v2.md)

Content and committee rosters are frozen in `lib/content.tsx` and `lib/committee.ts` — all variants render the same dictionary verbatim.

## License

Internal TDF review asset. Not for public redistribution.
