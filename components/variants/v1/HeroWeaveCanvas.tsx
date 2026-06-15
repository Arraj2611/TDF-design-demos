'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/* ============================================================================
   Hero loom — an upside-down handloom weaving a Solapur chaddar in real time.
   The cloth climbs the screen while the loom works at the base: warp threads
   open into a shed, a shuttle flies the weft across, the reed beats it into the
   fell, and the finished pick joins the cloth. The jacquard draft carries the
   TDF flower (four petals around a plus) and a woven "TDF" border band.
   Pure 2D canvas — no dependencies, GPU-light, honours reduced-motion.
   ========================================================================== */

// V1 palette — the institutional navy edition.
const THEME = {
  bg: '#0c1c38',
  warp: '#d9c9a0',
  warpDim: '#6f6a55',
  ground: '#16294a', // finished-cloth navy
  motifA: '#f4ede0', // cream
  motifB: '#c36a3f', // rust accent
  lattice: '#b58a3c', // gold trellis
  gold: '#b58a3c', // flower plus
  letter: '#11203c', // woven "TDF" ink
  solid1: '#c36a3f',
  solid2: '#b58a3c',
  glow: '#d9c9a0',
  shadow: '6,14,30',
} as const;

const P = 18; // diamond lattice period, in warp ends
const BODY = 150; // body picks per chaddar piece
const ROW_H = 6; // px per woven pick
const TDF_W = 11; // glyph-band width in ends

// Flower geometry — module-level so the per-cell hot path never reallocates.
const FL_ARM = 3.5; // plus arm half-length
const FL_W = 1.05; // plus arm half-width
const FL_PD = 3.8; // petal centre distance
const FL_PR2 = 2.35 * 2.35; // petal radius²

// TDF logo flower medallion, evaluated per cell.
// 'P' petal · 'C' plus · 'D' heart-dot · null ground.
function flower(x: number, y: number): 'P' | 'C' | 'D' | null {
  if (x * x + y * y <= 1.7) return 'D';
  if ((Math.abs(y) <= FL_W && Math.abs(x) <= FL_ARM) || (Math.abs(x) <= FL_W && Math.abs(y) <= FL_ARM)) return 'C';
  if (x * x + (y + FL_PD) * (y + FL_PD) <= FL_PR2) return 'P';
  if (x * x + (y - FL_PD) * (y - FL_PD) <= FL_PR2) return 'P';
  if ((x + FL_PD) * (x + FL_PD) + y * y <= FL_PR2) return 'P';
  if ((x - FL_PD) * (x - FL_PD) + y * y <= FL_PR2) return 'P';
  return null;
}

// "TDF" — 3x5 glyphs across 11 ends.
const TDF = [
  '###.##..###',
  '.#..#.#.#..',
  '.#..#.#.##.',
  '.#..#.#.#..',
  '.#..##..#..',
];

type Band = { type: string; i: number; n: number };

// One border, mirrored around the unwoven gap between two chaddar pieces.
const BORDER: Band[] = (() => {
  const half: Band[] = (
    [
      ['solid2', 2], ['ground', 2], ['dots', 3], ['ground', 2], ['kungri', 8],
      ['ground', 1], ['tdf', 7], ['ground', 1], ['solid1', 4], ['solid2', 2], ['ground', 2],
    ] as [string, number][]
  ).flatMap(([type, n]) => Array.from({ length: n }, (_, i) => ({ type, i, n })));
  const gap: Band[] = Array.from({ length: 8 }, (_, i) => ({ type: 'gap', i, n: 8 }));
  return [...half, ...gap, ...[...half].reverse()];
})();
const REPEAT = BODY + BORDER.length;

const mod = (a: number, n: number) => ((a % n) + n) % n;

function bodyColor(grow: number, col: number): string {
  const u = col + grow;
  const v = col - grow;
  const um = mod(u, P);
  const vm = mod(v, P);
  if ((um === 0 || vm === 0) && (col & 1) === 0) return THEME.lattice; // dotted trellis
  const du = um - P / 2;
  const dv = vm - P / 2;
  const f = flower((du + dv) / 2, (du - dv) / 2);
  if (f === 'C') return THEME.gold;
  if (f === 'D') return THEME.motifB;
  if (f === 'P') {
    const alt = (Math.floor(u / P) + Math.floor(v / P)) & 1;
    return alt ? THEME.motifB : THEME.motifA;
  }
  return THEME.ground;
}

function borderColor(spec: Band, col: number): string {
  switch (spec.type) {
    case 'solid1':
      return THEME.solid1;
    case 'solid2':
      return THEME.solid2;
    case 'dots': {
      const w = spec.i === 1 ? 3 : 1;
      return Math.abs(mod(col, 7) - 3) < w ? THEME.motifA : THEME.ground;
    }
    case 'kungri': {
      const h = (spec.n - spec.i) * 0.75; // temple-spire teeth
      return Math.abs(mod(col, 13) - 6.5) < h ? THEME.ground : THEME.motifA;
    }
    case 'tdf': {
      if (spec.i === 0 || spec.i === spec.n - 1) return THEME.motifA; // pad rows
      // Glyph rows are emitted bottom-up on purpose: drawFrame() renders the whole
      // scene vertically flipped (ctx.scale(1,-1)) so the loom weaves upward, which
      // would otherwise invert the lettering. Keep this in sync with that transform.
      const r = spec.n - 2 - spec.i; // 1..5 → 4..0; never out of range given the pad guard
      const lx = mod(col + 4, 18);
      return lx < TDF_W && TDF[r]![lx] === '#' ? THEME.letter : THEME.motifA;
    }
    default:
      return THEME.ground;
  }
}

function pattern(grow: number, col: number, count: number): string | null {
  const m = mod(grow, REPEAT);
  const spec = m >= BODY ? BORDER[m - BODY] : null;
  if (spec && spec.type === 'gap') return null;
  if (col < 2 || col >= count - 2) return THEME.solid1; // selvedge
  return spec ? borderColor(spec, col) : bodyColor(grow, col);
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function HeroWeaveCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cloth = document.createElement('canvas');
    const cctx = cloth.getContext('2d');
    if (!cctx) return;

    const DPR = window.devicePixelRatio || 1;
    const CYCLE_MS = 1100; // one pick

    let W = 0;
    let H = 0;
    let COUNT = 0;
    let WPX = 0;
    let FELL = 0;
    let HEDDLE = 0;
    let CLOTH_H = 0;
    let midCol = 0; // centre end — sampled for the in-flight weft colour
    let warpJitter = new Float32Array(0); // per-end brightness noise, fixed per resize

    let grow = 0;
    let clock = 0;
    let dirRight = true;
    let shed = 1;
    let committed = false;
    let lastTime = 0;

    const hash = (x: number, y: number) => {
      let h = (x * 73856093) ^ (y * 19349663);
      h = (h ^ (h >>> 13)) * 1274126177;
      return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
    };

    // Paint one woven pick into the cloth buffer at the given y (CSS px).
    const paintRow = (g: number, y: number) => {
      for (let col = 0; col < COUNT; col++) {
        const c = pattern(g, col, COUNT);
        const x = col * WPX;
        if (c === null) {
          const edge = BORDER[mod(g, REPEAT) - BODY]; // unwoven gap → fringe at the piece edge
          if (edge && edge.i < 2 && hash(col, g) > 0.45) {
            cctx.strokeStyle = THEME.warpDim;
            cctx.globalAlpha = 0.7 - edge.i * 0.25;
            cctx.lineWidth = 1;
            cctx.beginPath();
            cctx.moveTo(x + WPX / 2, y);
            cctx.lineTo(x + WPX / 2 + (hash(col, g + 1) - 0.5) * 3, y + ROW_H);
            cctx.stroke();
            cctx.globalAlpha = 1;
          }
          continue;
        }
        cctx.fillStyle = c;
        cctx.fillRect(x, y, WPX + 0.5, ROW_H);
        cctx.fillStyle = '#fff'; // thread roundness — top highlight
        cctx.globalAlpha = 0.1 + hash(col, g) * 0.08;
        cctx.fillRect(x, y + 0.4, WPX, 1.3);
        cctx.fillStyle = '#000'; // bottom shade
        cctx.globalAlpha = 0.16;
        cctx.fillRect(x, y + ROW_H - 1.2, WPX, 1.2);
        if ((col + g) & 1) {
          cctx.globalAlpha = 0.07; // interlace shimmer
          cctx.fillRect(x, y, WPX, ROW_H);
        }
        cctx.globalAlpha = 1;
      }
    };

    const commitRow = () => {
      cctx.drawImage(cloth, 0, 0, cloth.width, cloth.height, 0, ROW_H, W, CLOTH_H);
      cctx.clearRect(0, 0, W, ROW_H);
      paintRow(grow, 0);
      grow++;
    };

    const prefill = () => {
      cctx.clearRect(0, 0, W, CLOTH_H);
      const n = Math.ceil(CLOTH_H / ROW_H) + 2;
      const start = REPEAT * 3 + BODY - Math.floor(n * 0.62);
      for (let i = 0; i < n; i++) paintRow(start + i, (n - 1 - i) * ROW_H);
      grow = start + n;
    };

    // Static gradients — rebuilt on resize, reused every frame.
    let warpFade: CanvasGradient;
    let depthShadow: CanvasGradient;
    let vignette: CanvasGradient;
    const buildGradients = () => {
      warpFade = ctx.createLinearGradient(0, 0, 0, FELL);
      warpFade.addColorStop(0, 'rgba(0,0,0,0.55)');
      warpFade.addColorStop(1, 'rgba(0,0,0,0)');
      depthShadow = ctx.createLinearGradient(0, FELL, 0, H);
      depthShadow.addColorStop(0, `rgba(${THEME.shadow},0)`);
      depthShadow.addColorStop(1, `rgba(${THEME.shadow},0.62)`);
      vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.95);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.4)');
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      COUNT = Math.max(90, Math.min(190, Math.round(W / 7)));
      WPX = W / COUNT;
      FELL = H * 0.34;
      HEDDLE = FELL * 0.55;
      CLOTH_H = H - FELL + ROW_H * 2;
      midCol = Math.floor(COUNT / 2);
      warpJitter = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) warpJitter[i] = hash(i, 7);
      cloth.width = Math.round(W * DPR);
      cloth.height = Math.round(CLOTH_H * DPR);
      cctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildGradients();
      prefill();
    };

    const drawFrame = (now: number, t: number) => {
      const FLY_END = 0.7;
      const BEAT_END = 0.82;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = THEME.bg;
      ctx.fillRect(0, 0, W, H);

      // Weave upside-down: finished cloth climbs, the loom works at the base.
      ctx.save();
      ctx.translate(0, H);
      ctx.scale(1, -1);

      // drifting sheen
      const sx = (Math.sin(now * 0.00012) * 0.5 + 0.5) * W;
      const sheen = ctx.createLinearGradient(sx - W * 0.6, 0, sx + W * 0.6, H);
      sheen.addColorStop(0, 'rgba(255,245,225,0)');
      sheen.addColorStop(0.5, 'rgba(255,245,225,0.045)');
      sheen.addColorStop(1, 'rgba(255,245,225,0)');
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, W, H);

      let shedMix = shed;
      if (t > BEAT_END) shedMix = shed * (2 * easeOutCubic((t - BEAT_END) / (1 - BEAT_END)) - 1) * -1;

      // warp threads — lit in the shed above the fell, dim behind the cloth below
      for (let i = 0; i < COUNT; i++) {
        const x = i * WPX + WPX / 2;
        const raised = ((i & 1) === 0 ? 1 : -1) * shedMix;
        const lit = 0.5 + raised * 0.32;
        ctx.strokeStyle = THEME.warp;
        ctx.globalAlpha = 0.34 + lit * 0.4 + warpJitter[i]! * 0.08;
        ctx.lineWidth = 1.1 + lit * 0.7;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, FELL);
        ctx.stroke();
        ctx.strokeStyle = THEME.warpDim;
        ctx.globalAlpha = 0.16;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, FELL);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = warpFade;
      ctx.fillRect(0, 0, W, FELL);

      // heddle bars
      ctx.fillStyle = THEME.warp;
      ctx.globalAlpha = 0.22;
      ctx.fillRect(0, HEDDLE - 8 - shedMix * 5, W, 2);
      ctx.fillRect(0, HEDDLE + 8 + shedMix * 5, W, 1.5);
      ctx.globalAlpha = 1;

      // cloth: commit the pick on beat, then glide on the take-up
      if (t >= FLY_END && !committed) {
        commitRow();
        shed = -shed;
        committed = true;
      }
      const glide = committed ? easeOutCubic(Math.min(1, (t - FLY_END) / (1 - FLY_END))) : 1;
      const clothY = FELL - ROW_H * (1 - glide);
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, FELL, W, H - FELL);
      ctx.clip();
      ctx.drawImage(cloth, 0, 0, cloth.width, cloth.height, 0, clothY, W, CLOTH_H);
      ctx.fillStyle = depthShadow;
      ctx.fillRect(0, FELL, W, H - FELL);
      ctx.restore();

      // weft yarn in flight — sags, then is beaten down into the fell
      const rowColor = pattern(grow, midCol, COUNT) || THEME.warp;
      const fromX = dirRight ? 0 : W;
      let yarnY = FELL - 10;
      let yarnTipX = fromX;
      if (t < FLY_END) {
        const p = easeInOutCubic(t / FLY_END);
        yarnTipX = dirRight ? p * (W + 80) - 40 : W - p * (W + 80) + 40;
      } else {
        yarnTipX = dirRight ? W + 40 : -40;
        yarnY = FELL - 10 + 10 * easeOutCubic(Math.min(1, (t - FLY_END) / (BEAT_END - FLY_END)));
      }
      ctx.strokeStyle = THEME.glow;
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(fromX, yarnY);
      ctx.quadraticCurveTo((fromX + yarnTipX) / 2, yarnY + (t < FLY_END ? 5 : 1), yarnTipX, yarnY);
      ctx.stroke();
      ctx.strokeStyle = rowColor;
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // shuttle — luminous trail, rim-lit body, pirn showing through
      if (t < FLY_END) {
        const sX = yarnTipX;
        const sY = FELL - 10;
        const trailW = W * 0.3;
        const dir = dirRight ? -1 : 1;
        const trail = ctx.createLinearGradient(sX + dir * trailW, 0, sX, 0);
        trail.addColorStop(0, 'rgba(255,240,210,0)');
        trail.addColorStop(1, 'rgba(255,240,210,0.35)');
        ctx.fillStyle = trail;
        ctx.fillRect(Math.min(sX, sX + dir * trailW), sY - 3, trailW, 6);
        ctx.fillStyle = '#1a0d05';
        ctx.beginPath();
        ctx.ellipse(sX, sY, 40, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#7a4a26';
        ctx.beginPath();
        ctx.ellipse(sX, sY, 35, 5.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = THEME.glow;
        ctx.globalAlpha = 0.7;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(sX, sY - 1, 36, 4.5, 0, Math.PI * 1.05, Math.PI * 1.95);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = rowColor;
        ctx.beginPath();
        ctx.ellipse(sX, sY, 9, 2.4, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // reed comb — swings down to beat the weft into the fell
      let reedY = HEDDLE + 14;
      if (t >= FLY_END && t < BEAT_END) {
        const p = (t - FLY_END) / (BEAT_END - FLY_END);
        const swing = p < 0.5 ? easeOutCubic(p * 2) : 1 - easeInOutCubic((p - 0.5) * 2);
        reedY = HEDDLE + 14 + swing * (FELL - HEDDLE - 18);
      }
      ctx.strokeStyle = THEME.warp;
      ctx.globalAlpha = 0.13;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < COUNT; i += 2) {
        const x = i * WPX + WPX / 2;
        ctx.beginPath();
        ctx.moveTo(x, reedY);
        ctx.lineTo(x, reedY + 26);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = THEME.warp;
      ctx.fillRect(0, reedY - 3, W, 2.5);
      ctx.globalAlpha = 1;

      // fell line + beat flash
      ctx.fillStyle = THEME.glow;
      ctx.globalAlpha = 0.1;
      ctx.fillRect(0, FELL - 1, W, 1.5);
      ctx.globalAlpha = 1;
      if (t >= FLY_END && t < BEAT_END + 0.06) {
        const f = 1 - Math.abs((t - (FLY_END + BEAT_END) / 2) / ((BEAT_END - FLY_END) / 2));
        ctx.fillStyle = THEME.glow;
        ctx.globalAlpha = Math.max(0, f) * 0.35;
        ctx.fillRect(0, FELL - 2, W, 3);
        ctx.globalAlpha = 1;
      }

      ctx.restore(); // end upside-down weave space

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);
    };

    let raf = 0;
    let io: IntersectionObserver | undefined;
    const tick = (now: number) => {
      if (!lastTime) lastTime = now;
      clock += now - lastTime;
      lastTime = now;
      if (clock >= CYCLE_MS) {
        clock %= CYCLE_MS;
        dirRight = !dirRight;
        committed = false;
      }
      drawFrame(now, clock / CYCLE_MS);
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    if (reduce) {
      drawFrame(0, 0.3); // static frame — shuttle mid-pass, cloth woven
    } else {
      raf = requestAnimationFrame(tick);
      // Stop the loom once it scrolls out of view — no CPU/battery spent off-screen.
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          if (entry.isIntersecting && !raf) {
            lastTime = 0; // resume without a giant time delta
            raf = requestAnimationFrame(tick);
          } else if (!entry.isIntersecting && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        },
        { threshold: 0 },
      );
      io.observe(canvas);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="A handloom weaving a Solapur chaddar — warp threads, a flying shuttle, and the TDF flower motif emerging in the cloth"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    />
  );
}
