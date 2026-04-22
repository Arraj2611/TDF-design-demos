'use client';

/**
 * FabricZoom — V10 signature.
 *
 * Three SVG layers cross-faded + scaled against scroll through the hero
 * region. Each layer depicts the fabric at a different magnification:
 *
 *   Layer 1 (0–33% scroll, "finished cloth")
 *     40×40 grid of plain-weave cells. Alternating ivory/warm-ochre cells
 *     form a muted chaddar stripe. Opacity 1→0 (0–0.4). Scale 1→2.5.
 *
 *   Layer 2 (33–66% scroll, "yarn twist")
 *     10×10 grid of single yarn strands. Each cell shows a helical twist
 *     path — yarn seen at ~×10. Opacity 0→1→0 (0.3→0.5→0.7). Scale 0.8→2.
 *
 *   Layer 3 (66–100% scroll, "fibre bundle")
 *     Circular bundle of ~30 cotton fibres with cream/taupe/ivory
 *     variation. Microscope-style cross-section. Opacity 0→1 (0.6–1).
 *     Scale 0.9→1.
 *
 * Reduced-motion path renders only Layer 2 statically — the middle state,
 * no framer-motion, no useScroll subscription.
 */

import type { RefObject } from 'react';
import { memo, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import styles from '@/styles/variants/v10.module.css';

// --------------------------------------------------------------------------
// Palette — tuned to V10 ground; kept off the CSS var pipeline so SVG
// renders predictably against strokes/shadows.
// --------------------------------------------------------------------------
const GROUND = '#f4ede0';
const IVORY = '#ece2cf';
const OCHRE = '#d9b77a';
const OCHRE_DEEP = '#bf9658';
const TAUPE = '#8a7b5c';
const FIBRE_CREAM = '#e8dcc3';
const FIBRE_TAUPE = '#b09a74';
const FIBRE_IVORY = '#f0e6d1';
const INK_SOFT = 'rgba(43, 36, 26, 0.18)';

// --------------------------------------------------------------------------
// Layer 1 · 40×40 plain-weave cells forming a subtle chaddar stripe.
// Hoisted so the array is built once at module load — not on every render.
// --------------------------------------------------------------------------
const GRID_N = 40;
const CELL = 100 / GRID_N; // viewBox units per cell

interface Cell {
  x: number;
  y: number;
  fill: string;
}

const WEAVE_CELLS: readonly Cell[] = (() => {
  const cells: Cell[] = [];
  // Stripe pattern: five vertical bands. Indexes 0,1 ivory; 2 ochre stripe;
  // 3,4 ivory. Repeats every 5 columns. Weft row parity adds a subtle
  // alternating darkening to give a woven look.
  for (let r = 0; r < GRID_N; r++) {
    for (let c = 0; c < GRID_N; c++) {
      const band = c % 5;
      const warpIvory = band !== 2;
      const weftDark = r % 2 === 0;
      let fill: string;
      if (warpIvory) fill = weftDark ? IVORY : '#f0e6d4';
      else fill = weftDark ? OCHRE : OCHRE_DEEP;
      cells.push({ x: c * CELL, y: r * CELL, fill });
    }
  }
  return cells;
})();

// --------------------------------------------------------------------------
// Layer 2 · 10×10 yarn-twist cells. Each cell: one helical stroke path.
// The helix is two offset sine curves meeting at crossover points — a
// stylised 2-ply yarn.
// --------------------------------------------------------------------------
const YARN_N = 10;
const YARN_CELL = 100 / YARN_N;

function makeHelixPath(cellSize: number): string {
  // Two strokes crossing each other, 6 crossovers across the cell.
  // A path that rises, falls, and twists — compact and readable.
  const turns = 5;
  const samples = 24;
  const pad = cellSize * 0.12;
  const w = cellSize - pad * 2;
  const h = cellSize - pad * 2;
  const cx = pad + w / 2;
  // Single helix: x oscillates ±(w*0.28) around cx, y steps down evenly.
  let d = '';
  const amp = w * 0.28;
  for (let i = 0; i <= samples; i++) {
    const frac = i / samples;
    const y = pad + h * frac;
    const x = cx + amp * Math.sin(frac * turns * Math.PI * 2);
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

function makeHelixPathOffset(cellSize: number): string {
  const turns = 5;
  const samples = 24;
  const pad = cellSize * 0.12;
  const w = cellSize - pad * 2;
  const h = cellSize - pad * 2;
  const cx = pad + w / 2;
  let d = '';
  const amp = w * 0.28;
  for (let i = 0; i <= samples; i++) {
    const frac = i / samples;
    const y = pad + h * frac;
    const x = cx + amp * Math.sin(frac * turns * Math.PI * 2 + Math.PI);
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

const HELIX_A = makeHelixPath(YARN_CELL);
const HELIX_B = makeHelixPathOffset(YARN_CELL);

// --------------------------------------------------------------------------
// Layer 3 · circular fibre bundle. 30 fibres arranged in concentric rings
// around centre (0,0 in viewBox 100×100 → centre at 50,50). Each fibre is
// an ellipse with a slight rotation, cream/taupe/ivory variation.
// Deterministic — built once.
// --------------------------------------------------------------------------
interface Fibre {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rot: number;
  fill: string;
  stroke: string;
}

const FIBRE_CENTRE = 50;
const FIBRE_COLORS = [FIBRE_CREAM, FIBRE_TAUPE, FIBRE_IVORY] as const;

const FIBRES: readonly Fibre[] = (() => {
  const fibres: Fibre[] = [];
  // Ring 0: 1 fibre at centre.
  // Ring 1: 6 fibres at r=8
  // Ring 2: 10 fibres at r=15
  // Ring 3: 13 fibres at r=22 → 30 total
  const rings: Array<{ r: number; count: number; rotOffset: number }> = [
    { r: 0, count: 1, rotOffset: 0 },
    { r: 8, count: 6, rotOffset: 0 },
    { r: 15, count: 10, rotOffset: Math.PI / 10 },
    { r: 22, count: 13, rotOffset: Math.PI / 13 },
  ];
  let idx = 0;
  for (const ring of rings) {
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * Math.PI * 2 + ring.rotOffset;
      const cx = FIBRE_CENTRE + Math.cos(angle) * ring.r;
      const cy = FIBRE_CENTRE + Math.sin(angle) * ring.r;
      const fill = FIBRE_COLORS[idx % FIBRE_COLORS.length] ?? FIBRE_CREAM;
      fibres.push({
        cx,
        cy,
        rx: 5.2,
        ry: 3.6,
        rot: (angle * 180) / Math.PI,
        fill,
        stroke: INK_SOFT,
      });
      idx++;
    }
  }
  return fibres;
})();

// --------------------------------------------------------------------------
// Static SVG renderers — hoisted to module level so they avoid re-allocation
// across parent re-renders.
// --------------------------------------------------------------------------
const WeaveSvg = memo(function WeaveSvg() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Finished chaddar cloth: plain weave with a warm ochre warp stripe."
    >
      <rect x={0} y={0} width={100} height={100} fill={GROUND} />
      {WEAVE_CELLS.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={CELL} height={CELL} fill={c.fill} />
      ))}
      {/* Subtle grid lines — adds the woven grain. */}
      <g opacity={0.18} stroke={TAUPE} strokeWidth={0.12}>
        {Array.from({ length: GRID_N - 1 }, (_, i) => {
          const p = (i + 1) * CELL;
          return (
            <g key={i}>
              <line x1={p} y1={0} x2={p} y2={100} />
              <line x1={0} y1={p} x2={100} y2={p} />
            </g>
          );
        })}
      </g>
    </svg>
  );
});

const YarnSvg = memo(function YarnSvg() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Yarn twist at tenfold magnification: two plied strands per cell."
    >
      <rect x={0} y={0} width={100} height={100} fill={GROUND} />
      {Array.from({ length: YARN_N }, (_, r) =>
        Array.from({ length: YARN_N }, (_, c) => {
          const key = `${r}-${c}`;
          const tx = c * YARN_CELL;
          const ty = r * YARN_CELL;
          return (
            <g key={key} transform={`translate(${tx} ${ty})`}>
              <path d={HELIX_A} stroke={OCHRE_DEEP} strokeWidth={0.9} fill="none" strokeLinecap="round" />
              <path d={HELIX_B} stroke={TAUPE} strokeWidth={0.9} fill="none" strokeLinecap="round" />
            </g>
          );
        })
      )}
    </svg>
  );
});

const FibreSvg = memo(function FibreSvg() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Cross-section of a cotton fibre bundle at microscope magnification."
    >
      <rect x={0} y={0} width={100} height={100} fill={GROUND} />
      {/* Outer circle — bundle boundary. */}
      <circle
        cx={FIBRE_CENTRE}
        cy={FIBRE_CENTRE}
        r={28}
        fill="none"
        stroke={TAUPE}
        strokeWidth={0.35}
        opacity={0.55}
      />
      {FIBRES.map((f, i) => (
        <ellipse
          key={i}
          cx={f.cx}
          cy={f.cy}
          rx={f.rx}
          ry={f.ry}
          fill={f.fill}
          stroke={f.stroke}
          strokeWidth={0.25}
          transform={`rotate(${f.rot.toFixed(2)} ${f.cx.toFixed(2)} ${f.cy.toFixed(2)})`}
        />
      ))}
    </svg>
  );
});

// --------------------------------------------------------------------------
// Animated component
// --------------------------------------------------------------------------

type HeroRef = RefObject<HTMLElement | null>;

export const FabricZoom = memo(function FabricZoom({ heroRef }: { heroRef: HeroRef }) {
  const reduce = usePrefersReducedMotion();

  if (reduce) {
    // Static Layer 2 — the middle state, per spec.
    return (
      <div className={styles.zoomStack} aria-hidden="false">
        <div className={styles.zoomLayer}>
          <YarnSvg />
        </div>
      </div>
    );
  }

  return <FabricZoomAnimated heroRef={heroRef} />;
});

function FabricZoomAnimated({ heroRef }: { heroRef: HeroRef }) {
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Layer 1 — opacity 1→0 (0–0.4), scale 1→2.5 (0–1).
  const l1Opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const l1Scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);

  // Layer 2 — opacity 0→1→0 (0.3→0.5→0.7), scale 0.8→1→2 (0.3→0.5→0.85).
  const l2Opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const l2Scale = useTransform(scrollYProgress, [0.3, 0.5, 0.85], [0.8, 1, 2]);

  // Layer 3 — opacity 0→1 (0.6→1), scale 0.9→1.
  const l3Opacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const l3Scale = useTransform(scrollYProgress, [0.6, 1], [0.9, 1]);

  // Memoise style objects to stop motion from reading new refs per render.
  const l1Style = useMemo(() => ({ opacity: l1Opacity, scale: l1Scale }), [l1Opacity, l1Scale]);
  const l2Style = useMemo(() => ({ opacity: l2Opacity, scale: l2Scale }), [l2Opacity, l2Scale]);
  const l3Style = useMemo(() => ({ opacity: l3Opacity, scale: l3Scale }), [l3Opacity, l3Scale]);

  return (
    <div className={styles.zoomStack}>
      <motion.div className={styles.zoomLayer} style={l1Style}>
        <WeaveSvg />
      </motion.div>
      <motion.div className={styles.zoomLayer} style={l2Style}>
        <YarnSvg />
      </motion.div>
      <motion.div className={styles.zoomLayer} style={l3Style}>
        <FibreSvg />
      </motion.div>
    </div>
  );
}
