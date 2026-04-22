'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

// Motif grid (40 cols x 56 rows). Rendered top->bottom = row 0 at TOP.
// Color codes:
//   . = base weave (alternating terra/ivory bands)
//   R = flower red (terra)
//   Y = flower/mill yellow (straw)
//   K = mill outline (deep plum)
//   T = "TDF" text on mill (plum on yellow)
// Layout: flower top-left, diagonal stem, mill bottom-right with "TDF" panel.
// This is the final hand-tuned "M" array from bundle components-v2.jsx.
const MOTIF = [
  '........................................',
  '........................................',
  '........................................',
  '........................................',
  '.....RRRRR..............................',
  '....RRRRRRR.............................',
  '...RRRRRRRRR............................',
  '...RRRRRRRRR............................',
  '..RRRRRRRRRRR...........................',
  '..RRR.YYY.RRR...........................',
  '.RRR.YYYYY.RRR..........................',
  '.RR.YY.Y.YY.RR..........................',
  '.RR.Y.YYY.Y.RR..........................',
  '.RR.YY.Y.YY.RR..........................',
  '.RRR.YYYYY.RRR..........................',
  '..RRR.YYY.RRR...........................',
  '..RRRRRRRRRRR...........................',
  '...RRRRRRRRR............................',
  '...RRRRRRRRR............................',
  '....RRRRRRR.............................',
  '.....RRRRR..............................',
  '........R...............................',
  '.........R..............................',
  '..........R.............................',
  '...........R............................',
  '............R...........................',
  '.............R..........................',
  '............KKK...........KKK...........',
  '............K.KR..........K.K...........',
  '............K.K...........K.K.....KK....',
  '............K.K...........K.K.....K.K...',
  '............K.KKKKKKKKKKKKK.KKKKKKK.K...',
  '...........KKYYYYYYYYYYYYYYYYYYYYYYYYKK.',
  '...........KYYYYYYYYYYYYYYYYYYYYYYYYYYK.',
  '...........KYYYYYYYYYYYYYYYYYYYYYYYYYYK.',
  '...........KYYYYYYYYYYYYYYYYYYYYYYYYYYK.',
  '...........KYYYYYYYYYYYYYYYYYYYYYYYYYYK.',
  '...........KYTTTTTTTYYTTTTTYYYYTTTTTTTK.',
  '...........KYTTTTTTTYYTTTTTYYYYTTTTTTTK.',
  '...........KYYYTTTYYYYTTYYTTYYYTTYYYYYK.',
  '...........KYYYTTTYYYYTTYYYTTYYTTTTTTYK.',
  '...........KYYYTTTYYYYTTYYYTTYYTTTTTTYK.',
  '...........KYYYTTTYYYYTTYYTTYYYTTYYYYYK.',
  '...........KYYYTTTYYYYTTTTTYYYYTTYYYYYK.',
  '...........KYYYYYYYYYYYYYYYYYYYYYYYYYYK.',
  '...........KYYYYYYYYYYYYYYYYYYYYYYYYYYK.',
  '...........KYYYYYYYYYYYYYYYYYYYYYYYYYYK.',
  '...........KKKKKKKKKKKKKKKKKKKKKKKKKKKK.',
  '........................................',
  '........................................',
  '........................................',
  '........................................',
  '........................................',
  '........................................',
  '........................................',
  '........................................',
];

// Motif thread colors (cloth thread hues).
const MC: Record<string, string> = {
  R: '#b9431f', // terra — petals
  Y: '#e6c560', // straw — flower center + mill body
  K: '#2a1e2e', // plum — mill outline + letters
  T: '#2a1e2e', // plum on straw — "TDF" text
};

// Chaddar palette (non-motif cells — the base cloth).
const WARP = '#d4a744'; // gold warp
const WARP2 = '#e8c560'; // accent warp every 8th
const WEFT_IVORY = '#f5f0e6';
const WEFT_TERRA = '#9a3818';
const BG = '#2a1e2e';

const GRID_W = 40;
const GRID_H = MOTIF.length; // 56

export function HeroCardWeave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * DPR));
      canvas.height = Math.max(1, Math.round(r.height * DPR));
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    // Animation state.
    // `woven` counts completed rows (grows by 1 each time the shuttle completes a pass).
    // `shuttleX` is normalized 0..1 (fraction of card width).
    let woven = 0;
    let shuttleX = 0;
    let shuttleDir: 1 | -1 = 1;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    const SHUTTLE_SPEED = 1.5; // passes per second
    let last = performance.now();

    // Renders the full fabric plus (optionally) the shuttle on the fell line.
    // `withShuttle=false` for the reduced-motion static frame (fully-woven cloth).
    const drawScene = (withShuttle: boolean) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const CELL = w / GRID_W;
      const ROW_H = CELL; // square pixels

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      // 1) Warp threads (full card height, behind cloth).
      ctx.lineWidth = 1;
      for (let i = 0; i < GRID_W; i++) {
        const x = i * CELL + CELL / 2;
        ctx.strokeStyle = i % 8 === 0 ? WARP2 : WARP;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // 2) Completed woven rows (from bottom up).
      // Motif row index is flipped: woven row r maps to motif row (GRID_H - 1 - r).
      const rowsCompleted = Math.min(Math.floor(woven), GRID_H);
      for (let r = 0; r < rowsCompleted; r++) {
        const motifRow = GRID_H - 1 - r;
        const rowYCenter = h - r * ROW_H - ROW_H / 2;
        const parity = r % 2;
        const motifStr = MOTIF[motifRow] ?? '';
        // Ground weft: narrow terra bands every 24 motif rows, ivory elsewhere.
        const inBorder = motifRow % 24 < 2 || motifRow % 24 === 23;
        const baseWeft = inBorder ? WEFT_TERRA : WEFT_IVORY;

        for (let i = 0; i < GRID_W; i++) {
          const over = i % 2 === parity; // interlacing: only "over" cells paint weft
          if (!over) continue;
          const ch = motifStr[i] ?? '.';
          const color = ch !== '.' && MC[ch] ? MC[ch] : baseWeft;
          const x1 = i * CELL;
          ctx.fillStyle = color;
          ctx.fillRect(x1, rowYCenter - ROW_H / 2 + 0.5, CELL + 0.5, ROW_H - 1);
        }
      }

      // 3) Weave grain — faint horizontal hairlines across the whole card.
      ctx.strokeStyle = 'rgba(31,26,24,0.12)';
      ctx.lineWidth = 0.5;
      for (let y = 0; y < h; y += ROW_H) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 4) Active weft + shuttle at the fell line (only when animating & not finished).
      const fellY = h - rowsCompleted * ROW_H;
      if (withShuttle && fellY > 0 && rowsCompleted < GRID_H) {
        const motifRow = GRID_H - 1 - rowsCompleted;
        const rowYCenter = fellY - ROW_H / 2;
        const parity = rowsCompleted % 2;
        const motifStr = MOTIF[motifRow] ?? '';
        const inBorder = motifRow % 24 < 2 || motifRow % 24 === 23;
        const baseWeft = inBorder ? WEFT_TERRA : WEFT_IVORY;

        const sxPx = shuttleX * w;
        for (let i = 0; i < GRID_W; i++) {
          const x1 = i * CELL;
          const x2 = x1 + CELL;
          // Cells to the "behind-shuttle" side have been laid this pass.
          const laid = shuttleDir > 0 ? x2 <= sxPx : x1 >= sxPx;
          if (!laid) continue;
          const over = i % 2 === parity;
          if (!over) continue;
          const ch = motifStr[i] ?? '.';
          const color = ch !== '.' && MC[ch] ? MC[ch] : baseWeft;
          ctx.fillStyle = color;
          ctx.fillRect(x1, rowYCenter - ROW_H / 2 + 0.5, CELL + 0.5, ROW_H - 1);
        }

        // Fell-line accent stroke.
        ctx.strokeStyle = 'rgba(230,197,96,0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, fellY);
        ctx.lineTo(w, fellY);
        ctx.stroke();

        // Shuttle body (outer dark oval, inner wood oval, brass tip).
        const sy = rowYCenter;
        const sx = sxPx;
        const bodyRx = Math.max(18, CELL * 1.1);
        const bodyRy = ROW_H * 0.75;
        ctx.fillStyle = '#6b3a1a';
        ctx.beginPath();
        ctx.ellipse(sx, sy, bodyRx, bodyRy, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#a06030';
        ctx.beginPath();
        ctx.ellipse(sx, sy - 1, Math.max(12, CELL * 0.7), ROW_H * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = WARP2;
        const tipOffset = Math.max(16, CELL);
        ctx.beginPath();
        ctx.arc(sx + (shuttleDir > 0 ? tipOffset : -tipOffset), sy, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5) Vignette — radial darkening toward the edges.
      const grd = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.35,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.75,
      );
      grd.addColorStop(0, 'rgba(0,0,0,0)');
      grd.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
    };

    let raf = 0;
    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Advance the shuttle unless we're in the post-completion pause.
      if (!resetTimer) {
        shuttleX += shuttleDir * SHUTTLE_SPEED * dt;
        if (shuttleX >= 1) {
          shuttleX = 1;
          shuttleDir = -1;
          woven += 1;
        } else if (shuttleX <= 0) {
          shuttleX = 0;
          shuttleDir = 1;
          woven += 1;
        }

        if (woven >= GRID_H + 2) {
          // Hold the completed cloth ~2s, then reset to replay.
          resetTimer = setTimeout(() => {
            woven = 0;
            shuttleX = 0;
            shuttleDir = 1;
            resetTimer = null;
          }, 2000);
        }
      }

      drawScene(true);
      raf = requestAnimationFrame(tick);
    };

    if (reduce) {
      // Static: render the fully-woven motif, no shuttle.
      woven = GRID_H;
      drawScene(false);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (resetTimer) clearTimeout(resetTimer);
      ro.disconnect();
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Workshop loom weaving a pixel-art TDF flower and mill motif into a chaddar, row by row"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        position: 'absolute',
        inset: 0,
      }}
    />
  );
}
