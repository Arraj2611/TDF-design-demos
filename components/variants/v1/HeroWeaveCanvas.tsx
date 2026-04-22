'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

// V1 palette — mirrors the bundle WovenBackdrop
const PAPER = '#f4ede0'; // warp cream
const INK = '#0f2340'; // navy ink
const CLOTH = '#1a2d4d'; // woven-region navy
const RUST = '#c36a3f'; // chaddar rust stripe
const GOLD = '#b58a3c'; // chaddar secondary (gold-ochre)
const WEFT_SHADE = '#e8dcc0'; // every 3rd row
const PICK_GLOW_A = '#d9c9a0'; // shuttle trail gradient start
const PICK_GLOW_B = '#f4ede0'; // shuttle trail gradient end

// Geometry (fractions of canvas, so it scales to any size)
const WARP_COUNT = 56;
const ROWS = 22;
const ROW_GAP_FRAC = 16 / 640; // 16px at 640 design height
const FELL_Y_FRAC = 0.38; // shuttle line at ~38% of height
const WOVEN_BG_OPACITY = 0.35;
const CYCLE_MS = 2400; // 2.4s per pick, matches bundle

// Pre-classify warp colors by index so we don't recompute each frame.
function classifyWarp(i: number): { color: string; width: number; alpha: number } {
  const stripe1 = Math.abs(i - WARP_COUNT * 0.18) < 1.5;
  const stripe2 = Math.abs(i - WARP_COUNT * 0.2) < 0.5;
  const stripe3 = Math.abs(i - WARP_COUNT * 0.82) < 1.5;
  const stripe4 = Math.abs(i - WARP_COUNT * 0.8) < 0.5;
  if (stripe2 || stripe4) return { color: RUST, width: 1.6, alpha: 0.85 };
  if (stripe1 || stripe3) return { color: GOLD, width: 1.6, alpha: 0.85 };
  return { color: PAPER, width: 1.1, alpha: 0.55 };
}

const WARPS = Array.from({ length: WARP_COUNT }, (_, i) => classifyWarp(i));

export function HeroWeaveCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * DPR));
      canvas.height = Math.max(1, Math.round(rect.height * DPR));
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    // Draws the whole weave scene at normalized time t in [0, 1].
    // t cycles every CYCLE_MS: 0 = shuttle starts at left, 0.5 = right edge, 1 = back to left.
    const drawFrame = (t: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const warpGap = w / WARP_COUNT;
      const rowGap = Math.max(10, h * ROW_GAP_FRAC);
      const fellY = h * FELL_Y_FRAC;

      // 1) Warp threads (vertical, always visible)
      for (let i = 0; i < WARPS.length; i++) {
        const warp = WARPS[i];
        if (!warp) continue;
        const x = i * warpGap + warpGap / 2;
        ctx.strokeStyle = warp.color;
        ctx.lineWidth = warp.width;
        ctx.globalAlpha = warp.alpha;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // 2) Woven cloth region (below the fell line)
      // Darker navy background of finished cloth.
      ctx.fillStyle = CLOTH;
      ctx.globalAlpha = WOVEN_BG_OPACITY;
      ctx.fillRect(0, fellY, w, h - fellY);
      ctx.globalAlpha = 1;

      // Animated beat-up: rows shift downward by (t * rowGap) so new rows appear at the top.
      const shift = t * rowGap;
      const baseY = h - ROWS * rowGap + 8 - shift;

      for (let r = 0; r < ROWS; r++) {
        const y = baseY + r * rowGap;
        if (y < fellY - rowGap || y > h + rowGap) continue;
        const phase = r % 2;
        const shade = r % 3 === 0 ? WEFT_SHADE : PAPER;

        // Interlaced weft segments: only "over" portions render — warps cover the rest.
        ctx.fillStyle = shade;
        ctx.globalAlpha = 0.6;
        for (let i = 0; i < WARP_COUNT + 1; i++) {
          if ((i + phase) % 2 !== 0) continue;
          const segX = i * warpGap - warpGap / 2;
          ctx.fillRect(segX, y - 2, warpGap, 4);
        }
        ctx.globalAlpha = 1;

        // Chaddar supplementary weft: rust every 4 rows, gold every 4 rows offset by 2.
        if (r % 4 === 0) {
          ctx.fillStyle = RUST;
          ctx.globalAlpha = 0.7;
          ctx.fillRect(warpGap * 2, y - 2, warpGap * 3, 3);
          ctx.fillRect(w - warpGap * 5, y - 2, warpGap * 3, 3);
          ctx.globalAlpha = 1;
        } else if (r % 4 === 2) {
          ctx.fillStyle = GOLD;
          ctx.globalAlpha = 0.55;
          ctx.fillRect(warpGap * 2, y - 2, warpGap * 3, 3);
          ctx.fillRect(w - warpGap * 5, y - 2, warpGap * 3, 3);
          ctx.globalAlpha = 1;
        }
      }

      // 3) Cloth depth shadow — vertical gradient darkening the bottom of the cloth.
      const shadow = ctx.createLinearGradient(0, 0, 0, h);
      shadow.addColorStop(0, 'rgba(15, 35, 64, 0)');
      shadow.addColorStop(0.15, 'rgba(15, 35, 64, 0)');
      shadow.addColorStop(1, 'rgba(15, 35, 64, 0.55)');
      ctx.fillStyle = shadow;
      ctx.fillRect(0, fellY, w, h - fellY);

      // 4) Fell-line "pick" — horizontal gradient bars that travel with the shuttle.
      // Three staggered bars (k=0,1,2) to fake beat-up.
      for (let k = 0; k < 3; k++) {
        const stagger = (t + k / 3) % 1;
        const yBase = fellY + k * 2;
        // Trails across 0→1 over the half-cycle, invisible on the return.
        const visible = stagger < 0.5;
        if (!visible) continue;
        const progress = stagger * 2; // 0 to 1 across left→right
        const xCenter = progress * w;
        const trailW = w * 0.5;
        const opacity = k === 0 ? 0.95 : 0.5;
        // Opacity fade-in/out within the sweep for a soft edge.
        const phaseFade = Math.sin(progress * Math.PI);

        const grad = ctx.createLinearGradient(xCenter - trailW, 0, xCenter, 0);
        grad.addColorStop(0, 'rgba(217, 201, 160, 0)');
        grad.addColorStop(0.5, PICK_GLOW_A);
        grad.addColorStop(1, PICK_GLOW_B);
        ctx.fillStyle = grad;
        ctx.globalAlpha = opacity * phaseFade;
        ctx.fillRect(xCenter - trailW, yBase - (k === 0 ? 1.1 : 0.7), trailW, k === 0 ? 2.2 : 1.4);
      }
      ctx.globalAlpha = 1;

      // 5) Shuttle — pointed oval with pirn, travels left→right in first half, returns in second half.
      //    Bundle behavior: 0→0.45 moves across, 0.45→0.5 pause, 0.5→0.95 returns, 0.95→1 pause.
      let shuttleX: number;
      if (t < 0.45) shuttleX = -60 + (t / 0.45) * (w + 120);
      else if (t < 0.5) shuttleX = w + 60;
      else if (t < 0.95) shuttleX = w + 60 - ((t - 0.5) / 0.45) * (w + 120);
      else shuttleX = -60;

      const sY = fellY;
      // trailing thread behind the shuttle (direction depends on travel direction)
      ctx.strokeStyle = PAPER;
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 0.8;
      const goingRight = t < 0.5;
      ctx.beginPath();
      ctx.moveTo(shuttleX + (goingRight ? -24 : 24), sY);
      ctx.lineTo(shuttleX + (goingRight ? -80 : 80), sY);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // shuttle body — outer dark oval, inner wood oval, center pirn dot
      ctx.fillStyle = '#2a1810';
      ctx.beginPath();
      ctx.ellipse(shuttleX, sY, 32, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#5a3820';
      ctx.beginPath();
      ctx.ellipse(shuttleX, sY, 28, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = PAPER;
      ctx.beginPath();
      ctx.arc(shuttleX, sY, 2, 0, Math.PI * 2);
      ctx.fill();

      // 6) Heddle frames — two faint horizontal bars above the fell line, barely moving.
      ctx.fillStyle = PAPER;
      ctx.globalAlpha = 0.18;
      const heddleSway = Math.sin(t * Math.PI * 2) * 0.5;
      ctx.fillRect(0, h * 0.34 + heddleSway, w, 1.5);
      ctx.fillRect(0, h * 0.365 - heddleSway, w, 1);

      // 7) Reed — very subtle vertical comb near the fell line.
      ctx.strokeStyle = PAPER;
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < WARP_COUNT; i++) {
        const x = i * warpGap + warpGap / 2;
        ctx.beginPath();
        ctx.moveTo(x, h * 0.3);
        ctx.lineTo(x, h * 0.42);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const t = (elapsed % CYCLE_MS) / CYCLE_MS;
      drawFrame(t);
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => resize();

    resize();
    if (reduce) {
      // Static frame at t=0.25 — shuttle mid-pass, cloth partially woven.
      drawFrame(0.25);
    } else {
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener('resize', onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="Animated weaving loom depicting warp threads and a shuttle laying weft across the fell line"
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
