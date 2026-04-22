'use client';

/**
 * LoomCollapseChart — V7 signature data-viz.
 *
 * Depicts Solapur's power-loom collapse 1992–1995: 25,000 active looms down
 * to 15,000 (−40%). The plate renders 50 thread-bars (1 bar = 500 looms).
 * 20 of them "snap" in 4 yearly waves of 5 bars each (scaleY 1 → 0 from the
 * top edge, as if cut loose from the beam), leaving 30 bars standing with
 * amber heads.
 *
 * No chart library. Plain SVG + framer-motion. Reduced motion renders the
 * final state (20 ghost outlines + 30 standing bars with amber dots) with
 * no animation.
 */

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

// Canvas (design units; SVG scales to container).
const VIEW_W = 900;
const VIEW_H = 400;
const PAD_L = 72;      // room for the 25,000 / 15,000 axis labels on the left
const PAD_R = 36;
const PAD_T = 40;
const PAD_B = 56;      // room for year axis underneath

// Chart geometry
const BARS = 50;                       // 50 thread-bars · 1 bar = 500 looms
const SNAPPED = 20;                    // 20 bars fall (25,000 → 15,000 = −10,000 / 500)
const STANDING = BARS - SNAPPED;       // 30 bars remain active
const YEARS = ['1992', '1993', '1994', '1995'] as const;
const WAVE_MS = 600;                   // one wave per year
const STAGGER_MS = 50;                 // within each wave
const THREAD_DUR_MS = 420;             // per-thread snap duration

// Y-axis: top of chart = 25,000 looms, baseline implicit at 0.
// The 15,000 line sits 60% of the chart height down (15,000 / 25,000 = 0.6).
const FIFTEEN_K_FRAC = 0.6;

// Which bars belong to which wave (indexes 0..49).
// Snapped bars are scattered across the span — not clumped — so the collapse
// reads as systemic, not regional. Each wave = 5 distinct bars.
// Chosen by hand for a pleasing distribution; frozen for determinism.
const SNAPPED_BAR_IDX: ReadonlyArray<ReadonlyArray<number>> = [
  [4, 11, 17, 24, 32],     // 1992: opening shocks — Soviet order collapse
  [6, 19, 28, 37, 44],     // 1993
  [9, 22, 31, 40, 47],     // 1994
  [2, 14, 26, 35, 42],     // 1995: trough
];
const ALL_SNAPPED = new Set(SNAPPED_BAR_IDX.flat());

type BarMeta = {
  x: number;
  width: number;
  snapped: boolean;
  /** Delay in seconds from chart reveal until this bar begins to fall. */
  delay: number;
};

// Precompute bar geometry once; stable reference, no per-render allocation.
function buildBars(): BarMeta[] {
  const usableW = VIEW_W - PAD_L - PAD_R;
  const gap = usableW / (BARS - 1);
  const width = Math.min(6, gap * 0.42);
  const bars: BarMeta[] = [];
  for (let i = 0; i < BARS; i++) {
    const x = PAD_L + i * gap;
    const snapped = ALL_SNAPPED.has(i);
    let delay = 0;
    if (snapped) {
      const waveIdx = SNAPPED_BAR_IDX.findIndex((w) => w.includes(i));
      const withinWave = SNAPPED_BAR_IDX[waveIdx]?.indexOf(i) ?? 0;
      delay = (waveIdx * WAVE_MS + withinWave * STAGGER_MS) / 1000;
    }
    bars.push({ x, width, snapped, delay });
  }
  return bars;
}

const BARS_DATA: ReadonlyArray<BarMeta> = buildBars();

const BASELINE_Y = VIEW_H - PAD_B;
const TOP_Y = PAD_T;
const FIFTEEN_K_Y = TOP_Y + (BASELINE_Y - TOP_Y) * FIFTEEN_K_FRAC;

// Year tick positions — centred on the span, four evenly-spaced ticks.
// 1992 aligns with the leftmost bar, 1995 with the rightmost.
const YEAR_TICKS = YEARS.map((y, i) => ({
  year: y,
  x: PAD_L + ((VIEW_W - PAD_L - PAD_R) * i) / (YEARS.length - 1),
}));

// Transition applied to every snapped thread. Reduced-motion path skips it.
// Framer-motion accepts a 4-tuple as a cubic-bezier Easing.
const SNAP_EASE: [number, number, number, number] = [0.7, 0, 0.3, 1];

export const LoomCollapseChart = memo(function LoomCollapseChart({
  className,
}: {
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();

  // Split bars so we can use different rendering paths without per-frame work.
  const { snappedBars, standingBars } = useMemo(() => {
    const snap: BarMeta[] = [];
    const stand: BarMeta[] = [];
    for (const b of BARS_DATA) {
      (b.snapped ? snap : stand).push(b);
    }
    return { snappedBars: snap, standingBars: stand };
  }, []);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={
        'Power loom index for Solapur, 1992 to 1995. ' +
        'A chart of 50 thread-bars where each bar represents 500 looms. ' +
        'Twenty bars collapse in four yearly waves, reducing the active loom ' +
        'count from 25,000 in 1992 to 15,000 in 1995 — a 40 percent decline.'
      }
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Gridline at the 15,000-loom level — the eventual floor. */}
      <line
        x1={PAD_L}
        y1={FIFTEEN_K_Y}
        x2={VIEW_W - PAD_R}
        y2={FIFTEEN_K_Y}
        stroke="var(--v7-steel)"
        strokeWidth={0.5}
        strokeDasharray="2 5"
        opacity={0.55}
      />

      {/* Baseline — solid slate hairline. */}
      <line
        x1={PAD_L}
        y1={BASELINE_Y}
        x2={VIEW_W - PAD_R}
        y2={BASELINE_Y}
        stroke="var(--v7-slate)"
        strokeWidth={1}
      />

      {/* Y-axis labels (top = 25,000, mid = 15,000). Plex Mono caps steel. */}
      <text
        x={PAD_L - 12}
        y={TOP_Y + 4}
        textAnchor="end"
        className="v7ChartAxisLabel"
      >
        25,000
      </text>
      <text
        x={PAD_L - 12}
        y={FIFTEEN_K_Y + 4}
        textAnchor="end"
        className="v7ChartAxisLabelAmber"
      >
        15,000
      </text>
      <text
        x={PAD_L - 12}
        y={BASELINE_Y + 4}
        textAnchor="end"
        className="v7ChartAxisLabel"
      >
        0
      </text>

      {/* Y-axis unit label (rotated, upper-left corner). */}
      <text
        x={PAD_L - 52}
        y={(TOP_Y + BASELINE_Y) / 2}
        textAnchor="middle"
        transform={`rotate(-90 ${PAD_L - 52} ${(TOP_Y + BASELINE_Y) / 2})`}
        className="v7ChartAxisUnit"
      >
        POWER LOOMS · ACTIVE
      </text>

      {/* Standing threads — 30 bars from baseline up to the 25,000 top.
          Each bar is a thin slate rect with an amber dot at the head. */}
      {standingBars.map((b) => (
        <g key={`stand-${b.x}`}>
          <line
            x1={b.x}
            y1={BASELINE_Y}
            x2={b.x}
            y2={TOP_Y + 2}
            stroke="var(--v7-slate-deep)"
            strokeWidth={b.width}
            strokeLinecap="butt"
          />
          <circle
            cx={b.x}
            cy={TOP_Y + 2}
            r={2.6}
            fill="var(--v7-amber)"
          />
        </g>
      ))}

      {/* Snapped threads — 20 bars that scale-Y from 1 to 0 (origin = top) as
          the chart reveals. In reduced motion, they render at scaleY 0 (i.e.
          invisible), replaced below by a ghost outline at the original height. */}
      {!reduce &&
        snappedBars.map((b) => (
          <motion.line
            key={`snap-${b.x}`}
            x1={b.x}
            y1={BASELINE_Y}
            x2={b.x}
            y2={TOP_Y + 2}
            stroke="var(--v7-slate)"
            strokeWidth={b.width}
            strokeLinecap="butt"
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            style={{ transformOrigin: `${b.x}px ${TOP_Y + 2}px`, transformBox: 'view-box' }}
            transition={{
              duration: THREAD_DUR_MS / 1000,
              ease: SNAP_EASE,
              delay: b.delay,
            }}
          />
        ))}

      {/* Ghost outlines — always rendered so snapped threads leave a trace.
          In motion mode they appear under the falling bar; once scaleY hits 0
          the ghost is what remains. In reduced motion mode they stand in
          entirely for the collapsed bars. */}
      {snappedBars.map((b) => (
        <line
          key={`ghost-${b.x}`}
          x1={b.x}
          y1={BASELINE_Y}
          x2={b.x}
          y2={TOP_Y + 2}
          stroke="var(--v7-slate)"
          strokeWidth={0.6}
          strokeDasharray="1 3"
          opacity={0.42}
        />
      ))}

      {/* X-axis — years, with amber tick marks. */}
      {YEAR_TICKS.map((t) => (
        <g key={t.year}>
          <line
            x1={t.x}
            y1={BASELINE_Y}
            x2={t.x}
            y2={BASELINE_Y + 8}
            stroke="var(--v7-amber)"
            strokeWidth={1}
          />
          <text
            x={t.x}
            y={BASELINE_Y + 26}
            textAnchor="middle"
            className="v7ChartAxisYear"
          >
            {t.year}
          </text>
        </g>
      ))}

      {/* Axis caption bottom-left */}
      <text
        x={PAD_L}
        y={VIEW_H - 8}
        className="v7ChartAxisUnit"
      >
        1 BAR = 500 LOOMS
      </text>
      {/* Axis caption bottom-right */}
      <text
        x={VIEW_W - PAD_R}
        y={VIEW_H - 8}
        textAnchor="end"
        className="v7ChartAxisUnit"
      >
        SOURCE: TDF ARCHIVES
      </text>
    </svg>
  );
});
