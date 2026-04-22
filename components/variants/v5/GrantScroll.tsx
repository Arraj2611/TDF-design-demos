'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import styles from '@/styles/variants/v5.module.css';

// GrantScroll wraps the About timeline in a parchment-unroll animation.
// On enter viewport: scaleY 0 -> 1 from top, 900ms ease-out. A soft
// fade is added so the middle rows don't jump visually. Reduced-motion
// users get a fully-opened scroll with no transform applied.

export interface GrantScrollProps {
  children: ReactNode;
  className?: string;
}

export function GrantScroll({ children, className }: GrantScrollProps) {
  const reduce = usePrefersReducedMotion();

  if (reduce) {
    return <div className={clsx(styles.scroll, className)}>{children}</div>;
  }

  return (
    <motion.div
      className={clsx(styles.scroll, className)}
      initial={{ scaleY: 0, opacity: 0.4 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        scaleY: { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] },
        opacity: { duration: 0.5, ease: 'easeOut' },
      }}
      style={{ transformOrigin: 'top center' }}
    >
      {children}
    </motion.div>
  );
}
