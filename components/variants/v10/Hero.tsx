'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { FabricZoom } from './FabricZoom';
import styles from '@/styles/variants/v10.module.css';

export function Hero() {
  const t = useT();
  const hero = t.hero;
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <header id="top" ref={heroRef} className={clsx(styles.hero, styles.container)}>
      <div className={styles.heroGrid}>
        <div>
          <Reveal>
            <div className={styles.heroEyebrow}>
              <span>Edition · 10</span>
              <span className={styles.heroEyebrowSep} aria-hidden="true">·</span>
              <span>Solapuri Chaddar</span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h1 className={styles.heroTitle}>{hero.title}</h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.heroSub}>{hero.sub}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className={styles.heroArc}>
              <span className={styles.heroArcN}>1877</span>
              <span className={styles.heroArcSep} aria-hidden="true">→</span>
              <span className={styles.heroArcN}>2026</span>
              <span className={styles.heroArcL}>A fourteen-decade arc</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <figure className={styles.heroFigure}>
            <div className={styles.heroFigureCanvas}>
              <FabricZoom heroRef={heroRef} />
            </div>
            <figcaption className={styles.heroCaption}>
              Fig. 01 · Chaddar · 52 × 88 · Warp × Weft · 160 g/m²
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </header>
  );
}
