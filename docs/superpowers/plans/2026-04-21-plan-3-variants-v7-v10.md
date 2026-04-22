# Plan 3 — Variants V7 through V10 + Final Polish

**Goal:** Ship V7 Data Monograph, V8 Export Portfolio, V9 Swiss Restrained, V10 Minimal Gallery, then final polish pass (Lighthouse sweep + mobile audit + smoke extension). All variants consume the frozen `lib/content.tsx` + `lib/committee.ts`. No new shared infra. User explicitly said "I don't want mediocrity" — every variant must feel authored.

**Repo:** `C:/Users/arraj/Downloads/TDF-design-demos/`, branch `main`. Live: https://tdf-design-demos.vercel.app/.

---

## Task 1: V7 Data Monograph

Register: a Bloomberg sector report crossed with Tufte's *Visual Display of Quantitative Information*. Data-first, restrained, axis-aware. The hero is a serious piece of data-viz — not a chart-library default.

**Palette:** `#2a3138` slate (primary) · `#c98a1a` amber (reserved for data emphasis) · `#f4ede0` ivory ground · `#6a6f74` steel (axis labels) · `#1a1c1e` deepened slate (H1).

**Type:** **Inter** (already loaded) for body/UI, **IBM Plex Mono** for all numerics + axis labels, **IBM Plex Serif** (loaded in V6) for display H1/H2.

**Signature — Loom-count collapse chart:**

Hero has a single authoritative SVG chart: the 25,000 → 15,000 power-loom collapse over 1992-1995. Rendered as 50 vertical thread-lines (warps) arranged left-to-right, each representing 500 looms. On viewport enter, lines snap downward (scale-y → 0) in staggered sequence — 20 of them snap (5 per year across 4 years), leaving 30 standing. Reduced-motion: final state rendered immediately (20 snapped, 30 standing). Below the chart: a restrained axis in Plex Mono — years 1992/1993/1994/1995 + loom counts 25,000 / 22,500 / 18,000 / 15,000. No tooltip, no hover, no "interactive" chart library — pure SVG + framer-motion.

Use facts from `content.tsx` timeline (`t.about.timeline` has entries for 1992 peak + relevant years). Caption in Plex Mono: `FIG. 1 · POWER LOOM INDEX 1992–1995 · SOURCE: TDF ARCHIVES`.

**Callbacks:** Export-countries grid (pulled from `t.solapur.highlights` if relevant, else `t.solapur.facts`). ₹650 cr USSR ribbon rendered as a static annotated bar in the About section. Quiet year captions throughout timeline.

**Files:**
- `app/v7/page.tsx`
- `components/variants/v7/Page.tsx`
- `components/variants/v7/{Nav, Hero, About, Members, Committee, Facilities, News, Events, Solapur, Contact, Footer}.tsx`
- `components/variants/v7/LoomCollapseChart.tsx` — the signature SVG chart with staggered thread-snap animation
- `components/variants/v7/ExportGrid.tsx` — supporting tabular/ribbon data
- `styles/variants/v7.module.css`

**Per-section:** Every section header is `FIG. N · TITLE` style. Committee rendered as a data appendix (row num / initials / role / name / meta). Facilities as a spec table with stats. Events as a chronological ledger. Solapur as a facts dashboard.

**Commit:** `feat(v7): Data Monograph — loom-count collapse chart + data-first sections`

---

## Task 2: V8 Export Portfolio

Register: a Christie's catalogue / Tate portfolio / Kinfolk quarterly. Oversized fine serif, ivory + charcoal + single burgundy accent. The signature is the collective member tapestry.

**Palette:** `#f4ede0` ivory · `#141414` charcoal · `#5b1a1a` burgundy accent · `#8a8a88` dust (secondary labels) · `#e6dcc5` cream rule.

**Type:** **Canela** display serif — substitute with **GT Sectra Display** or fallback to **Playfair Display 900 italic** with aggressive `opsz 144` if Canela unavailable via Google Fonts (it isn't, so use Playfair Display 900 italic — already loaded — treated with wider letter-spacing and larger sizes). Body → **Inter** (loaded). Mono → **IBM Plex Mono** (loaded).

**Signature — Collective member tapestry:**

Members section = a woven tapestry where all 240 member units are rendered as equal tiles on a warp/weft grid. No tile featured over others. Hover on any tile: the tile reveals the member's `m` (meta) in burgundy text. The tapestry is visually a cloth — the grid positions use a 16-col warp rhythm + alternating tile colors (ivory, cream, ivory, cream) in a plain-weave pattern. On viewport enter, tiles fade in via staggered IntersectionObserver with a 20ms offset per tile for a woven-in feel. Reduced-motion: all tiles visible immediately.

Caption: `240 MEMBER UNITS · EST. RANGE 1909–2024 · WOVEN EQUAL` in Plex Mono burgundy caps.

**Callbacks:** Oversized Playfair 900 italic section titles (clamp(72px, 10vw, 160px)). Country-reach grid in Solapur rendered as an unlabelled typographic map (country names in Plex Mono with restrained burgundy dots). Footer: the "EST. 1995" stamp in burgundy, italicised.

**Files:**
- `app/v8/page.tsx`
- `components/variants/v8/Page.tsx`
- `components/variants/v8/{Nav, Hero, About, Members, Committee, Facilities, News, Events, Solapur, Contact, Footer}.tsx`
- `components/variants/v8/MemberTapestry.tsx` — the signature woven logo grid with stagger animation
- `styles/variants/v8.module.css`

**Commit:** `feat(v8): Export Portfolio — oversized serif + member tapestry signature`

---

## Task 3: V9 Swiss Restrained

Register: Müller-Brockmann / pure Swiss grid / late modernist. 12-column grid visible as a design choice (faint rules). Monochrome with a SINGLE signal red accent per page. Helvetica-equivalent (Inter tight-tracked) because Helvetica isn't free via Google Fonts.

**Palette:** `#ffffff` white · `#141414` black · `#e13727` signal red (exactly one red element per section — no more). `#8a8a8a` grey for secondary.

**Type:** **Inter** (tight tracking, weights 300/400/500/700) everywhere. No serif. No mono. Pure grotesque.

**Signature — Binary warp-up/warp-down strip:**

Each section header has a horizontal strip of dashes/pipes that encode the section's position in the page as a binary loom-card pattern. Section I = `1 0 1 1 0 0 1 0 1 1 1 0`. Section II = `1 1 0 1 0 1 0 0 1 1 0 1`. Etc. Rendered as 12 monospace characters with subtle opacity shifts (1 = black dot, 0 = 25% opacity dot). Quiet. Referential to jacquard punch cards without being on-the-nose.

**Callbacks:** One red footnote per page. Numerals rendered as threading sequences (e.g. `0 2 4 0` for "240" with 0-padding between digits). Grid lines subtly visible at 4% opacity.

**Files:**
- `app/v9/page.tsx`
- `components/variants/v9/Page.tsx`
- `components/variants/v9/{Nav, Hero, About, Members, Committee, Facilities, News, Events, Solapur, Contact, Footer}.tsx`
- `components/variants/v9/BinaryStrip.tsx` — the warp-up/down binary strip
- `styles/variants/v9.module.css`

**Commit:** `feat(v9): Swiss Restrained — 12-col grid + binary warp strip signature`

---

## Task 4: V10 Minimal Gallery

Register: Jil Sander / The Row lookbook / MUJU. Two neutrals + single muted accent. Oversized photography/macros. Absurdly generous whitespace. Captions in the corners. The whole page reads as a gallery of fabric artifacts.

**Palette:** `#f4ede0` warm white · `#2b241a` deep charcoal · `#a8542b` muted rust (used once in footer signature). 2 neutrals + 1 accent, nothing else.

**Type:** **GT Sectra** (substitute with **Playfair Display 400** — already loaded — with increased letter-spacing and reduced weight for lookbook calm) + **Inter** 300 for captions.

**Signature — Fabric macro zoom:**

Hero is a 3-stop scroll-progressive zoom on a fabric macro. Start: a full finished chaddar square (rendered as a 40×40 grid of fabric cells, plain weave, terra + ivory alternating). Scroll progress 0-33%: zoom to 10×10 grid (yarn-twist detail level). Scroll 33-66%: zoom to 3×3 grid (single yarn close-up with visible fibre twist). Scroll 66-100%: cross-section illustration (fibre bundle SVG). Implemented via `useScroll` + `useTransform` on three layers with opacity cross-fades + scale. Reduced-motion: static final state (yarn-twist detail level).

Caption in corner: `FIG. 01 · CHADDAR · 52 × 88 · WARP × WEFT · 160 G/M²` in Inter 300 11px.

**Callbacks:** Single aggregate stat in Hero: `1877 → 2026` in Playfair 400 with century arrow. Export-reach shown as a muted country word-list in Solapur. Footer has ONE rust-colored signature line.

**Files:**
- `app/v10/page.tsx`
- `components/variants/v10/Page.tsx`
- `components/variants/v10/{Nav, Hero, About, Members, Committee, Facilities, News, Events, Solapur, Contact, Footer}.tsx`
- `components/variants/v10/FabricZoom.tsx` — the 3-stop scroll-driven zoom signature
- `styles/variants/v10.module.css`

**Commit:** `feat(v10): Minimal Gallery — fabric macro zoom signature + lookbook sections`

---

## Task 5: Final polish

1. Extend Playwright smoke tests to cover /v7, /v8, /v9, /v10 (4 new tests).
2. Sweep all 10 variants for obvious responsive bugs at 360px.
3. Verify reduced-motion compliance on V7 chart, V8 tapestry, V10 fabric zoom.
4. Verify FAB switches correctly through all 10 editions.
5. Final Lighthouse check on `/` — target Performance ≥ 85 mobile, ≥ 95 desktop.

**Commit:** `test(smoke): cover /v7, /v8, /v9, /v10 routes` + any polish fixes as separate commits.

---

## Hard constraints (apply to all 4 variants)

1. Logo: `/assets/tdf-logo-v2.png` via `next/image` in Nav + Footer.
2. Content: 100% from `lib/content.tsx` via `useT()`. No invented copy.
3. Rosters: `BOARD` + `COMMITTEE` from `@/lib/committee` with tab toggle.
4. No spotlight passages beyond what exists in content.
5. Bilingual toggle in Nav.
6. Reveal on major blocks. Reduced-motion gated on all signature animations.
7. Mobile-first responsive, no horizontal scroll at 360px.
8. Commits authored as `Arraj2611 <arrajeevaken2611@gmail.com>`.

## Sequencing

One variant per subagent dispatch. Each commit pushed to main after review. Plan 3 done when `/v10` ships + smoke extended.
