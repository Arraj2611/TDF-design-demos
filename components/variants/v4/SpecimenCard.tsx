'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import styles from '@/styles/variants/v4.module.css';

// Canvas geometry for the warp × weft SVG inside the Specimen card.
// Warp threads = vertical (drawn top-down), Weft threads = horizontal (drawn L→R).
const VIEW_W = 220;
const VIEW_H = 140;
const WARP_COUNT = 11;
const WEFT_COUNT = 7;
const PAD_X = 10;
const PAD_Y = 10;
const EASE = 'cubic-bezier(0.7, 0, 0.3, 1)';

// Phase timings (ms)
const WARP_DUR = 520;
const WARP_STAGGER = 40;
const WEFT_DUR = 520;
const WEFT_STAGGER = 80;
const WARP_TOTAL = WARP_DUR + (WARP_COUNT - 1) * WARP_STAGGER;

type Row = { label: string; n: string; unit: string };

const ROWS: Row[] = [
  { label: 'Warp', n: '52', unit: 'per cm' },
  { label: 'Weft', n: '88', unit: 'per cm' },
  { label: 'Pick', n: '62', unit: 'per cm' },
];

export function SpecimenCard() {
  const reduce = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  // Trigger the thread draw once when the card scrolls into view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (reduce) {
      setStarted(true);
      return;
    }
    if (typeof IntersectionObserver === 'undefined') {
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const warpLines = useMemo(() => {
    const span = VIEW_W - PAD_X * 2;
    const gap = span / (WARP_COUNT - 1);
    return Array.from({ length: WARP_COUNT }, (_, i) => {
      const x = PAD_X + i * gap;
      return { x, delay: i * WARP_STAGGER };
    });
  }, []);

  const weftLines = useMemo(() => {
    const span = VIEW_H - PAD_Y * 2;
    const gap = span / (WEFT_COUNT - 1);
    return Array.from({ length: WEFT_COUNT }, (_, i) => {
      const y = PAD_Y + i * gap;
      return { y, delay: WARP_TOTAL + i * WEFT_STAGGER };
    });
  }, []);

  const warpLen = VIEW_H - PAD_Y * 2;
  const weftLen = VIEW_W - PAD_X * 2;

  return (
    <div ref={wrapRef} className={styles.specimen} aria-label="Specimen card">
      <div className={styles.specimenCorner}>TDF · LAB</div>
      <div className={styles.specimenHead}>Specimen</div>
      <div className={styles.specimenNum}>№ 014</div>
      <div className={styles.specimenRule} aria-hidden="true" />
      <dl className={styles.specimenTable}>
        {ROWS.map((r) => (
          <div key={r.label} style={{ display: 'contents' }}>
            <dt>{r.label}</dt>
            <span className="n">{r.n}</span>
            <span className="u">{r.unit}</span>
          </div>
        ))}
      </dl>
      <div className={styles.specimenFoot}>160 g/m² · Cotton 2/40s</div>
      <div className={styles.specimenSvgWrap}>
        <svg
          className={styles.specimenSvg}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Warp and weft thread lockup"
        >
          {/* Warp threads: vertical, draw top-down */}
          {warpLines.map((w, i) => (
            <line
              key={`warp-${i}`}
              className={styles.specimenThreadWarp}
              x1={w.x}
              y1={PAD_Y}
              x2={w.x}
              y2={VIEW_H - PAD_Y}
              style={
                started || reduce
                  ? {
                      strokeDasharray: warpLen,
                      strokeDashoffset: 0,
                      transition: reduce
                        ? 'none'
                        : `stroke-dashoffset ${WARP_DUR}ms ${EASE} ${w.delay}ms`,
                    }
                  : {
                      strokeDasharray: warpLen,
                      strokeDashoffset: warpLen,
                    }
              }
            />
          ))}
          {/* Weft threads: horizontal, draw left-to-right */}
          {weftLines.map((w, i) => (
            <line
              key={`weft-${i}`}
              className={clsx(styles.specimenThreadWeft)}
              x1={PAD_X}
              y1={w.y}
              x2={VIEW_W - PAD_X}
              y2={w.y}
              style={
                started || reduce
                  ? {
                      strokeDasharray: weftLen,
                      strokeDashoffset: 0,
                      transition: reduce
                        ? 'none'
                        : `stroke-dashoffset ${WEFT_DUR}ms ${EASE} ${w.delay}ms`,
                    }
                  : {
                      strokeDasharray: weftLen,
                      strokeDashoffset: weftLen,
                    }
              }
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
