'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { Parallax } from '@/components/shared/Parallax';
import { LoomIllustration } from './LoomIllustration';
import styles from '@/styles/variants/v6.module.css';

export function Hero() {
  const t = useT();
  const hero = t.hero;

  return (
    <header id="top" className={clsx(styles.hero, styles.container)}>
      <div className={styles.heroInner}>
        <Reveal>
          <div className={styles.partLine}>
            <span className="num">I</span>
            <span>Part One</span>
            <span className="dot" aria-hidden="true" />
            <span>Proceedings</span>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <div className={styles.heroEyebrow}>
            {hero.eyebrow} · Est. 1995 · Solapur 17.66&deg;N
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className={styles.heroSub}>{hero.sub}</p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className={styles.heroMetaRow}>
            {hero.stats.map((s, i) => (
              <div key={i} className={styles.heroMetaCell}>
                <div className={styles.heroMetaN}>{s.n}</div>
                <div className={styles.heroMetaL}>{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <Parallax y={0.2}>
            <div className={styles.heroFigWrap}>
              <span className={styles.heroFigAxis}>Plate · I / IX</span>
              <span className={styles.heroFigAxisR}>Power Loom &mdash; Elevation</span>
              <LoomIllustration className={clsx(styles.heroFigSvg)} />
            </div>
          </Parallax>
          <span className={styles.figCap}>
            <span className="fignum">FIG. 1</span>
            <span className="figtitle">Power loom configuration &middot; est. 1908 &middot; scale 1:24 &middot; annotated plate</span>
          </span>
        </Reveal>
      </div>
    </header>
  );
}
