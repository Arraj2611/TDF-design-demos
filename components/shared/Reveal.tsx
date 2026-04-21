'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li';
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  if (reduce) {
    return <Tag data-reveal className={className}>{children}</Tag>;
  }
  const motionProps = {
    'data-reveal': true,
    className,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.2 },
    variants: VARIANTS,
    transition: { delay },
  } as const;
  switch (Tag) {
    case 'section':
      return <motion.section {...motionProps}>{children}</motion.section>;
    case 'article':
      return <motion.article {...motionProps}>{children}</motion.article>;
    case 'li':
      return <motion.li {...motionProps}>{children}</motion.li>;
    case 'div':
    default:
      return <motion.div {...motionProps}>{children}</motion.div>;
  }
}
