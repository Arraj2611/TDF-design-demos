'use client';
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

export function DropCap({ letter }: { letter: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = usePrefersReducedMotion();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (reduce) {
      setAnimated(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setAnimated(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <span
      ref={ref}
      data-animated={animated || undefined}
      style={{
        float: 'left',
        fontFamily: 'var(--font-playfair), Georgia, serif',
        fontWeight: 900,
        fontStyle: 'italic',
        fontSize: '5.6rem',
        lineHeight: 0.85,
        paddingRight: '10px',
        paddingTop: '4px',
        color: '#e13727',
        opacity: animated ? 1 : 0,
        transform: animated ? 'translateY(0)' : 'translateY(8px)',
        transition:
          'opacity 700ms cubic-bezier(0.7, 0, 0.3, 1), transform 700ms cubic-bezier(0.7, 0, 0.3, 1)',
      }}
    >
      {letter}
    </span>
  );
}
