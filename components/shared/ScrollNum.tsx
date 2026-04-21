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
