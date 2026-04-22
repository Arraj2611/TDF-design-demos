'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import styles from '@/styles/variants/v8.module.css';

// The stagger is calculated as (col + row) * STAGGER_MS, capped at CAP_MS.
// That gives a diagonal shuttle sweep — the warp crossing the weft.
const STAGGER_MS = 20;
const CAP_MS = 1500;

// Breakpoints mirror the CSS: 16 cols wide, 8 cols tablet, 4 cols mobile.
// We pick the effective col count on the client to compute correct staggers.
function useColCount(): number {
  const [cols, setCols] = useState<number>(16);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const compute = () => {
      const w = window.innerWidth;
      if (w <= 560) setCols(4);
      else if (w <= 960) setCols(8);
      else setCols(16);
    };
    compute();
    window.addEventListener('resize', compute, { passive: true });
    return () => window.removeEventListener('resize', compute);
  }, []);
  return cols;
}

export function MemberTapestry() {
  const t = useT().members;
  const reduce = usePrefersReducedMotion();
  const cols = useColCount();
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState<boolean>(false);

  useEffect(() => {
    // Reduced-motion: show immediately, no observer, no animation.
    if (reduce) {
      setRevealed(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <>
      <div
        ref={ref}
        className={styles.tapestry}
        role="list"
        aria-label="TDF member units"
      >
        {t.logos.map((m, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          // Plain-weave parity: alternating ivory/cream tiles like a
          // physical weave. Parity flips with each row-offset (col + row).
          const isAlt = (col + row) % 2 === 1;
          // Stagger: capped so the last tiles don't wait forever.
          const delay = Math.min((col + row) * STAGGER_MS, CAP_MS);
          return (
            <div
              key={m.id}
              role="listitem"
              tabIndex={0}
              className={clsx(
                styles.tile,
                isAlt && styles.alt,
                revealed && !reduce && styles.ready,
                reduce && styles.reduced,
              )}
              style={{ '--tile-delay': `${delay}ms` } as CSSProperties}
              data-index={i}
              aria-label={`${m.n} — ${m.c}`}
            >
              <span className={styles.tileInitial} aria-hidden="true">{m.m}</span>
              <span className={styles.tileMark} aria-hidden="true">
                {m.id}
              </span>
              <span className={styles.tileReveal}>{m.k}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.tapestryCap}>
        <span className={styles.tapestryCapText}>
          {t.logos.length} MEMBER UNITS &middot; WOVEN EQUAL &middot; EST. RANGE 1909&ndash;2024
        </span>
        <span className={styles.tapestryCapRule} aria-hidden="true" />
      </div>
    </>
  );
}
