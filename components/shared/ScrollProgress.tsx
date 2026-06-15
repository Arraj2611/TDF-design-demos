'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * A thin reading-progress bar pinned to the top of the viewport, tracking how
 * far down the page the reader is. Pure transform (scaleX) — GPU-composited, no
 * layout cost. With reduced-motion the bar tracks scroll directly (no spring
 * smoothing), which is still acceptable since it follows the user, not autoplay.
 *
 * Must render inside a theme scope that defines --rust / --gold (the .root of a
 * variant); the gradient falls back to transparent otherwise.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = usePrefersReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX: reduce ? scrollYProgress : smooth,
        transformOrigin: '0 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--rust), var(--gold))',
        zIndex: 60,
        willChange: 'transform',
      }}
    />
  );
}
