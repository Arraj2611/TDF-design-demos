# TDF Design Demos — 10-Variant Next.js Showcase

**Date:** 2026-04-21
**Status:** Draft (awaiting user review)
**Repo:** [Arraj2611/TDF-design-demos](https://github.com/Arraj2611/TDF-design-demos)
**Deploy target:** Vercel (free tier, preview-per-commit)

---

## 1. Purpose

Single-app demo that presents **10 visually distinct design directions** for the Textile Development Foundation (TDF), Solapur — a 30-year-old non-profit trade association representing ~240 terry-towel and chaddar manufacturers. The purpose of the site is to give TDF's office-bearers and member organisations a shareable Vercel preview URL they can circulate internally, review, and converge on a preferred direction before commissioning a production site.

**Audience of the site:** TDF members — businessmen aged 35–40, English/Marathi speakers, accustomed to trade-press (FT / Economist / Bloomberg) tonality, not consumer-tech aesthetics.

**Non-goal:** This is a demo, not production. It is not a CMS-backed site, has no admin panel, no forms wired to email, no analytics hooks.

---

## 2. Guiding Constraints

1. **Organisation-first tone.** The beneficiary is TDF and its collective membership. **No variant may introduce NEW spotlight sections that feature an individual current office-bearer, single current member company, or single current mill over others.** Member wall is equal-grid. Historical figures and mills named in `content.jsx` as already accepted by V1/V2 (Peshwa Madhavrao-I, Seth Morarji Gokuldas 1877, weaver communities, named historical mills) stay — they are academic context, not current-member promotion. The rule is: variants MUST NOT add "featured member of the month", size-by-seniority member tiles, individual founder pull-quotes, or per-manufacturer product cards. Variants render only what `content.jsx` already expresses.
2. **Professional register.** No flashy / Gen-Z / loud motifs. No neon accents as primary palette. No playful gimmicks (rhythm metronomes, saree-drag interactions, dye-dip games). Reference frame: trade journals, annual reports, museum monographs.
3. **Content frozen.** `content.jsx` + `committee-data.jsx` as they exist in the V1/V2 bundle are the canonical content source. All 10 variants consume the **same** dictionary verbatim. Variants add styling + interaction shells only — they never add content.
4. **Bilingual EN/MR** toggle carried across all 10 variants.
5. **Mobile-first responsive** on every variant. Touch targets ≥ 44×44 CSS px. No horizontal scroll.
6. **Reduced motion respected.** All animations gated behind `prefers-reduced-motion: no-preference`. Static fallback always legible.
7. **Subtle textile references per variant.** Each variant carries exactly one hero signature + 2-3 callbacks drawn from authentic Solapur textile history (GI #8, 1761 Peshwa patronage, Girangaon-era mills, 25,000→15,000 loom collapse, 60% national terry-towel share, 50+ export countries, VTTES 2026). Evidence must come from the research digest below — no invented facts.

---

## 3. Research Digest (source of all textile facts used in variants)

Drawn from user-supplied `uploads/History of Solapur Textile Industry.docx`, `uploads/about VTTES.docx`, and web research:

- Peshwa Madhavrao-I (1761–1772) invited **Koshti, Sali, Sangar** weaver communities to Solapur
- First mill: Solapur Spinning & Weaving Mills, **March 1877**
- Subsequent mills: Narsing Giraji, Laxmi Cotton (1898), Vishnu Cotton (1908), Jamshree Ratansingji (1909) — collectively "Girangaon" (Mill Town)
- **1984–85**: a Solapur family pivoted to terry towels on 4 power looms (origin of Solapur's towel identity). Use only to the extent `content.jsx` already references it; variants must not add new spotlight passages naming the family.
- Golden Age 1980–92, ₹650 cr USSR export order
- 1992 octroi + 1995 USSR collapse → **25,000 → 15,000 power looms**
- Today: ~15,000 power looms + 2,000 rapier looms (1,000 chaddar-only)
- **GI #8** — Solapur Chaddar was the first Maharashtra product to receive GI status (2005); Solapur Terry Towel also GI-protected
- **60%** of India's terry-towel output is from Solapur; exports to **50+ countries**; supports ~200,000 livelihoods
- **Guinness World Record** — longest human towel chain, 27 Sep 2019, during TDF's "Vibrant Terry Towel Global Expo & Summit 2019"
- **VTTES 2026** — "Vibrant Terry Towel Expo & Summit 2026", builds on 2019 edition
- TDF est. 1995–1996, P-28 MIDC Akkalkot Road, works alongside Solapur Zilla Yantramag Dharak Sangh
- Solapur etymology — folk: "Sola (sixteen) + pura (village)"; scholarly: Sonnalage/Sonalagi (12–13th c.) → Sonalapur (AD 1316)

---

## 4. Architecture

### 4.1 Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 16 (App Router)** | First-class on Vercel, RSC-ready, file-based routing suits one-page-per-variant |
| Language | **TypeScript (strict)** | Typed content contract, refactor safety across 10 variants |
| Styling | **CSS Modules per variant** + **Tailwind v4** for shared chrome (FAB, layout primitives) | 10 radically different visual systems → CSS isolation prevents class-name leak; Tailwind only where all variants agree |
| Animation | **framer-motion** (scroll, viewport reveal) + plain CSS `@keyframes` (marquees, ambient loops) | Declarative, reduced-motion aware |
| Fonts | `next/font/google` | Zero-CLS, self-hosted subsets |
| Data source | `/lib/content.ts` (ported from `content.jsx`) + `/lib/committee.ts` | Single typed source, all variants import |
| Image handling | `next/image` with `/public/assets/` | Responsive + AVIF/WebP |
| Deploy | Vercel (via GitHub `Arraj2611/TDF-design-demos` integration) | Preview per commit |

### 4.2 Directory Layout

```
TDF-design-demos/
├── app/
│   ├── layout.tsx              # root: fonts, bilingual provider, FAB mount
│   ├── page.tsx                # landing: variant grid + "Enter" per card
│   ├── v1/page.tsx             # Institutional Editorial
│   ├── v2/page.tsx             # Workshop Atelier
│   ├── v3/page.tsx             # Trade Journal
│   ├── v4/page.tsx             # Corporate Dossier
│   ├── v5/page.tsx             # Heritage Ledger
│   ├── v6/page.tsx             # Industrial Monograph
│   ├── v7/page.tsx             # Data Monograph
│   ├── v8/page.tsx             # Export Portfolio
│   ├── v9/page.tsx             # Swiss Restrained
│   └── v10/page.tsx            # Minimal Gallery
├── components/
│   ├── fab/                    # VariantSwitcher (data-driven from versions.ts)
│   ├── shared/
│   │   ├── BilingualToggle.tsx
│   │   ├── Marquee.tsx
│   │   ├── Reveal.tsx          # IntersectionObserver fade-up
│   │   ├── Parallax.tsx        # useScroll translate
│   │   ├── ScrollNum.tsx       # count-up on enter
│   │   └── ChaddarDivider.tsx  # reusable stripe-band rule (palette per variant)
│   └── variants/
│       ├── v1/…                # variant-local components (Hero, Nav, etc.)
│       ├── v2/…
│       └── … through v10
├── lib/
│   ├── content.ts              # bilingual dict (EN/MR)
│   ├── committee.ts            # BOARD + COMMITTEE rosters
│   ├── versions.ts             # variant registry → FAB + landing grid
│   └── motion.ts               # shared framer-motion variants, reduced-motion helpers
├── styles/
│   ├── globals.css             # Tailwind layers + CSS var tokens
│   └── variants/v1..v10.module.css
├── public/
│   └── assets/                 # logos, fabric macros, placeholder factory photos
├── docs/specs/                 # this file
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── vercel.json                 # (only if needed — likely framework preset is enough)
```

### 4.3 Content Contract

`lib/content.ts` exports a typed dictionary:

```ts
export type Lang = 'en' | 'mr';
export interface Content {
  nav: {...};
  hero: { corner: string[]; stats: Array<{label: string; value: string}> };
  about: {...};
  members: { stats: {...}; logos: Logo[] };
  committee: {...};
  facilities: { items: FacilityItem[] };
  news: { feature: Article; quickHits: Article[] };
  events: { upcoming: Event[]; past: Event[] };
  solapur: { facts: Fact[]; paras: string[]; highlights: string[] };
  contact: {...};
  foot: {...};
}
export const CONTENT: Record<Lang, Content> = { en: {...}, mr: {...} };
```

`lib/committee.ts` exports `BOARD` and `COMMITTEE` objects (shape from bundle's `committee-data.jsx`).

**All 10 variants receive the same `CONTENT[lang]` object and render it per their own layout. No variant forks the content.**

### 4.4 Variant Registry

`lib/versions.ts`:

```ts
export interface Variant {
  id: string;           // 'v1'..'v10'
  slug: string;         // URL segment
  label: string;        // "Institutional Editorial"
  blurb: string;        // 1-liner for landing grid
  swatch: [string, string, string]; // 3 dominant colors for landing chip
  signature: string;    // hero interaction label
}
export const VARIANTS: Variant[] = [ ...10 entries ];
```

Consumed by: landing grid (`/`), FAB (VariantSwitcher), `<head>` metadata per variant.

---

## 5. Ten Variants (Signatures + Callbacks)

All references to textile history drawn from §3.

| # | Variant | Palette | Type System | Hero Signature | Callbacks | Content Fields Used |
|---|---|---|---|---|---|---|
| **V1** | Institutional Editorial | Deep navy `#0f2340` + cream `#f4ede0` + rust `#a8542b` | Libre Caslon Text (display) + IBM Plex Sans (body) | Weaving canvas — warp threads + sliding shuttle + live fell-line | Chaddar-stripe `<ChaddarDivider/>` between sections; looms-in-operation stat (static, not ticker); anchor nav | Full content.jsx |
| **V2** | Workshop Atelier | Terracotta `#b9431f` + ivory `#f5f0e6` + plum `#2a1e2e` + straw `#e6c560` | Fraunces (display) + Work Sans (body) | Jacquard-motif inlay loom — TDF flower + mill pixel art woven row-by-row in hero card | Heddle-rack nav glyph; pixel-grid card hover (faint) | Full content.jsx |
| **V3** | Trade Journal | Warm cream + black ink + crimson `#e13727` accent | Didone display (e.g. GT Super) + slab body (e.g. Roslindale) | Warp × weft typographic grid underlay — body copy sits on visible thread-count baseline; dateline shows "pick 62 / cm" metadata | Dropcap "drawn" as thread on section enter; 2/40s cotton jargon in card meta; classifieds-style quick-hits | news, about, events |
| **V4** | Corporate Dossier | Navy `#0a1f3a` + gold `#b8923d` + ivory + charcoal | Söhne (display) + serif accent | **"Specimen №" fabric-spec lockup** — hero shows `SPECIMEN № 014 · warp 52 · weft 88 · 160 g/m²` with tiny live thread-draw SVG (the spec numbers are decorative metadata, not a data promise) | Annual-report-style stat cards drawn directly from `members.stats` and `hero.stats`; gold-foil treatment on facilities titles | facilities, members.stats, hero.stats |
| **V5** | Heritage Ledger | Sepia parchment + wax-seal red + iron-gall ink | Playfair Display + Spectral + typewriter micro | Peshwa 1761 grant-scroll unroll — About section reveals by unrolling a parchment listing Koshti/Sali/Sangar communities | Wax-stamp section marks; ledger-ruled tables for board/committee roster | about, committee |
| **V6** | Industrial Monograph | Slate `#2f3438` + warm white `#f2ece2` + muted rust accent | IBM Plex Serif + IBM Plex Sans | **Factory archival photography** — full-bleed b/w stills of power loom, shuttle, warp beam; captions drawn verbatim from `content.jsx` timeline entries (Peshwa 1761, Girangaon mills 1877–1909 as already authored) | Muted parallax 0.2×; caption text sourced from existing timeline and `solapur.paras` — no new editorial | solapur (facts, paras, highlights), about.timeline |
| **V7** | Data Monograph | Slate + amber `#c98a1a` + ivory | Inter + IBM Plex Mono | **25,000 → 15,000 thread-snap chart** — animated SVG data-viz, threads snap one-by-one as the chart enters viewport (represents 1992-95 loom collapse) | 50+ export countries as muted grid; ₹650 cr USSR export ribbon (static); year captions | solapur.facts, about |
| **V8** | Export Portfolio | Ivory + charcoal + single burgundy accent | Canela (display) + Inter (body) | **Collective member tapestry** — all 240 logos as equal-weight tiles on a warp/weft grid; reads as woven cloth; no tile featured over others | Certified-manufacturer foil badge (collective, not per-member); muted country-reach grid | members.logos |
| **V9** | Swiss Restrained | B/W + single signal red accent | Neue Haas Grotesk / Helvetica Now · 12-col grid | **Binary warp-up/warp-down strip** — faint strip at each section head (e.g. `1 0 1 1 0 0 1`), a restrained reference to loom-card binary encoding | One red footnote per page; numerals set as threading sequence; hard grid | Ornamental only — all sections |
| **V10** | Minimal Gallery | Warm white + deep charcoal (2 neutrals) | Editorial serif (e.g. GT Sectra) + Inter captions | **Fabric macro zoom (3 stops)** — hero starts on finished chaddar close-up, scroll zooms to yarn twist, then fibre cross-section | Silent captions; single aggregate stat ("1877 → today"); restrained country count | hero.corner, solapur.facts |

**Audit:** No variant introduces a new spotlight on an individual current member, office-bearer, or current manufacturer. Historical figures and mills named in `content.jsx` stay as accepted academic context. Member wall is equal-grid — no per-member hierarchy.

---

## 6. Shared Infrastructure

### 6.1 FAB (Variant Switcher)

- Floating button, bottom-right on desktop, bottom-centre on mobile
- Expands to panel listing 10 variants (data-driven from `versions.ts`)
- Each entry shows: id chip, label, 3-color swatch, 1-liner blurb, current-page indicator
- Panel collapses to bottom-sheet on `<640px`
- Keyboard accessible (Tab/Enter/Esc); focus trap when open
- Persists current-language selection across variant navigation (via `localStorage`)

### 6.2 Bilingual Toggle

- Single `LangProvider` context at `app/layout.tsx`
- Toggle widget in every variant's nav (position varies per variant; component shared)
- Switching language flips the content dictionary and swaps Devanagari font stack (Noto Serif Devanagari) for Marathi

### 6.3 Animation Primitives (`lib/motion.ts` + `components/shared/`)

| Primitive | Usage | Default |
|---|---|---|
| `<Reveal>` | fade-up 12px, IntersectionObserver once | 600ms easeOut, threshold 0.2 |
| `<Parallax y={0.3}>` | useScroll + `useTransform` | 0.2-0.4× depending on variant |
| `<Marquee speed>` | CSS `@keyframes` translate | pure CSS, no JS per frame |
| `<ScrollNum from to>` | count-up on viewport enter | 800ms |
| `<ChaddarDivider palette>` | stripe-band rule between sections | palette per variant |

All primitives:
- Check `prefers-reduced-motion: reduce` and fall back to static state
- No layout thrash — only `transform` and `opacity`
- No animation on initial SSR paint (wait for client mount)

### 6.4 Landing Hub (`/`)

- Masthead + intro (1 paragraph: "Ten directions being evaluated…")
- 10 variant cards in a responsive grid
- Each card: label, 3-color swatch, 1-line blurb, "Enter →" link to `/v{n}`
- FAB present on landing as well (symmetry)
- Minimal animation (stagger-in cards on load, nothing flashy)

---

## 7. Responsive Strategy

- Mobile-first CSS, breakpoints: **640 / 1024 / 1280**
- Fluid type via `clamp()` for hero displays (e.g. `clamp(2.4rem, 6vw, 5.5rem)`)
- Grids collapse to single column below 768px
- Nav → drawer below 1024px
- FAB → bottom-sheet below 640px
- Images served responsive with `next/image` (`sizes` attribute tuned per variant)
- All tap targets ≥ 44×44 CSS px
- No horizontal scroll on any viewport ≥ 320px

---

## 8. Accessibility Baseline

- Semantic HTML (headings in order; `main`, `nav`, `footer`, `section`)
- Color contrast AA for body text on every variant (verified at build time via manual audit before deploy)
- `prefers-reduced-motion` honored throughout
- Bilingual toggle announces to screen readers (`aria-live=polite` on language change)
- Canvas/SVG hero signatures have `aria-label` + `role="img"` with a one-sentence description; decorative uses `aria-hidden="true"`
- Skip-to-content link on every variant
- Keyboard reachable: FAB, nav, language toggle, all interactive elements

---

## 9. Performance Targets (soft)

- Lighthouse Performance ≥ 85 mobile, ≥ 95 desktop on landing + each variant
- LCP < 2.5s on 4G
- CLS < 0.1
- JS payload < 200 KB per variant (gzip) — framer-motion tree-shaken, dynamic imports where a variant's hero canvas is heavy

---

## 10. Deploy Flow

1. Push to `main` of `Arraj2611/TDF-design-demos`
2. Vercel project imports from GitHub (first time: "New Project → import repo → framework: Next.js → deploy")
3. Every push to `main` → production deploy; every branch push → preview URL
4. Share preview URL with TDF for review
5. Environment variables: none required for the demo (no backend)

`vercel.json` likely unnecessary — Next.js framework preset handles everything.

---

## 11. Out of Scope (this demo)

- Real CMS integration
- Contact form submission (display only — `mailto:` fallback acceptable)
- Authentication, member login
- Real fabric macro photography (stylized placeholders until client provides)
- Real factory photography for V6 (b/w placeholders with clear "archival-style" caption)
- Real-time analytics
- SEO optimization beyond basic metadata
- E-commerce / product listings
- Multi-language beyond EN / MR
- Automated screenshot regression tests

---

## 12. Open Questions / Decisions Deferred

| # | Question | Default Assumption |
|---|---|---|
| Q1 | Should `vercel.json` exist or rely on framework preset? | Rely on preset; add only if a rewrite/header needs force |
| Q2 | Will TDF supply real logos for the 240-member wall, or proceed with stylized wordmarks? | Stylized wordmarks until real logos arrive |
| Q3 | Will TDF supply real factory photography for V6? | Public-domain archival placeholders until supplied |
| Q4 | Landing page — should it default to showing the variant grid, or auto-redirect to V1? | Grid default; user explicitly picks a variant |
| Q5 | Single-variant "full-screen" view vs. keep FAB visible? | Keep FAB visible (context-preserving) |

---

## 13. Success Criteria

- 10 variants live at predictable URLs (`/v1`…`/v10`)
- Every variant passes visual distinction test (a viewer can recall which is which after 3 seconds of scanning)
- Every variant renders V1/V2 content faithfully — no content drift, no missing sections
- Bilingual toggle flips all text on every variant without layout break
- Every variant responsive from 320px to 1920px without horizontal scroll
- Every variant honors `prefers-reduced-motion`
- No individual person / company / mill featured on any variant
- FAB switches variants from anywhere
- Vercel preview URL shareable with org

---

## 14. Sequencing (handoff to writing-plans)

Suggested implementation order for the plan phase:
1. Scaffold Next 16 app + shared infra (FAB, content port, bilingual, animation primitives, landing grid)
2. **V1 Institutional** and **V2 Workshop** — ports from bundle (validates content pipeline + shared infra end-to-end)
3. **V10 Minimal Gallery** — simplest unique variant (validates CSS-module isolation approach)
4. **V9 Swiss Restrained** and **V3 Trade Journal** — text-heavy, low-animation variants
5. **V4 Corporate Dossier** and **V8 Export Portfolio** — medium-complexity
6. **V5 Heritage Ledger** and **V6 Industrial Monograph** — richer animations / photography
7. **V7 Data Monograph** — chart work
8. Final polish pass (Lighthouse, a11y audit, mobile smoke test)
9. Vercel deploy + share URL

The writing-plans skill will turn this into an executable plan with atomic tasks + verification.
