# Plan 2 — Variants V3 through V6

> **For agentic workers:** Use superpowers:subagent-driven-development. Checkbox (`- [ ]`) tracking.

**Goal:** Build V3 Trade Journal, V4 Corporate Dossier, V5 Heritage Ledger, V6 Industrial Monograph. Four new pages using the shared infra from Plan 1 (LangProvider, VariantSwitcher, Reveal, Parallax, Marquee, ScrollNum, ChaddarDivider, content + committee registries). Each variant ends as a deployable increment under `/v3`–`/v6`.

**Architecture:** Each variant follows the same shape as V1/V2 — `app/vN/page.tsx` entry → `components/variants/vN/Page.tsx` composition root → per-section Client Components reading `useT()` → scoped `styles/variants/vN.module.css`. No content added; no person-featuring sections; all variants render the same frozen `CONTENT[lang]` dict.

**Tech Stack:** Already locked by Plan 1. Add no new deps unless a variant's signature requires it.

**Repo root:** `C:/Users/arraj/Downloads/TDF-design-demos/` · main branch.

---

## Shared porting procedure (applies to each variant)

For each variant Vn the implementer should:

1. Create `app/vN/page.tsx` with `metadata.title` and import `VNPage` from `components/variants/vN/Page.tsx`.
2. Create `components/variants/vN/Page.tsx` composition root wrapping `<div className={styles.root}>` containing: `<Nav/> <Hero/> <About/> <Members/> <Committee/> <Facilities/> <News/> <Events/> <Solapur/> <Contact/> <Footer/>` (same order as V1/V2).
3. Create a section file per block (Client Components with `'use client'` + `useT()`).
4. Create `styles/variants/vN.module.css` scoped under `.root { --tokens… }` with variant palette + type stack. Port any responsive breakpoints. Mobile-first clamp() for hero titles.
5. Wire BOARD/COMMITTEE data from `lib/committee` for the Committee section.
6. Wrap major section blocks in `<Reveal>` from `@/components/shared/Reveal` for fade-up. Optional `<Parallax>` on hero decor.
7. Use `next/image` for `/assets/tdf-logo-v2.png`.
8. Include `<BilingualToggle>` in Nav.
9. Variant signature (hero interaction) ships as its own Client Component, dynamic-imported into Hero with `{ ssr: false }` only when it uses canvas/scroll-tied animation.
10. `npm run build` + `npx tsc --noEmit` + `npm run test` all green before commit.
11. Commit with author `Arraj2611 <arrajeevaken2611@gmail.com>`.

**No new content** — all variants consume existing `content.tsx` dictionary fields. If a section seems sparse, render only what's in content. Do not invent copy.

---

## Task 1: V3 Trade Journal — scaffold sections

**Variant:** Broadsheet typography on a visible warp × weft grid. Warm cream + black ink + crimson accent. Didone display serif + slab body (use Google Fonts: **Playfair Display** for display serif, **Roboto Slab** for body, keep Plex Mono for meta; Playfair already has the right Didone proportions and is free). Signature: body copy rests on a visible warp × weft baseline grid; pick-count updates in dateline header.

**Palette:** `#faf7f0` (cream) · `#141414` (ink) · `#e13727` (crimson accent only).

**Files to create:**
- `app/v3/page.tsx`
- `components/variants/v3/Page.tsx`
- `components/variants/v3/{Nav, Hero, About, Members, Committee, Facilities, News, Events, Solapur, Contact, Footer}.tsx`
- `styles/variants/v3.module.css`
- `lib/fonts.ts` — add Playfair Display + Roboto Slab exports

**Steps:**

- [ ] **Step 1: Add fonts to `lib/fonts.ts`**

Append exports for `Playfair Display` (weights 400, 700, 900; italic 400) and `Roboto Slab` (weights 300, 400, 500, 700) using the same `next/font/google` pattern as the existing fonts. Expose `--font-playfair` and `--font-slab` CSS variables. Reference in root layout's `className` chain (edit `app/layout.tsx` to include `${playfair.variable} ${robotoSlab.variable}`).

- [ ] **Step 2: Build all 11 V3 section components**

Follow the shared porting procedure. Use field names actually present in `lib/content.tsx` (verify — don't guess). Each section reads `useT()`; use Reveal wrapper on section-level blocks; wrap members logo grid + committee grid + facilities items in `Reveal` with staggered `delay` props for 60ms offsets.

Trade-journal quirks:
- Nav: small all-caps labels, crimson underline on hover.
- Hero: large Playfair H1 (use `clamp(56px, 8vw, 120px)`), eyebrow in mono caps, 2-column layout with dateline on left and running story on right.
- About: 3-column body text with drop-cap on first paragraph (large `::first-letter` styled Playfair Display 900).
- News feature: Lead story full-width with display italic subhead; quickHits in 4-col ledger.
- Events: dateline header `SOLAPUR · <day> <month>` on each card.

- [ ] **Step 3: Build CSS shell**

Create `styles/variants/v3.module.css`. Palette vars at top, then:
- Typography: `.root` sets `font-family: var(--font-slab), Georgia, serif`; H1/H2/H3 use `var(--font-playfair), serif`.
- Body paragraph rules use `font-size: 17px; line-height: 1.7; letter-spacing: 0.005em` (broadsheet feel).
- Section dividers: 1px crimson rule above section kickers.
- Drop-cap: `.dropcap::first-letter { float: left; font-family: var(--font-playfair); font-weight: 900; font-size: 6rem; line-height: 0.9; padding-right: 8px; color: var(--crimson); }`
- Responsive: below 1024, 3-col body → 2-col; below 640, 1-col.

- [ ] **Step 4: Verify**

```bash
npm run build
npm run test
npx tsc --noEmit
```

All green. 27 Vitest + 5 Playwright.

- [ ] **Step 5: Commit**

```bash
git add app/v3 components/variants/v3 styles/variants/v3.module.css lib/fonts.ts app/layout.tsx
git -c user.email="arrajeevaken2611@gmail.com" -c user.name="Arraj2611" commit -m "feat(v3): Trade Journal — broadsheet sections"
```

---

## Task 2: V3 signature — warp × weft baseline grid + drawn dropcap

**Signature behavior:** Body copy sits on a visible repeating horizontal-line baseline grid (weft threads). A faint vertical column rhythm reinforces warp direction. First-letter dropcap in About.lede "draws" on section enter (SVG stroke animation, respects reduced-motion with static render).

**Files:**
- `components/variants/v3/WarpWeftGrid.tsx` — background layer (pure CSS via inline styles or module class)
- `components/variants/v3/DropCap.tsx` — SVG letter with stroke animation
- Modify `About.tsx` to use `<DropCap letter={firstChar} />`

**Steps:**

- [ ] **Step 1: Grid layer**

Create `components/variants/v3/WarpWeftGrid.tsx` — Server Component, renders absolute-positioned div with CSS `repeating-linear-gradient` (horizontal crimson hairlines @ 2% alpha every 24px + vertical @ 1% every 80px). Mount at hero background + behind About column. `aria-hidden="true"`.

- [ ] **Step 2: DropCap SVG**

Create `components/variants/v3/DropCap.tsx` Client Component. Accepts `letter: string`. Renders an SVG with the letter drawn as a Playfair Display display-900 path (use `<text>` with `font-family="Playfair Display"` and `stroke-dasharray`/`stroke-dashoffset` animation on viewport enter via IntersectionObserver). On reduced-motion, renders filled final state immediately.

Prefer this simpler approach: render the letter as `<text>` with a CSS @keyframes animation on `stroke-dashoffset`, gated by `data-animated="true"` attribute set after IntersectionObserver fires. Reduced-motion path sets `data-animated="true"` immediately.

- [ ] **Step 3: Integrate into About**

Modify `components/variants/v3/About.tsx` — first paragraph wraps its first character in `<DropCap letter={...} />` + renders rest of paragraph. Grid layer mounts behind hero + About.

- [ ] **Step 4: Verify + commit**

```bash
npm run build && npm run test && npx tsc --noEmit
git add components/variants/v3 styles/variants/v3.module.css
git -c user.email="arrajeevaken2611@gmail.com" -c user.name="Arraj2611" commit -m "feat(v3): warp×weft baseline grid + drawn dropcap signature"
```

---

## Task 3: V4 Corporate Dossier — scaffold sections

**Variant:** Annual-report authority. Navy + gold + ivory. Söhne-equivalent sans (use **Inter** as free Söhne substitute) + serif accent (Playfair from Task 1). Signature: "Specimen №" fabric-spec lockup with live thread-draw SVG.

**Palette:** `#0a1f3a` (navy) · `#b8923d` (gold) · `#f4ede0` (ivory) · `#141414` (charcoal text).

**Files to create:**
- `app/v4/page.tsx`
- `components/variants/v4/Page.tsx`
- 11 section components under `components/variants/v4/`
- `styles/variants/v4.module.css`

**Steps:**

- [ ] **Step 1: Add Inter if not present**

`lib/fonts.ts` — add `Inter({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-inter' })`. Wire into `app/layout.tsx` className.

- [ ] **Step 2: Build sections + CSS shell**

Follow shared porting procedure. Corporate quirks:
- Nav: ivory background, navy wordmark, gold underline on active anchor.
- Hero: left column = Playfair kicker + Inter H1 + body lede; right column = placeholder for Specimen lockup (Task 4 fills).
- About: navy section header band with gold underline; body stays ivory.
- Members: stat cards in 2×2 grid, navy numbers + gold underline. Logo grid with foil hover (gold border shimmer).
- Facilities: 3-up cards with gold numeric index (`01 · 02 · 03 · 04 · 05`).
- Annual-report footer: 3-col layout (organisation · policies · contact) with gold dividing rule.

- [ ] **Step 3: Verify + commit**

```bash
npm run build && npm run test && npx tsc --noEmit
git add app/v4 components/variants/v4 styles/variants/v4.module.css lib/fonts.ts app/layout.tsx
git -c user.email="arrajeevaken2611@gmail.com" -c user.name="Arraj2611" commit -m "feat(v4): Corporate Dossier — annual-report sections"
```

---

## Task 4: V4 signature — Specimen № lockup

**Signature behavior:** Hero right column shows a printed-card lockup:

```
SPECIMEN № 014
─────────────
Warp  52  per cm
Weft  88  per cm
160 g/m² · cotton 2/40s
```

Below the text: a small SVG shows warp × weft threads being drawn. Animation: vertical warp threads draw in first (top-down), then horizontal weft threads draw L→R. ~2s total. On reduced-motion, threads appear fully drawn immediately.

**Files:**
- `components/variants/v4/SpecimenCard.tsx`

**Steps:**

- [ ] **Step 1: Build SpecimenCard**

Client Component with inline `<svg viewBox="0 0 200 120">`. 10 warp lines (vertical), 6 weft lines (horizontal). Use `stroke-dasharray` + CSS @keyframes for staggered draw. Hook reduced-motion via `usePrefersReducedMotion`: when true, omit the `data-animated` attribute that triggers keyframes and render threads as filled immediately.

Typography lockup above SVG uses monospace column alignment.

- [ ] **Step 2: Wire into Hero**

Hero.tsx right column mounts `<SpecimenCard />`.

- [ ] **Step 3: Verify + commit**

```bash
npm run build && npm run test && npx tsc --noEmit
git add components/variants/v4 styles/variants/v4.module.css
git -c user.email="arrajeevaken2611@gmail.com" -c user.name="Arraj2611" commit -m "feat(v4): SpecimenCard — fabric-spec lockup with thread-draw"
```

---

## Task 5: V5 Heritage Ledger — scaffold sections

**Variant:** Sepia parchment, wax-seal red, iron-gall ink. Playfair Display (from V3) + **Spectral** body serif + typewriter mono (IBM Plex Mono stays). Signature: Peshwa 1761 grant-scroll unrolls when About enters viewport.

**Palette:** `#efe3c9` (parchment) · `#7a1c1c` (wax) · `#2b241a` (iron-gall).

**Files to create:**
- `app/v5/page.tsx`
- `components/variants/v5/Page.tsx`
- 11 section components
- `styles/variants/v5.module.css`
- Add Spectral to `lib/fonts.ts`

**Steps:**

- [ ] **Step 1: Add Spectral font**

`lib/fonts.ts` — `Spectral({ subsets: ['latin'], weight: ['300','400','500','700'], style: ['normal', 'italic'], variable: '--font-spectral' })`. Wire into layout.

- [ ] **Step 2: Build sections + CSS shell**

Parchment feel:
- Body background uses subtle paper-texture via multiple radial-gradients (no images).
- Section headers flanked by wax-stamp SVG circles with stamp-ring + TDF monogram inside.
- Ledger-ruled tables for board + committee rosters: `.ledgerRow` with alternating `#efe3c9` / `#e8d9b8` bg + thin brown rules.
- Timeline entries use typewriter mono for years + Spectral italic for events.
- Committee uses ledger layout (not gallery portraits) — name, role, meta in 3 columns per row.
- Footer: signed-off ledger style "Ledgered at Akkalkot Road · MIDC · Solapur · 413006" in italic Spectral.

- [ ] **Step 3: Verify + commit**

```bash
npm run build && npm run test && npx tsc --noEmit
git add app/v5 components/variants/v5 styles/variants/v5.module.css lib/fonts.ts app/layout.tsx
git -c user.email="arrajeevaken2611@gmail.com" -c user.name="Arraj2611" commit -m "feat(v5): Heritage Ledger — parchment + wax-seal sections"
```

---

## Task 6: V5 signature — Grant-scroll unroll

**Signature behavior:** When About section enters viewport, an SVG parchment scroll unrolls top-to-bottom (scaleY 0 → 1, origin top, 800ms ease-out), revealing the Peshwa timeline content underneath. Fabric edges at top/bottom have ragged/torn edge SVGs. Reduced-motion: scroll renders fully opened immediately.

**Files:**
- `components/variants/v5/GrantScroll.tsx`

**Steps:**

- [ ] **Step 1: Build GrantScroll**

Client Component. Wraps children in a framer-motion `<motion.div>` with `initial={{ scaleY: 0 }}`, `whileInView={{ scaleY: 1 }}`, `viewport={{ once: true, amount: 0.3 }}`, `style={{ transformOrigin: 'top center' }}`. Decorative: SVG torn-paper border at top + bottom (jagged path). Reduced-motion: skip framer-motion wrap.

- [ ] **Step 2: Wire into About**

About.tsx wraps the existing timeline in `<GrantScroll>`. Rest of section (heading, lede, sidebar) outside scroll.

- [ ] **Step 3: Verify + commit**

```bash
npm run build && npm run test && npx tsc --noEmit
git add components/variants/v5 styles/variants/v5.module.css
git -c user.email="arrajeevaken2611@gmail.com" -c user.name="Arraj2611" commit -m "feat(v5): GrantScroll — Peshwa-era timeline unroll signature"
```

---

## Task 7: V6 Industrial Monograph — scaffold sections

**Variant:** Slate + warm white + muted rust. IBM Plex Serif + Plex Sans. Swiss grid precision. Archival-style factory photography (b/w placeholders for now — SVG-illustrated looms captioned with timeline dates from existing content).

**Palette:** `#2f3438` (slate) · `#f2ece2` (warm white) · `#a8542b` (muted rust).

**Files to create:**
- `app/v6/page.tsx`
- `components/variants/v6/Page.tsx`
- 11 section components
- `styles/variants/v6.module.css`

**Steps:**

- [ ] **Step 1: Build sections + CSS shell**

No new fonts — Plex Sans + Plex Serif already loaded. Add `IBM Plex Serif` to `lib/fonts.ts` if missing.

Monograph quirks:
- Full-bleed b/w "photograph" panels at section openings. Use SVG stand-ins with grayscale illustrations of warp beams, shuttle boxes, reed combs (inline SVG).
- Section captions set in 9pt mono with aggregate stats pulled from `CONTENT[lang].solapur.facts` and `.members.stats`. No pull-quotes, no named founders beyond what content already has.
- Committee uses tight Swiss grid — 3 columns of plex-sans text, no portraits.
- Parallax 0.2× on hero "photograph" via shared `<Parallax>`.
- Timeline: horizontal scroll-ticker-style row of year blocks with plex-mono years and plex-serif labels.

- [ ] **Step 2: Verify + commit**

```bash
npm run build && npm run test && npx tsc --noEmit
git add app/v6 components/variants/v6 styles/variants/v6.module.css lib/fonts.ts app/layout.tsx
git -c user.email="arrajeevaken2611@gmail.com" -c user.name="Arraj2611" commit -m "feat(v6): Industrial Monograph — sections with archival illustrations"
```

---

## Task 8: V6 signature — archival SVG illustration parallax

**Signature behavior:** Hero section shows a full-width SVG illustration of a 1900s power loom (inline SVG, grayscale, cross-hatched shading). Scrolls at 0.2× parallax via shared `<Parallax>`. Captioned with aggregate facts from `CONTENT[lang].solapur.facts` and timeline entries. Reduced-motion: Parallax already handles it; SVG stays static.

**Files:**
- `components/variants/v6/LoomIllustration.tsx` — inline SVG of power loom

**Steps:**

- [ ] **Step 1: Build LoomIllustration**

Server Component (no state). Inline `<svg viewBox="0 0 800 400">` with grayscale paths depicting: warp beam, heddles, reed, shuttle, fell line, cloth beam. Cross-hatch shading via `<pattern>` defs. Aria label "Archival illustration of a power loom in motion."

- [ ] **Step 2: Wire into Hero**

Hero.tsx mounts `<Parallax y={0.2}><LoomIllustration /></Parallax>` behind the headline.

- [ ] **Step 3: Verify + commit**

```bash
npm run build && npm run test && npx tsc --noEmit
git add components/variants/v6
git -c user.email="arrajeevaken2611@gmail.com" -c user.name="Arraj2611" commit -m "feat(v6): LoomIllustration — archival SVG with parallax"
```

---

## Task 9: Playwright smoke extension

Extend `tests/smoke/routes.spec.ts` to cover `/v3`, `/v4`, `/v5`, `/v6`. For each new variant: one test "renders heading + hero content". For variants with canvas/SVG signatures, also verify the signature element is present.

**Steps:**

- [ ] **Step 1: Extend smoke spec**

Add 4 new tests to the existing describe block — one per new variant route. Each: `page.goto('/vN'); await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();`.

- [ ] **Step 2: Run + commit**

```bash
npm run e2e
git add tests/smoke/routes.spec.ts
git -c user.email="arrajeevaken2611@gmail.com" -c user.name="Arraj2611" commit -m "test(smoke): cover /v3, /v4, /v5, /v6 routes"
```

Expected: 9 smoke tests all pass.

---

## Task 10: Push + ship

```bash
git push origin main
```

Vercel auto-deploys the new commits. Preview URL updates.

---

## Self-Review Checklist

After each variant:
- `/vN` route loads without errors
- Bilingual EN/MR toggle flips content
- FAB navigates between variants
- Mobile viewport (360px) has no horizontal scroll
- Reduced-motion gracefully disables animations
- No person/company featured beyond what's already in content
- Commit message and author correct

## Execution Handoff

After all 10 tasks, Plan 3 covers V7-V10 + final polish.
