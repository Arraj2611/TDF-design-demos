'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import styles from '@/styles/variants/v1.module.css';

const HeroWeaveCanvas = dynamic(
  () => import('./HeroWeaveCanvas').then((m) => m.HeroWeaveCanvas),
  { ssr: false },
);

export function Hero() {
  const t = useT().hero;
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();

  // Scroll progress across the hero: 0 when it fills the viewport, 1 when its
  // bottom edge reaches the top. The woven canvas lags (depth) while the text
  // drifts up and fades as the section exits — the page's one signature moment.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <header className={styles.hero} id="top" ref={ref}>
      <motion.div
        aria-hidden="true"
        className={styles.heroCanvasPlaceholder}
        style={reduce ? {} : { y: canvasY, willChange: 'transform' }}
      >
        <HeroWeaveCanvas />
      </motion.div>
      <div className={styles.heroGrain} />
      <motion.div style={reduce ? {} : { y: contentY, opacity: contentOpacity, willChange: 'transform' }}>
        <Reveal className={clsx(styles.container, styles.heroInner)}>
          <div className={styles.heroEyebrow}>
            <span className="rule" />
            <span>{t.eyebrow}</span>
          </div>
          <h1 className={clsx(styles.heroTitle, 'serif')}>{t.title}</h1>
          <p className={styles.heroSub}>{t.sub}</p>
          <div className={styles.heroMeta}>
            {t.stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="n">{s.n}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </motion.div>
      <div className={styles.heroCorner}>
        {Array.isArray(t.corner) ? (
          <>
            {t.corner[0]}
            <br />
            {t.corner[1]}
            {t.corner[2]}
          </>
        ) : (
          t.corner
        )}
      </div>
    </header>
  );
}
