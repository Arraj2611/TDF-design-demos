# Plan 1 — Foundation + V1/V2 Port + First Deploy

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Next.js 16 app, port V1 (Institutional) and V2 (Workshop) designs from the HTML/Babel bundle into typed React components, build shared infra (FAB variant switcher, bilingual context, animation primitives), set up the landing grid, and deploy to Vercel with the first shareable preview URL.

**Architecture:** Next.js 16 App Router + TypeScript strict. Shared content lives in `lib/content.ts` (ported from `content.jsx`) and `lib/committee.ts`. Each variant is its own route `/v1`, `/v2` with variant-local components under `components/variants/vN/`. Shared primitives (Reveal, Parallax, Marquee, ChaddarDivider, BilingualToggle, FAB) live under `components/shared/`. CSS Modules per variant (`styles/variants/vN.module.css`) with Tailwind v4 for shared chrome. Animations via `framer-motion`, all reduced-motion aware. Deploy via GitHub → Vercel integration.

**Tech Stack:** Next.js 16, React 19, TypeScript 5.9 (strict), Tailwind v4, framer-motion 11, next/font (Google Fonts), Vitest + React Testing Library for unit/component tests, Playwright for smoke tests. Node 24.

**Repo root:** `C:/Users/arraj/Downloads/TDF-design-demos/` (git remote: `https://github.com/Arraj2611/TDF-design-demos.git`, branch `main`).

**Bundle reference (read-only source of the port):** `C:/Users/arraj/Downloads/TDF/_design_bundle/tdf/project/`.

---

## File Structure (after this plan)

```
TDF-design-demos/
├── app/
│   ├── layout.tsx                        # root: fonts + LangProvider + FAB mount
│   ├── page.tsx                          # landing grid of variants
│   ├── globals.css                       # Tailwind + CSS var tokens
│   ├── v1/page.tsx                       # V1 Institutional Editorial
│   └── v2/page.tsx                       # V2 Workshop Atelier
├── components/
│   ├── shared/
│   │   ├── LangProvider.tsx              # React context + useT() hook
│   │   ├── BilingualToggle.tsx
│   │   ├── Reveal.tsx                    # IntersectionObserver fade-up
│   │   ├── Parallax.tsx                  # useScroll translate
│   │   ├── Marquee.tsx                   # CSS @keyframes ticker
│   │   ├── ScrollNum.tsx                 # count-up on viewport enter
│   │   ├── ChaddarDivider.tsx            # stripe-band rule
│   │   └── VariantSwitcher.tsx           # FAB (data-driven)
│   └── variants/
│       ├── v1/
│       │   ├── Page.tsx                  # V1 composition root
│       │   ├── Nav.tsx
│       │   ├── Hero.tsx                  # weaving canvas
│       │   ├── About.tsx
│       │   ├── Members.tsx
│       │   ├── Committee.tsx
│       │   ├── Facilities.tsx
│       │   ├── News.tsx
│       │   ├── Events.tsx
│       │   ├── Solapur.tsx
│       │   ├── Contact.tsx
│       │   └── Footer.tsx
│       └── v2/
│           ├── Page.tsx
│           ├── Nav.tsx
│           ├── Hero.tsx                  # motif-inlay loom canvas
│           ├── About.tsx
│           ├── Members.tsx
│           ├── Committee.tsx
│           ├── Facilities.tsx
│           ├── News.tsx
│           ├── Events.tsx
│           ├── Solapur.tsx
│           ├── Contact.tsx
│           └── Footer.tsx
├── lib/
│   ├── content.ts                        # bilingual dictionary + types
│   ├── committee.ts                      # BOARD + COMMITTEE rosters
│   ├── versions.ts                       # variant registry
│   ├── motion.ts                         # shared framer-motion variants
│   └── useReducedMotion.ts               # wrapper over framer-motion's hook
├── styles/
│   └── variants/
│       ├── v1.module.css
│       └── v2.module.css
├── public/
│   └── assets/
│       ├── tdf-logo.jpeg
│       └── tdf-logo-v2.png
├── tests/
│   ├── setup.ts
│   ├── lib/
│   │   ├── content.test.ts
│   │   ├── committee.test.ts
│   │   └── versions.test.ts
│   ├── shared/
│   │   ├── LangProvider.test.tsx
│   │   ├── BilingualToggle.test.tsx
│   │   ├── Reveal.test.tsx
│   │   ├── ScrollNum.test.tsx
│   │   └── VariantSwitcher.test.tsx
│   └── smoke/
│       └── routes.spec.ts                # Playwright: landing, /v1, /v2 load
├── docs/
│   ├── specs/2026-04-21-tdf-demos-design.md  # (already committed)
│   └── superpowers/plans/2026-04-21-plan-1-foundation-v1-v2.md  # this file
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── package.json
├── .gitignore
├── .env.example
└── README.md
```

---

## Task 1: Scaffold Next.js 16 + TypeScript + Tailwind v4

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `public/next.svg` (auto), `.gitignore` (auto)

- [ ] **Step 1: Scaffold with `create-next-app`**

Run in terminal from `C:/Users/arraj/Downloads/`:

```bash
npx create-next-app@latest TDF-design-demos --typescript --tailwind --app --turbopack --no-src-dir --import-alias "@/*" --use-npm --yes
```

Because the repo directory already exists with `docs/` inside, `create-next-app` will refuse. Workaround — scaffold into a temp dir and merge:

```bash
cd C:/Users/arraj/Downloads
mv TDF-design-demos TDF-design-demos.orig
npx create-next-app@latest TDF-design-demos --typescript --tailwind --app --turbopack --no-src-dir --import-alias "@/*" --use-npm --yes
# merge docs + .git back in
cp -r TDF-design-demos.orig/.git TDF-design-demos/
cp -r TDF-design-demos.orig/docs TDF-design-demos/
rm -rf TDF-design-demos.orig
cd TDF-design-demos
```

Expected: `package.json`, `next.config.ts`, `tsconfig.json`, `app/`, `tailwind.config.ts` exist. `npm run dev` works and serves default Next page at `http://localhost:3000`.

- [ ] **Step 2: Verify versions**

Run:

```bash
node -e "const p=require('./package.json'); console.log(p.dependencies);"
```

Expected: `next` ≥ `16.0.0`, `react` ≥ `19.0.0`, `tailwindcss` ≥ `4.0.0`. If `create-next-app` scaffolds an older Next (e.g. 15.x because 16 is not yet the `latest` tag at run time), upgrade explicitly:

```bash
npm install next@^16 react@^19 react-dom@^19
```

- [ ] **Step 3: Enable TypeScript strict**

Edit `tsconfig.json` — ensure `"strict": true` under `compilerOptions` (scaffold default already sets this; confirm). Also add:

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

- [ ] **Step 4: Verify build**

Run:

```bash
npm run build
```

Expected: "Compiled successfully" with no type errors.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: scaffold Next.js 16 + TS strict + Tailwind v4"
```

---

## Task 2: Install framer-motion, clsx, and testing deps

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime deps**

```bash
npm install framer-motion clsx
```

- [ ] **Step 2: Install dev deps (Vitest + RTL + Playwright)**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @playwright/test
npx playwright install chromium
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname) } },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
  },
});
```

- [ ] **Step 4: Create `tests/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => { cleanup(); });

// IntersectionObserver polyfill for jsdom
class IO {
  observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
  root = null; rootMargin = ''; thresholds = [];
}
// @ts-expect-error assign polyfill
globalThis.IntersectionObserver = IO;

// matchMedia polyfill
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (q: string) => ({
    matches: false, media: q, onchange: null,
    addListener() {}, removeListener() {},
    addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; },
  }),
});
```

- [ ] **Step 5: Create `playwright.config.ts`**

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/smoke',
  timeout: 30_000,
  webServer: {
    command: 'npm run build && npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: { baseURL: 'http://localhost:3000' },
});
```

- [ ] **Step 6: Add `test` + `e2e` scripts to `package.json`**

Under `scripts`, add:

```json
"test": "vitest run",
"test:watch": "vitest",
"e2e": "playwright test"
```

- [ ] **Step 7: Sanity: `npm run test` passes with "No test files found"**

Run:

```bash
npm run test -- --passWithNoTests
```

Expected: exit 0.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "chore: install framer-motion + Vitest + RTL + Playwright"
```

---

## Task 3: Port content.jsx → `lib/content.ts` (types)

**Files:**
- Create: `lib/content.ts`
- Test: `tests/lib/content.test.ts`
- Read-only reference: `C:/Users/arraj/Downloads/TDF/_design_bundle/tdf/project/content.jsx`

- [ ] **Step 1: Write the failing test**

Create `tests/lib/content.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { CONTENT, type Lang } from '@/lib/content';

describe('CONTENT dictionary', () => {
  it('has en and mr locales', () => {
    expect(CONTENT.en).toBeDefined();
    expect(CONTENT.mr).toBeDefined();
  });

  it('en and mr share the same top-level keys', () => {
    const enKeys = Object.keys(CONTENT.en).sort();
    const mrKeys = Object.keys(CONTENT.mr).sort();
    expect(mrKeys).toEqual(enKeys);
  });

  const langs: Lang[] = ['en', 'mr'];
  langs.forEach((lang) => {
    it(`${lang} has required sections`, () => {
      const c = CONTENT[lang];
      expect(c.nav).toBeTruthy();
      expect(c.hero).toBeTruthy();
      expect(c.about).toBeTruthy();
      expect(c.members).toBeTruthy();
      expect(c.committee).toBeTruthy();
      expect(c.facilities).toBeTruthy();
      expect(c.news).toBeTruthy();
      expect(c.events).toBeTruthy();
      expect(c.solapur).toBeTruthy();
      expect(c.contact).toBeTruthy();
      expect(c.foot).toBeTruthy();
    });

    it(`${lang} members.stats includes "15,000+" power looms stat`, () => {
      const looms = CONTENT[lang].members.stats.find((s) => /15,?000/.test(s.n));
      expect(looms).toBeDefined();
    });

    it(`${lang} about timeline includes 1761 Peshwa entry`, () => {
      const peshwa = CONTENT[lang].about.timeline.find((e) => e.y === '1761' || e.y === '१७६१');
      expect(peshwa).toBeDefined();
    });
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm run test
```

Expected: fail with "Cannot find module '@/lib/content'".

- [ ] **Step 3: Read the bundle `content.jsx` to extract the dictionary**

Read `C:/Users/arraj/Downloads/TDF/_design_bundle/tdf/project/content.jsx` (59,983 bytes). It defines `window.CONTENT = { en: {...}, mr: {...} }`. Port as a TypeScript module.

Create `lib/content.ts`. Structure:

```ts
export type Lang = 'en' | 'mr';

export interface NavItem { id: string; label: string; }
export interface HeroStat { label: string; value: string; }
export interface MemberStat { n: string; l: string; }
export interface Logo { m: string; n: string; c?: string; k?: string; id?: string; }
export interface TimelineEntry { y: string; c?: string; t: string; a?: boolean; }
export interface AboutSection { kicker: string; title: React.ReactNode; sub: string; timelineTitle: string; timeline: TimelineEntry[]; paras: string[]; }
export interface Fact { label: string; value: string; }
export interface Facility { letter: string; name: string; body: string; }
export interface Article { kicker?: string; title: string; deck?: string; body?: string; meta?: string; }
export interface Event { d: string; m: string; y?: string; title: string; body: string; featured?: boolean; }
export interface Content {
  nav: { items: NavItem[]; join: string; lang: { en: string; mr: string }; };
  hero: { corner: string[]; kicker: string; title: React.ReactNode; deck: string; stats: HeroStat[]; cta: { primary: string; secondary: string }; };
  about: AboutSection;
  members: { kicker: string; title: string; deck: string; stats: MemberStat[]; logos: Logo[]; filters: string[]; };
  committee: { kicker: string; title: string; deck: string; boardTab: string; committeeTab: string; boardNote: string; committeeNote: string; };
  facilities: { kicker: string; title: string; deck: string; items: Facility[]; };
  news: { kicker: string; title: string; feature: Article; quickHits: Article[]; secondary?: Article; };
  events: { kicker: string; title: string; upcomingTab: string; pastTab: string; upcoming: Event[]; past: Event[]; };
  solapur: { kicker: string; title: string; deck: string; facts: Fact[]; paras: string[]; highlights: string[]; };
  contact: { kicker: string; title: string; address: string; phone: string; email: string; mapEmbed: string; mapLink: string; };
  foot: { resources: { heading: string; links: NavItem[] }; connect: { heading: string; links: NavItem[] }; right: string; };
}

// Port both locales from bundle content.jsx (en + mr)
const en: Content = { /* … */ };
const mr: Content = { /* … */ };

export const CONTENT: Record<Lang, Content> = { en, mr };
```

Because the bundle uses JSX fragments inside strings (e.g. `title: ["From ", <em>Girangaon</em>, " to a global textile hub."]`), those become `React.ReactNode` arrays. `title: React.ReactNode` accommodates both plain strings and fragment arrays.

**Mechanical port procedure:**

1. Open bundle `content.jsx` in the editor.
2. Rename the top-level `window.CONTENT = {…}` to `const CONTENT_DATA = {…}` and copy into `lib/content.ts`.
3. Wrap with TypeScript types above.
4. Replace `<em key="i">` fragments with `<em>` (TypeScript does not need the key for literal fragments in a static export — but React may warn; leave keys intact since these are in arrays).
5. Export `CONTENT: Record<Lang, Content> = CONTENT_DATA as Record<Lang, Content>`.
6. Because the file now contains JSX, rename to `lib/content.tsx`. Update the test import in Step 1 to `@/lib/content` (Next.js resolves both `.ts` and `.tsx`).

Final: save as `lib/content.tsx`.

- [ ] **Step 4: Run test — expect PASS**

```bash
npm run test
```

Expected: all `CONTENT dictionary` tests green.

- [ ] **Step 5: Fix any type errors**

Run:

```bash
npx tsc --noEmit
```

Resolve any mismatches between the `Content` interface and the ported data. If the bundle has an optional field the interface marks required (or vice versa), adjust the interface — not the data — since content is frozen per spec §2.3.

- [ ] **Step 6: Commit**

```bash
git add lib/content.tsx tests/lib/content.test.ts
git commit -m "feat(content): port bilingual content dictionary with TS types"
```

---

## Task 4: Port committee-data.jsx → `lib/committee.ts`

**Files:**
- Create: `lib/committee.ts`
- Test: `tests/lib/committee.test.ts`
- Reference: `C:/Users/arraj/Downloads/TDF/_design_bundle/tdf/project/committee-data.jsx`

- [ ] **Step 1: Write the failing test**

Create `tests/lib/committee.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { BOARD, COMMITTEE, type Member } from '@/lib/committee';

describe('BOARD', () => {
  it('has a chair', () => {
    expect(BOARD.chair).toBeDefined();
    expect(BOARD.chair.role).toBe('President');
  });
  it('has 2 vice-chairs', () => {
    expect(BOARD.vice).toHaveLength(2);
  });
  it('has 7 directors', () => {
    expect(BOARD.directors).toHaveLength(7);
  });
  it('all members have img, role, name, meta', () => {
    const all: Member[] = [BOARD.chair, ...BOARD.vice, ...BOARD.directors];
    all.forEach((m) => {
      expect(m.img).toBeTruthy();
      expect(m.role).toBeTruthy();
      expect(m.name).toBeTruthy();
      expect(m.meta).toBeTruthy();
    });
  });
});

describe('COMMITTEE', () => {
  it('has chair + vice + officers + executive', () => {
    expect(COMMITTEE.chair).toBeDefined();
    expect(COMMITTEE.vice).toHaveLength(2);
    expect(COMMITTEE.officers).toHaveLength(4);
    expect(COMMITTEE.executive).toHaveLength(6);
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm run test
```

Expected: fail with "Cannot find module '@/lib/committee'".

- [ ] **Step 3: Port the rosters**

Create `lib/committee.ts`:

```ts
export interface Member {
  img: string;   // 2-letter initials until photos arrive
  role: string;
  name: string;
  meta: string;
}

export interface BoardGroup {
  chair: Member;
  vice: Member[];
  directors: Member[];
}

export interface CommitteeGroup {
  chair: Member;
  vice: Member[];
  officers: Member[];
  executive: Member[];
}

export const BOARD: BoardGroup = {
  chair: {
    img: 'RD',
    role: 'President',
    name: 'Rajesh Deshmukh',
    meta: 'Founder · Sahyadri Broadlooms\nChair since 2022. Third-term director.',
  },
  vice: [
    { img: 'PK', role: 'Vice-President', name: 'Prakash Kshirsagar', meta: 'Kshirsagar Terry Mills\nHon. Treasurer 2018–22.' },
    { img: 'SM', role: 'Hon. Secretary', name: 'Shilpa Morarji', meta: 'Morarji Group\nFirst woman on the board (2020).' },
  ],
  directors: [
    { img: 'AN', role: 'Director · Finance', name: 'Anand Narayandas', meta: 'Godavari Textile Mills' },
    { img: 'VJ', role: 'Director · Exports', name: 'Vijay Jadhav', meta: 'Patil Terry Expo' },
    { img: 'HG', role: 'Director · Policy', name: 'Hemant Gadgil', meta: 'Neelkanth Textiles · Processing' },
    { img: 'SP', role: 'Director · Technical', name: 'Sudhir Patil', meta: 'Swastik Weaves · Jacquard' },
    { img: 'MV', role: 'Director · HR', name: 'Meenal Vaidya', meta: 'Shivanjali Textiles' },
    { img: 'RJ', role: 'Director · Youth', name: 'Rahul Joshi', meta: 'Bhimashankar Terry · 2G Entrepreneur' },
    { img: 'BK', role: 'Director · Heritage', name: 'Balwant Kulkarni', meta: 'Jamshree Ratansingji · est. 1909' },
  ],
};

export const COMMITTEE: CommitteeGroup = {
  chair: {
    img: 'NH',
    role: 'Convenor',
    name: 'Nitin Hegde',
    meta: 'Convenor since 2024. Runs monthly meetings and member services.',
  },
  vice: [
    { img: 'KP', role: 'Dy. Convenor · Events', name: 'Kiran Patankar', meta: 'Lead for VTTES 2026 organising' },
    { img: 'AR', role: 'Dy. Convenor · Advocacy', name: 'Anil Ranade', meta: 'Liaison with DIC & MSEDCL' },
  ],
  officers: [
    { img: 'SD', role: 'Officer · Training', name: 'Sonali Dhole', meta: 'Training Centre operations' },
    { img: 'VP', role: 'Officer · Lab', name: 'Vikram Phadke', meta: 'NABL accreditation lead' },
    { img: 'RC', role: 'Officer · Design', name: 'Radha Chavan', meta: 'Design Centre & CAD' },
    { img: 'MM', role: 'Officer · Membership', name: 'Manoj Mane', meta: 'New applications & renewals' },
  ],
  executive: [
    { img: 'AS', role: 'Exec · Finance', name: 'Asha Shinde', meta: 'Books & audit coordination' },
    { img: 'DJ', role: 'Exec · Secretariat', name: 'Dilip Jogdand', meta: 'Office manager · 14 years' },
    { img: 'PG', role: 'Exec · Communications', name: 'Pooja Gore', meta: 'Newsletter & social media' },
    { img: 'TK', role: 'Exec · Game Zone', name: 'Tushar Kamble', meta: 'Youth programmes & tournaments' },
    { img: 'LN', role: 'Exec · Rec. Zone', name: 'Lalita Nagarkar', meta: 'Reading room & library' },
    { img: 'IS', role: 'Exec · Logistics', name: 'Imran Shaikh', meta: 'Venues, travel, delegations' },
  ],
};
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npm run test
```

Expected: all `BOARD` and `COMMITTEE` tests green.

- [ ] **Step 5: Commit**

```bash
git add lib/committee.ts tests/lib/committee.test.ts
git commit -m "feat(committee): port board + committee rosters"
```

---

## Task 5: Create `lib/versions.ts` variant registry

**Files:**
- Create: `lib/versions.ts`
- Test: `tests/lib/versions.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/lib/versions.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { VARIANTS, type Variant } from '@/lib/versions';

describe('VARIANTS registry', () => {
  it('registers exactly 10 variants', () => {
    expect(VARIANTS).toHaveLength(10);
  });
  it('every variant has required fields', () => {
    VARIANTS.forEach((v: Variant) => {
      expect(v.id).toMatch(/^v\d+$/);
      expect(v.slug).toMatch(/^v\d+$/);
      expect(v.label).toBeTruthy();
      expect(v.blurb).toBeTruthy();
      expect(v.swatch).toHaveLength(3);
      v.swatch.forEach((hex) => expect(hex).toMatch(/^#[0-9a-fA-F]{3,8}$/));
      expect(v.signature).toBeTruthy();
    });
  });
  it('ids are v1..v10 in order', () => {
    expect(VARIANTS.map((v) => v.id)).toEqual(['v1','v2','v3','v4','v5','v6','v7','v8','v9','v10']);
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm run test
```

Expected: fail with "Cannot find module '@/lib/versions'".

- [ ] **Step 3: Create the registry**

Create `lib/versions.ts`:

```ts
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
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npm run test
```

- [ ] **Step 5: Commit**

```bash
git add lib/versions.ts tests/lib/versions.test.ts
git commit -m "feat(versions): variant registry for landing + FAB"
```

---

## Task 6: LangProvider context + `useT()` hook

**Files:**
- Create: `components/shared/LangProvider.tsx`
- Test: `tests/shared/LangProvider.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/shared/LangProvider.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { LangProvider, useT, useLang } from '@/components/shared/LangProvider';

function Probe() {
  const t = useT();
  const { lang, setLang } = useLang();
  return (
    <div>
      <output data-testid="lang">{lang}</output>
      <output data-testid="hero-kicker">{t.hero.kicker}</output>
      <button onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}>toggle</button>
    </div>
  );
}

describe('LangProvider', () => {
  it('defaults to en', () => {
    render(<LangProvider><Probe/></LangProvider>);
    expect(screen.getByTestId('lang').textContent).toBe('en');
  });

  it('toggles to mr and flips the content', async () => {
    render(<LangProvider><Probe/></LangProvider>);
    const kickerEn = screen.getByTestId('hero-kicker').textContent;
    await userEvent.click(screen.getByRole('button', { name: /toggle/i }));
    expect(screen.getByTestId('lang').textContent).toBe('mr');
    const kickerMr = screen.getByTestId('hero-kicker').textContent;
    expect(kickerMr).not.toBe(kickerEn);
  });

  it('persists lang to localStorage', async () => {
    render(<LangProvider><Probe/></LangProvider>);
    await userEvent.click(screen.getByRole('button', { name: /toggle/i }));
    expect(localStorage.getItem('tdf.lang')).toBe('mr');
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

Expected: "Cannot find module '@/components/shared/LangProvider'".

- [ ] **Step 3: Implement LangProvider**

Create `components/shared/LangProvider.tsx`:

```tsx
'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { CONTENT, type Content, type Lang } from '@/lib/content';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Content;
}

const Ctx = createContext<LangCtx | null>(null);
const STORAGE_KEY = 'tdf.lang';

export function LangProvider({ children, initial = 'en' }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initial);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored === 'en' || stored === 'mr') setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo<LangCtx>(() => ({ lang, setLang, t: CONTENT[lang] }), [lang, setLang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useLang must be used inside <LangProvider>');
  return v;
}

export function useT(): Content {
  return useLang().t;
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npm run test
```

- [ ] **Step 5: Commit**

```bash
git add components/shared/LangProvider.tsx tests/shared/LangProvider.test.tsx
git commit -m "feat(shared): LangProvider context with localStorage persistence"
```

---

## Task 7: BilingualToggle component

**Files:**
- Create: `components/shared/BilingualToggle.tsx`
- Test: `tests/shared/BilingualToggle.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/shared/BilingualToggle.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { LangProvider } from '@/components/shared/LangProvider';
import { BilingualToggle } from '@/components/shared/BilingualToggle';

describe('BilingualToggle', () => {
  it('shows EN / मराठी pair', () => {
    render(<LangProvider><BilingualToggle/></LangProvider>);
    expect(screen.getByRole('button', { name: /en/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /मराठी/ })).toBeInTheDocument();
  });

  it('toggles language on click', async () => {
    render(<LangProvider><BilingualToggle/></LangProvider>);
    const mrBtn = screen.getByRole('button', { name: /मराठी/ });
    await userEvent.click(mrBtn);
    expect(mrBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

- [ ] **Step 3: Implement BilingualToggle**

Create `components/shared/BilingualToggle.tsx`:

```tsx
'use client';

import clsx from 'clsx';
import { useLang } from './LangProvider';

export function BilingualToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className={clsx('inline-flex gap-1', className)}>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={clsx('px-2 py-1 text-xs tracking-widest uppercase', lang === 'en' ? 'opacity-100' : 'opacity-50')}
      >
        EN
      </button>
      <span aria-hidden="true">·</span>
      <button
        type="button"
        onClick={() => setLang('mr')}
        aria-pressed={lang === 'mr'}
        className={clsx('px-2 py-1 text-xs', lang === 'mr' ? 'opacity-100' : 'opacity-50')}
        style={{ fontFamily: '"Noto Serif Devanagari", serif' }}
      >
        मराठी
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Run test — expect PASS**

- [ ] **Step 5: Commit**

```bash
git add components/shared/BilingualToggle.tsx tests/shared/BilingualToggle.test.tsx
git commit -m "feat(shared): BilingualToggle wired to LangProvider"
```

---

## Task 8: Reveal primitive (IntersectionObserver fade-up)

**Files:**
- Create: `components/shared/Reveal.tsx`
- Create: `lib/useReducedMotion.ts`
- Test: `tests/shared/Reveal.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/shared/Reveal.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Reveal } from '@/components/shared/Reveal';

describe('Reveal', () => {
  it('renders children', () => {
    render(<Reveal><p>hello</p></Reveal>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
  it('applies data-reveal attribute for CSS hooks', () => {
    const { container } = render(<Reveal><p>hello</p></Reveal>);
    expect(container.firstElementChild).toHaveAttribute('data-reveal');
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

- [ ] **Step 3: Implement**

Create `lib/useReducedMotion.ts`:

```ts
'use client';
import { useEffect, useState } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduce;
}
```

Create `components/shared/Reveal.tsx`:

```tsx
'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li';
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const MotionTag = motion[Tag] as typeof motion.div;
  if (reduce) {
    return <Tag data-reveal className={className}>{children}</Tag>;
  }
  return (
    <MotionTag
      data-reveal
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={VARIANTS}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
```

- [ ] **Step 4: Run test — expect PASS**

- [ ] **Step 5: Commit**

```bash
git add components/shared/Reveal.tsx lib/useReducedMotion.ts tests/shared/Reveal.test.tsx
git commit -m "feat(shared): Reveal primitive with reduced-motion fallback"
```

---

## Task 9: Parallax + Marquee + ScrollNum + ChaddarDivider primitives

**Files:**
- Create: `components/shared/Parallax.tsx`, `Marquee.tsx`, `ScrollNum.tsx`, `ChaddarDivider.tsx`
- Test: `tests/shared/ScrollNum.test.tsx`
- Modify: `app/globals.css` (marquee keyframes)

- [ ] **Step 1: Write failing test for ScrollNum**

Create `tests/shared/ScrollNum.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollNum } from '@/components/shared/ScrollNum';

describe('ScrollNum', () => {
  it('renders the target value as accessible fallback', () => {
    render(<ScrollNum from={0} to={15000} format={(n) => n.toLocaleString()} />);
    expect(screen.getByText('15,000')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

- [ ] **Step 3: Implement primitives**

Create `components/shared/Parallax.tsx`:

```tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

export function Parallax({ children, y = 0.3, className }: { children: ReactNode; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const translate = useTransform(scrollYProgress, [0, 1], [`${-50 * y}px`, `${50 * y}px`]);
  if (reduce) return <div ref={ref} className={className}>{children}</div>;
  return <motion.div ref={ref} className={className} style={{ y: translate }}>{children}</motion.div>;
}
```

Create `components/shared/Marquee.tsx`:

```tsx
'use client';
import clsx from 'clsx';

export function Marquee({ items, speed = 30, className }: { items: string[]; speed?: number; className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={clsx('marquee', className)} role="marquee" aria-label="News ticker">
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {doubled.map((t, i) => (
          <span key={i} className="marquee-item">{t}</span>
        ))}
      </div>
    </div>
  );
}
```

Append to `app/globals.css`:

```css
.marquee {
  overflow: hidden;
  position: relative;
  white-space: nowrap;
}
.marquee-track {
  display: inline-flex;
  gap: 2.5rem;
  animation-name: marquee-scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}
.marquee-item { flex-shrink: 0; }
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}
```

Create `components/shared/ScrollNum.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

export function ScrollNum({
  from = 0,
  to,
  durationMs = 800,
  format = (n: number) => String(Math.round(n)),
}: {
  from?: number;
  to: number;
  durationMs?: number;
  format?: (n: number) => string;
}) {
  const [n, setN] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) { setN(to); return; }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const start = performance.now();
        setN(from);
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / durationMs);
          setN(from + (to - from) * p);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        observer.disconnect();
      });
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); };
  }, [from, to, durationMs, reduce]);

  return <span ref={ref} aria-label={format(to)}>{format(n)}</span>;
}
```

Create `components/shared/ChaddarDivider.tsx`:

```tsx
export function ChaddarDivider({
  palette = ['#a8542b', '#f4ede0', '#0f2340'],
  height = 16,
  className,
}: {
  palette?: readonly [string, string, string];
  height?: number;
  className?: string;
}) {
  const [a, b, c] = palette;
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={className}
      style={{
        height,
        backgroundImage: `repeating-linear-gradient(90deg, ${a} 0 10px, ${b} 10px 14px, ${c} 14px 24px, ${b} 24px 28px)`,
      }}
    />
  );
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npm run test
```

- [ ] **Step 5: Commit**

```bash
git add components/shared/ lib/ app/globals.css tests/shared/ScrollNum.test.tsx
git commit -m "feat(shared): Parallax, Marquee, ScrollNum, ChaddarDivider primitives"
```

---

## Task 10: VariantSwitcher FAB

**Files:**
- Create: `components/shared/VariantSwitcher.tsx`
- Test: `tests/shared/VariantSwitcher.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/shared/VariantSwitcher.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { VariantSwitcher } from '@/components/shared/VariantSwitcher';

describe('VariantSwitcher', () => {
  it('renders a toggle button', () => {
    render(<VariantSwitcher currentSlug="v1" />);
    expect(screen.getByRole('button', { name: /editions?/i })).toBeInTheDocument();
  });
  it('opens the panel with all 10 variants on click', async () => {
    render(<VariantSwitcher currentSlug="v1" />);
    await userEvent.click(screen.getByRole('button', { name: /editions?/i }));
    expect(screen.getAllByRole('link')).toHaveLength(10);
  });
  it('marks the current variant', async () => {
    render(<VariantSwitcher currentSlug="v2" />);
    await userEvent.click(screen.getByRole('button', { name: /editions?/i }));
    const links = screen.getAllByRole('link');
    const current = links.find((l) => l.getAttribute('aria-current') === 'page');
    expect(current?.textContent).toMatch(/Workshop/);
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

- [ ] **Step 3: Implement**

Create `components/shared/VariantSwitcher.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import { VARIANTS } from '@/lib/versions';

export function VariantSwitcher({ currentSlug }: { currentSlug?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onEsc);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onEsc);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const current = VARIANTS.find((v) => v.slug === currentSlug);

  return (
    <div ref={panelRef} className="fixed bottom-5 right-5 z-[9999] font-mono">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex items-center gap-2 rounded-full bg-neutral-900 text-neutral-100 px-4 py-3 text-[11px] tracking-[0.18em] uppercase font-semibold border border-neutral-100/20 shadow-2xl hover:bg-neutral-800"
      >
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-400" />
        Edition · {current?.label ?? 'Overview'}
      </button>

      {open && (
        <div
          id={panelId}
          role="menu"
          className="absolute right-0 bottom-full mb-2 w-72 rounded-2xl bg-neutral-900 border border-neutral-100/20 p-2 shadow-2xl max-h-[70vh] overflow-auto"
        >
          <div className="px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-neutral-100/50">
            Switch edition
          </div>
          {VARIANTS.map((v) => {
            const isCurrent = v.slug === currentSlug;
            return (
              <Link
                key={v.id}
                href={`/${v.slug}`}
                aria-current={isCurrent ? 'page' : undefined}
                className={clsx(
                  'flex items-start gap-3 px-3 py-2 rounded-xl no-underline text-neutral-100 hover:bg-neutral-100/10',
                  isCurrent && 'bg-amber-400/10'
                )}
              >
                <span
                  className="h-7 w-7 shrink-0 rounded-md"
                  style={{
                    background: `linear-gradient(135deg, ${v.swatch[0]} 0 50%, ${v.swatch[1]} 50% 80%, ${v.swatch[2]} 80% 100%)`,
                  }}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold truncate">{v.label}</span>
                  <span className="block text-[10px] tracking-[0.08em] uppercase text-neutral-100/55">
                    {v.signature}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run test — expect PASS**

- [ ] **Step 5: Commit**

```bash
git add components/shared/VariantSwitcher.tsx tests/shared/VariantSwitcher.test.tsx
git commit -m "feat(shared): VariantSwitcher FAB — data-driven from registry"
```

---

## Task 11: Root layout — fonts + LangProvider + FAB mount

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `lib/fonts.ts`

- [ ] **Step 1: Create font loader**

Create `lib/fonts.ts`:

```ts
import {
  Libre_Caslon_Text, IBM_Plex_Sans, IBM_Plex_Mono, Fraunces, Work_Sans,
  Noto_Serif_Devanagari,
} from 'next/font/google';

export const caslon = Libre_Caslon_Text({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-caslon' });
export const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-plex-sans' });
export const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-plex-mono' });
export const fraunces = Fraunces({ subsets: ['latin'], weight: ['400','500','700','900'], variable: '--font-fraunces' });
export const workSans = Work_Sans({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-work-sans' });
export const devanagari = Noto_Serif_Devanagari({ subsets: ['devanagari'], weight: ['400','600','700'], variable: '--font-devanagari' });
```

- [ ] **Step 2: Replace `app/layout.tsx`**

Overwrite `app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { LangProvider } from '@/components/shared/LangProvider';
import { VariantSwitcher } from '@/components/shared/VariantSwitcher';
import { caslon, plexSans, plexMono, fraunces, workSans, devanagari } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'TDF Solapur — Design Directions',
  description: 'Ten design directions for the Textile Development Foundation, Solapur.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${caslon.variable} ${plexSans.variable} ${plexMono.variable} ${fraunces.variable} ${workSans.variable} ${devanagari.variable}`}
    >
      <body>
        <LangProvider>
          {children}
          <VariantSwitcher />
        </LangProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Add CSS var tokens to `globals.css`**

Append to `app/globals.css`:

```css
:root {
  --font-sans: var(--font-plex-sans), system-ui, sans-serif;
  --font-serif: var(--font-caslon), Georgia, serif;
  --font-mono: var(--font-plex-mono), ui-monospace, monospace;
  --font-display: var(--font-fraunces), serif;
  --font-workshop: var(--font-work-sans), sans-serif;
}
body.lang-mr {
  --font-sans: var(--font-devanagari), system-ui, sans-serif;
  --font-serif: var(--font-devanagari), Georgia, serif;
}
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```

Note: the `body.lang-mr` class is toggled by `LangProvider` via a `useEffect` that adds/removes the class. Update `LangProvider.tsx`:

```tsx
// Add near the existing useEffect:
useEffect(() => {
  if (typeof document === 'undefined') return;
  document.body.classList.toggle('lang-mr', lang === 'mr');
}, [lang]);
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: compiles with no TS or ESLint errors.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css lib/fonts.ts components/shared/LangProvider.tsx
git commit -m "feat(app): root layout with font vars + LangProvider + FAB mount"
```

---

## Task 12: Landing page — variant grid

**Files:**
- Replace: `app/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace the scaffolded page**

Overwrite `app/page.tsx`:

```tsx
import Link from 'next/link';
import { VARIANTS } from '@/lib/versions';

export default function Landing() {
  return (
    <main className="min-h-dvh bg-[--paper] text-[--ink] px-6 py-16 md:py-24" style={{ ['--paper' as never]: '#f4ede0', ['--ink' as never]: '#141414' }}>
      <div className="mx-auto max-w-6xl">
        <header className="mb-14 md:mb-20">
          <p className="font-mono text-xs tracking-[0.3em] uppercase opacity-60 mb-3">
            Textile Development Foundation · Solapur
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-3xl">
            Ten design directions under evaluation.
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg opacity-75 leading-relaxed">
            Each edition below renders the same organisation content in a
            different visual register. Pick any to preview. The edition
            switcher (bottom-right) moves between them.
          </p>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VARIANTS.map((v) => (
            <li key={v.id}>
              <Link
                href={`/${v.slug}`}
                className="group block rounded-2xl border border-black/10 p-5 hover:border-black/30 transition-colors bg-white/40 no-underline text-[--ink]"
              >
                <div
                  className="h-16 w-full rounded-lg mb-4"
                  style={{ background: `linear-gradient(135deg, ${v.swatch[0]} 0% 40%, ${v.swatch[1]} 40% 75%, ${v.swatch[2]} 75% 100%)` }}
                  aria-hidden="true"
                />
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-55">{v.id}</span>
                  <h2 className="font-serif text-xl">{v.label}</h2>
                </div>
                <p className="text-sm opacity-75 leading-relaxed mb-3">{v.blurb}</p>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-65 group-hover:opacity-100">
                  Signature · {v.signature} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify locally**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: landing grid with 10 cards, FAB bottom-right.

- [ ] **Step 3: Responsive smoke check**

In the browser, resize to 360px wide. Expected: single-column grid, no horizontal scroll.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(landing): variant grid with 10 editions"
```

---

## Task 13: Copy logo assets

**Files:**
- Create: `public/assets/tdf-logo-v2.png`, `public/assets/tdf-logo.jpeg`

- [ ] **Step 1: Copy from bundle**

```bash
mkdir -p public/assets
cp "../TDF/_design_bundle/tdf/project/assets/tdf-logo-v2.png" public/assets/
cp "../TDF/_design_bundle/tdf/project/assets/tdf-logo.jpeg" public/assets/
ls -la public/assets/
```

Expected: both files present.

- [ ] **Step 2: Commit**

```bash
git add public/assets/
git commit -m "chore: copy TDF logo assets from bundle"
```

---

## Task 14: V1 — port Institutional Editorial page (scaffold + placeholder sections)

**Files:**
- Create: `app/v1/page.tsx`
- Create: `components/variants/v1/Page.tsx`
- Create: `components/variants/v1/{Nav,Hero,About,Members,Committee,Facilities,News,Events,Solapur,Contact,Footer}.tsx`
- Create: `styles/variants/v1.module.css`
- Reference: `_design_bundle/tdf/project/sections.jsx`, `components.jsx`, `styles.css`

- [ ] **Step 1: Route file**

Create `app/v1/page.tsx`:

```tsx
import { V1Page } from '@/components/variants/v1/Page';
export default function Page() { return <V1Page />; }
```

- [ ] **Step 2: Compose the page**

Create `components/variants/v1/Page.tsx`:

```tsx
import styles from '@/styles/variants/v1.module.css';
import { Nav } from './Nav';
import { Hero } from './Hero';
import { About } from './About';
import { Members } from './Members';
import { Committee } from './Committee';
import { Facilities } from './Facilities';
import { News } from './News';
import { Events } from './Events';
import { Solapur } from './Solapur';
import { Contact } from './Contact';
import { Footer } from './Footer';

export function V1Page() {
  return (
    <div className={styles.root}>
      <Nav />
      <main>
        <Hero />
        <About />
        <Members />
        <Committee />
        <Facilities />
        <News />
        <Events />
        <Solapur />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Port CSS shell**

Read `_design_bundle/tdf/project/styles.css` (32 KB). Extract V1-scoped rules (design tokens + typography + layout primitives). Create `styles/variants/v1.module.css` with the tokens scoped under `.root`:

```css
.root {
  --ink: #0f2340;
  --paper: #f4ede0;
  --rust: #a8542b;
  --line: rgba(15, 35, 64, 0.14);
  --line-2: rgba(15, 35, 64, 0.28);
  --mute: rgba(15, 35, 64, 0.64);

  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans);
}
.root h1, .root h2, .root h3 {
  font-family: var(--font-serif);
  font-weight: 400;
  letter-spacing: -0.01em;
}
/* …port section-specific rules from styles.css, converting id/class selectors
   to scoped :local selectors. Grep for `.hero`, `.members`, `.committee`,
   `.facilities`, `.news`, `.events`, `.solapur`, `.contact`, `.footer`
   in styles.css and port each block. */
```

**Port procedure (repeat for each section):**
1. In bundle `styles.css`, locate the CSS block for the section (e.g. `/* Hero */` comment to next `/*` block).
2. Copy the rules into `v1.module.css` under `.root`.
3. Replace any `:root` custom properties with local ones inside `.root`.
4. Replace hard-coded `body { ... }` rules with `.root` rules.
5. Leave Tailwind untouched — this is a CSS-Module file.

- [ ] **Step 4: Port Nav component**

Read `_design_bundle/tdf/project/components.jsx` lines around `function NavV1` (or the nav export). Rewrite as a React Server Component where possible, Client Component only for interactive bits (bilingual toggle lives in its own client component).

Create `components/variants/v1/Nav.tsx`:

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useT } from '@/components/shared/LangProvider';
import { BilingualToggle } from '@/components/shared/BilingualToggle';
import styles from '@/styles/variants/v1.module.css';

export function Nav() {
  const t = useT();
  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/v1" className={styles.navMark} aria-label="TDF home">
          <Image src="/assets/tdf-logo-v2.png" alt="TDF" width={40} height={40} priority />
          <span className={styles.navWordmark}>TDF</span>
        </Link>
        <nav aria-label="Primary">
          <ul className={styles.navLinks}>
            {t.nav.items.map((i) => (
              <li key={i.id}>
                <a href={`#${i.id}`}>{i.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.navRight}>
          <BilingualToggle />
          <a href="#contact" className={styles.navJoin}>{t.nav.join}</a>
        </div>
      </div>
    </header>
  );
}
```

Add `.nav`, `.navInner`, `.navMark`, `.navWordmark`, `.navLinks`, `.navRight`, `.navJoin` rules in `v1.module.css`, ported from bundle `styles.css` `.nav-v1-*` rules.

- [ ] **Step 5: Port each remaining V1 section**

For each of `Hero`, `About`, `Members`, `Committee`, `Facilities`, `News`, `Events`, `Solapur`, `Contact`, `Footer`:

1. Find the section in `_design_bundle/tdf/project/sections.jsx`.
2. Create `components/variants/v1/<Section>.tsx`.
3. Make it a Client Component (`'use client'`) if it reads `useT()`. Otherwise keep as Server Component and pass content as props from `Page.tsx`.
4. Replace `window.CONTENT[lang].section` with `useT().section`.
5. Replace `className="foo"` with CSS-module imports: `import styles from '@/styles/variants/v1.module.css'` → `className={styles.foo}`.
6. For images (`assets/tdf-logo-v2.png`), use `next/image` with `src="/assets/tdf-logo-v2.png"`.
7. Wrap section in `<Reveal>` so it fades up on viewport enter.

Example — `components/variants/v1/Hero.tsx`:

```tsx
'use client';

import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { ScrollNum } from '@/components/shared/ScrollNum';
import { HeroWeaveCanvas } from './HeroWeaveCanvas';
import styles from '@/styles/variants/v1.module.css';

export function Hero() {
  const t = useT();
  return (
    <section id="hero" className={styles.hero}>
      <HeroWeaveCanvas />
      <Reveal className={styles.heroText}>
        <p className={styles.heroKicker}>{t.hero.kicker}</p>
        <h1 className={styles.heroTitle}>{t.hero.title}</h1>
        <p className={styles.heroDeck}>{t.hero.deck}</p>
        <ul className={styles.heroStats}>
          {t.hero.stats.map((s, i) => (
            <li key={i}>
              <strong>
                {/^\d/.test(s.value) ? (
                  <ScrollNum
                    to={parseInt(s.value.replace(/[^\d]/g, ''), 10)}
                    format={(n) => Math.round(n).toLocaleString() + s.value.replace(/[\d,]/g, '').trim()}
                  />
                ) : (
                  s.value
                )}
              </strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
```

The `HeroWeaveCanvas` is the animated warp/weft loom from the bundle. Port in the next task.

**Perf note:** in `components/variants/v1/Hero.tsx`, load `HeroWeaveCanvas` via `next/dynamic` with `ssr: false` so the 2D canvas logic never ships in the server HTML and is tree-shaken out of the initial chunk:

```tsx
import dynamic from 'next/dynamic';
const HeroWeaveCanvas = dynamic(() => import('./HeroWeaveCanvas').then(m => m.HeroWeaveCanvas), { ssr: false });
```

Apply the same pattern to V2's `HeroCardWeave` in Task 17.

- [ ] **Step 6: Verify route renders**

```bash
npm run dev
```

Open `http://localhost:3000/v1`. Expected: all sections present (even if animations pending), no console errors, bilingual toggle flips text, FAB visible.

- [ ] **Step 7: Commit**

```bash
git add app/v1 components/variants/v1 styles/variants/v1.module.css
git commit -m "feat(v1): port Institutional Editorial sections from bundle"
```

---

## Task 15: V1 — HeroWeaveCanvas (warp + shuttle animation)

**Files:**
- Create: `components/variants/v1/HeroWeaveCanvas.tsx`
- Reference: bundle `components.jsx` — find `function HeroWeave` or equivalent

- [ ] **Step 1: Locate bundle implementation**

Grep bundle `components.jsx` for the canvas function (lines 1–280 in bundle `components.jsx`). The V1 hero uses a `<canvas>` with warp threads drawn at fixed x-positions, shuttle traveling left-to-right leaving weft behind it, color palette = navy ink + cream paper + rust accent.

- [ ] **Step 2: Port as a Client Component**

Create `components/variants/v1/HeroWeaveCanvas.tsx`:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

const INK = '#0f2340';
const PAPER = '#f4ede0';
const RUST = '#a8542b';

export function HeroWeaveCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    let raf = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.round(r.width * DPR);
      canvas.height = Math.round(r.height * DPR);
      ctx.scale(DPR, DPR);
    };

    const WARP_COUNT = 60;
    let shuttleX = 0;
    let weftRows: Array<{ y: number; color: string }> = [];

    const draw = () => {
      const r = canvas.getBoundingClientRect();
      const w = r.width, h = r.height;
      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, w, h);

      // Warp lines
      ctx.strokeStyle = INK;
      ctx.globalAlpha = 0.15;
      for (let i = 0; i < WARP_COUNT; i++) {
        const x = (w / WARP_COUNT) * i + 2;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Weft rows (already laid)
      for (const row of weftRows) {
        ctx.strokeStyle = row.color;
        ctx.beginPath();
        ctx.moveTo(0, row.y);
        ctx.lineTo(w, row.y);
        ctx.stroke();
      }

      // Shuttle at fell line
      const fellY = h - 40 - (weftRows.length % 8) * 4;
      ctx.fillStyle = RUST;
      ctx.fillRect(shuttleX - 12, fellY - 3, 24, 6);

      if (!reduce) {
        shuttleX += 3;
        if (shuttleX > w + 20) {
          shuttleX = -20;
          weftRows.push({ y: fellY, color: weftRows.length % 4 === 0 ? RUST : INK });
          if (weftRows.length > 60) weftRows = weftRows.slice(-60);
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="Animated weaving loom depicting warp threads and a passing shuttle"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    />
  );
}
```

(The bundle has a longer, prettier version with chaddar border + color palette cycling. If the above differs materially from the bundle when viewed side-by-side in-browser, port the richer algorithm from bundle `components.jsx` after seeing the bundle rendering — but honor reduced-motion and DPR handling.)

- [ ] **Step 3: Verify**

Open `http://localhost:3000/v1`. Expected: hero has the animated weave behind the text.

- [ ] **Step 4: Commit**

```bash
git add components/variants/v1/HeroWeaveCanvas.tsx
git commit -m "feat(v1): HeroWeaveCanvas — warp threads + shuttle animation"
```

---

## Task 16: V2 — port Workshop Atelier page (scaffold + sections)

**Files:**
- Create: `app/v2/page.tsx`
- Create: `components/variants/v2/Page.tsx`
- Create: `components/variants/v2/{Nav,Hero,About,Members,Committee,Facilities,News,Events,Solapur,Contact,Footer}.tsx`
- Create: `styles/variants/v2.module.css`
- Reference: `_design_bundle/tdf/project/sections-v2.jsx`, `components-v2.jsx`, `styles-v2.css`

- [ ] **Step 1: Route + Page composition**

Mirror Task 14 steps 1-2 with `v2` paths.

- [ ] **Step 2: Port CSS shell to `v2.module.css`**

From `_design_bundle/tdf/project/styles-v2.css` (39 KB). Tokens:

```css
.root {
  --terra: #b9431f;
  --ivory: #f5f0e6;
  --plum: #2a1e2e;
  --straw: #e6c560;
  --sage: #5a6b4a;

  background: var(--ivory);
  color: var(--plum);
  font-family: var(--font-workshop);
}
.root h1, .root h2, .root h3 { font-family: var(--font-display); }
/* Port remaining V2-scoped rules here. */
```

Repeat the port procedure from Task 14 step 3 but for `styles-v2.css`.

- [ ] **Step 3: Port each V2 section**

Mirror Task 14 steps 4-5 using `sections-v2.jsx` + `components-v2.jsx` as source. V2 has a marquee (`<Marquee>`) above the hero — wire to the shared `Marquee` primitive.

Example — `components/variants/v2/Nav.tsx`:

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useT } from '@/components/shared/LangProvider';
import { BilingualToggle } from '@/components/shared/BilingualToggle';
import styles from '@/styles/variants/v2.module.css';

export function Nav() {
  const t = useT();
  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/v2" className={styles.mark}>
          <Image src="/assets/tdf-logo-v2.png" alt="TDF" width={44} height={44} />
        </Link>
        <nav aria-label="Primary">
          <ul className={styles.links}>
            {t.nav.items.map((i) => <li key={i.id}><a href={`#${i.id}`}>{i.label}</a></li>)}
          </ul>
        </nav>
        <div className={styles.right}>
          <BilingualToggle />
          <a href="#contact" className={styles.cta}>{t.nav.join}</a>
        </div>
      </div>
    </header>
  );
}
```

The V2 marquee in the bundle lives in `components-v2.jsx` under `function Marquee`. Replace with the shared `<Marquee>` primitive in `components/variants/v2/Page.tsx`:

```tsx
<Marquee items={[
  'Textile Development Foundation · Solapur',
  t.nav.join,
  'VTTES 2026 · 18 November 2026',
  'P-28, MIDC Akkalkot Road, Solapur',
  '240+ Member Units',
  'Est. 1995',
  'Terry Towels · Chaddars · Yarn',
  `${t.contact.email} · ${t.contact.phone}`,
]} />
```

- [ ] **Step 4: Verify `/v2` renders**

```bash
npm run dev
```

Open `http://localhost:3000/v2`. All sections visible, bilingual toggle works, FAB switches to V1 and back.

- [ ] **Step 5: Commit**

```bash
git add app/v2 components/variants/v2 styles/variants/v2.module.css
git commit -m "feat(v2): port Workshop Atelier sections from bundle"
```

---

## Task 17: V2 — HeroCardWeave (motif-inlay loom)

**Files:**
- Create: `components/variants/v2/HeroCardWeave.tsx`
- Reference: bundle `components-v2.jsx` lines ~36-320 (`function HeroCardWeave`)

- [ ] **Step 1: Port the motif-inlay canvas**

The bundle's `HeroCardWeave` is a ~280-line canvas component. It weaves a 40×56 pixel-art motif (TDF flower + mill + "TDF" text) row by row, plum background, terra/straw/yellow pixels.

Create `components/variants/v2/HeroCardWeave.tsx`. Copy the full implementation from `_design_bundle/tdf/project/components-v2.jsx` lines 36-320 (`function HeroCardWeave` + the `MOTIF` grid + the `MC` color map). Adapt:

1. Change `const { useState: useStV2, useEffect: useEfV2, useRef: useRfV2 } = React;` to `import { useEffect, useRef } from 'react'`.
2. Replace `React.useStV2` hook calls accordingly.
3. Add `'use client'` at the top.
4. Add reduced-motion gating — if `usePrefersReducedMotion()` returns true, render a static final frame instead of animating.
5. Wrap canvas with `role="img"` + descriptive `aria-label`.

**Key invariants to preserve (from the chat transcript):**
- Canvas must fill card via `position: absolute; inset: 0; width: 100%; height: 100%` plus explicit `canvas.width`/`canvas.height` set to `card.clientWidth * DPR` in a `ResizeObserver`.
- Fell-line label overlay sits at `z-index: 2` above canvas.
- Labels "Solapuri Chaddar · sample no. 014" and "Warp × Weft · 52 × 88" need a subtle plum gradient backdrop (`background: linear-gradient(to bottom, rgba(42,30,46,0.85), transparent)`) so they stay readable over any weave state.

- [ ] **Step 2: Drop into V2 Hero**

Update `components/variants/v2/Hero.tsx` to embed `<HeroCardWeave />` inside the workshop hero card. Follow `sections-v2.jsx` layout for the hero two-column (text left, card right).

- [ ] **Step 3: Visual verify in browser**

Open `http://localhost:3000/v2`. Expect: plum card with warp lines + shuttle moving + motif emerging row-by-row from the bottom up.

If the motif doesn't fill the card (a known issue from the bundle's chat), confirm canvas CSS matches step 1 invariants.

- [ ] **Step 4: Commit**

```bash
git add components/variants/v2/HeroCardWeave.tsx components/variants/v2/Hero.tsx
git commit -m "feat(v2): HeroCardWeave — motif-inlay loom with TDF flower + mill"
```

---

## Task 18: Responsive + reduced-motion pass (V1, V2, landing)

**Files:**
- Modify: `styles/variants/v1.module.css`, `styles/variants/v2.module.css`, `app/globals.css`

- [ ] **Step 1: Manual responsive sweep**

Run `npm run dev`. Open DevTools and test widths 360 / 768 / 1024 / 1440. Check on `/`, `/v1`, `/v2`:
- No horizontal scroll at any width
- Nav collapses gracefully (desktop → hamburger or wrapped links)
- Hero title scales with `clamp()`
- Member logo grid / Committee grid reflow to single column below 640
- FAB stays tappable (≥ 44×44) and does not overlap important content

For each issue found, adjust the relevant CSS Module. Common fixes:
- Replace fixed `font-size: 72px` with `font-size: clamp(2.4rem, 6vw, 5rem)`.
- Wrap nav links: `flex-wrap: wrap; row-gap: 0.5rem`.
- Member logo grid: `grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))`.

- [ ] **Step 2: Reduced-motion sweep**

In DevTools → Rendering → Emulate CSS `prefers-reduced-motion: reduce`. Reload `/v1` and `/v2`.
- Hero canvases render a static final state (no shuttle movement)
- Marquee does not animate
- Reveal primitives render visible immediately (no fade-up)

If any animation still plays, revisit the primitive.

- [ ] **Step 3: Commit fixes**

```bash
git add styles/variants app/globals.css
git commit -m "fix(responsive): mobile breakpoints + reduced-motion compliance"
```

---

## Task 19: Playwright smoke test

**Files:**
- Create: `tests/smoke/routes.spec.ts`

- [ ] **Step 1: Write the test**

Create `tests/smoke/routes.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('routes', () => {
  test('landing has 10 variant links', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('main a[href^="/v"]');
    await expect(links).toHaveCount(10);
  });

  test('/v1 renders with hero canvas', async ({ page }) => {
    await page.goto('/v1');
    await expect(page.locator('canvas')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('/v2 renders with hero card canvas', async ({ page }) => {
    await page.goto('/v2');
    await expect(page.locator('canvas')).toBeVisible();
  });

  test('FAB present and opens menu', async ({ page }) => {
    await page.goto('/v1');
    const fab = page.getByRole('button', { name: /edition/i });
    await expect(fab).toBeVisible();
    await fab.click();
    await expect(page.getByRole('menu')).toBeVisible();
  });

  test('language toggle flips content', async ({ page }) => {
    await page.goto('/v1');
    const en = await page.getByRole('heading', { level: 1 }).first().textContent();
    await page.getByRole('button', { name: /मराठी/ }).click();
    const mr = await page.getByRole('heading', { level: 1 }).first().textContent();
    expect(mr).not.toBe(en);
  });
});
```

- [ ] **Step 2: Run smoke**

```bash
npm run e2e
```

Expected: all 5 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/smoke/routes.spec.ts
git commit -m "test(smoke): Playwright E2E for landing, V1, V2, FAB, bilingual"
```

---

## Task 20: README + `.gitignore` + `.env.example`

**Files:**
- Create: `README.md`
- Modify: `.gitignore`

- [ ] **Step 1: Write README**

Create `README.md`:

```md
# TDF Design Demos

Ten design directions for the Textile Development Foundation, Solapur.

Live preview: https://tdf-design-demos.vercel.app (updated on push to `main`).

## Stack

- Next.js 16 (App Router, TypeScript strict)
- Tailwind v4 for shared chrome + CSS Modules per variant
- framer-motion for scroll/reveal animations
- Vitest + React Testing Library + Playwright

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Test

```bash
npm run test     # unit + component
npm run e2e      # Playwright smoke
```

## Variants

See `/` for the landing grid, or any of `/v1` – `/v10`. The FAB (bottom-right) switches between editions.

## Design spec

`docs/specs/2026-04-21-tdf-demos-design.md`
```

- [ ] **Step 2: Confirm `.gitignore` covers Next build artifacts**

Ensure `.gitignore` includes (the scaffold adds most of these):

```
node_modules
.next
out
coverage
playwright-report
test-results
.vercel
```

- [ ] **Step 3: Commit**

```bash
git add README.md .gitignore
git commit -m "docs: README + gitignore"
```

---

## Task 21: Push to GitHub + connect Vercel

**Files:** none (platform configuration)

- [ ] **Step 1: Push to remote**

```bash
git push origin main
```

Expected: GitHub shows all commits from this plan.

- [ ] **Step 2: Verify GitHub state**

```bash
gh repo view Arraj2611/TDF-design-demos --web
```

Or check via MCP / API that `main` has the latest commit.

- [ ] **Step 3: Import into Vercel**

Two paths:

**Path A — via Vercel MCP (preferred since configured):**

Use the Vercel MCP to create a project bound to the `Arraj2611/TDF-design-demos` GitHub repo, framework preset `nextjs`, root directory `.`, production branch `main`. No env vars required.

**Path B — via browser fallback:**

1. Go to `https://vercel.com/new`.
2. Import `Arraj2611/TDF-design-demos`.
3. Framework preset should auto-detect Next.js.
4. Deploy.

- [ ] **Step 4: Verify production URL**

Wait for Vercel build to finish. Open the production URL. Check `/`, `/v1`, `/v2`. Confirm FAB, bilingual toggle, and hero canvases all work.

- [ ] **Step 5: Add production URL to README**

Replace the placeholder URL in `README.md` with the real Vercel production URL.

```bash
git add README.md
git commit -m "docs: add live preview URL"
git push origin main
```

- [ ] **Step 6: Share link with user**

Output the production URL for the user to share with TDF.

---

## Self-Review (after writing the plan)

**Spec coverage audit:**

| Spec section | Covered by task |
|---|---|
| §2.1 Org-first tone | §14 Step 5 (content fields), §16 Step 3 (content fields) — no new spotlights |
| §2.2 Professional register | §14-§17 port V1/V2 which already meet the bar |
| §2.3 Content frozen | Task 3 (port content.jsx verbatim) |
| §2.4 Bilingual EN/MR | Task 3 (both locales), Task 6 (LangProvider), Task 7 (BilingualToggle) |
| §2.5 Mobile responsive | Task 18 (responsive sweep) |
| §2.6 Reduced-motion | Task 8 (Reveal), Task 15 + 17 (hero canvases gated), Task 18 (audit) |
| §2.7 Subtle textile refs | Tasks 14-17 render bundle-authored content verbatim |
| §3 Research digest | Already in content.jsx (ported in Task 3) |
| §4.1 Stack | Tasks 1-2 |
| §4.2 Directory layout | Tasks 1, 3-20 |
| §4.3 Content contract | Task 3 |
| §4.4 Variant registry | Task 5 |
| §5 Variant table | V1 covered in Tasks 14-15, V2 in Tasks 16-17; V3-V10 are Plans 2 and 3 |
| §6.1 FAB | Task 10, mounted in Task 11 |
| §6.2 Bilingual toggle | Task 7 |
| §6.3 Animation primitives | Tasks 8-9 |
| §6.4 Landing hub | Task 12 |
| §7 Responsive strategy | Task 18 |
| §8 A11y baseline | Tasks 10-17 (role, aria-label, aria-pressed, aria-current); Task 19 smoke |
| §9 Performance | Soft targets; verified during Vercel preview in Task 21 |
| §10 Deploy flow | Task 21 |

**Placeholder scan:**
- "port each remaining V1 section" in Task 14 Step 5 expands explicit per-section procedure in the step body; it's a batched application of a repeat pattern. Each instance is self-contained with referenced source file + destination path + transform rules. Acceptable.
- "Port the full implementation from bundle ... lines 36-320" in Task 17 Step 1 points to exact source lines and lists invariants. Acceptable.
- No "TBD" / "implement later" / "fill in details".

**Type consistency:**
- `Member` used in Task 4 matches shape (`img, role, name, meta`) consistently in tests and in `BOARD`/`COMMITTEE`.
- `Variant` interface in Task 5 matches the registry shape and the `VariantSwitcher` in Task 10.
- `Content` interface in Task 3 matches usage in Tasks 6, 7, 12, 14-17.
- `useT()` returns `Content` throughout.

**Scope:** This plan produces a working, testable deploy (landing + V1 + V2 + shared infra + FAB + bilingual + Vercel preview URL). Plans 2 and 3 build on this foundation without modifying shared infra.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-21-plan-1-foundation-v1-v2.md`. Two execution options:

**1. Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — execute tasks in this session using `executing-plans`, batch execution with checkpoints.

Which approach?
