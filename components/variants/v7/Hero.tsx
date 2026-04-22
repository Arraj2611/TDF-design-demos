'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { LoomCollapseChart } from './LoomCollapseChart';
import styles from '@/styles/variants/v7.module.css';

export function Hero() {
  const t = useT();
  const hero = t.hero;
  // Pull two mini-stats for the compressed hero dashboard.
  // Index 1 = "15,000+ power looms" — pairs the chart's floor line with prose.
  // Index 2 = "240+ member units" — footprint counterweight.
  const miniA = hero.stats[1];
  const miniB = hero.stats[2];

  return (
    <header id="top" className={clsx(styles.hero, styles.container)}>
      <div className={styles.heroGrid}>
        <div className={styles.heroLeft}>
          <Reveal>
            <div className={styles.heroEyebrow}>
              <span>Fig. 1 · Sector Index</span>
              <span aria-hidden="true">&middot;</span>
              <span className="cite">{hero.eyebrow}</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className={styles.heroTitle}>{hero.title}</h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.heroSub}>{hero.sub}</p>
          </Reveal>

          {miniA && miniB ? (
            <Reveal delay={0.16}>
              <div className={styles.heroMiniStats}>
                <div className={styles.heroMiniCell}>
                  <div className={styles.heroMiniN}>{miniA.n}</div>
                  <div className={styles.heroMiniL}>{miniA.l}</div>
                </div>
                <div className={styles.heroMiniCell}>
                  <div className={styles.heroMiniN}>{miniB.n}</div>
                  <div className={styles.heroMiniL}>{miniB.l}</div>
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>

        <div className={styles.heroRight}>
          <Reveal delay={0.12}>
            <figure className={styles.heroChartCard}>
              <figcaption className={styles.heroChartHead}>
                <span className="lhs">Plate I &middot; Power Loom Index</span>
                <span className="rhs">Solapur &middot; N=25,000</span>
              </figcaption>
              <LoomCollapseChart className={clsx(styles.heroChartSvg)} />
              <div className={styles.heroRatio}>
                <div className={styles.heroRatioN}>
                  25,000 &nbsp;&#x2198;&nbsp; 15,000 &nbsp;&middot;&nbsp; <strong>&minus;40%</strong>
                </div>
                <div className={styles.heroRatioL}>1992 &mdash; 1995</div>
              </div>
              <span className={styles.figCap}>
                Fig. 1
                <span className="sep" aria-hidden="true" />
                Power Loom Index
                <span className="sep" aria-hidden="true" />
                Solapur 1992&ndash;1995
                <span className="sep" aria-hidden="true" />
                <span className="src">Source: TDF Archives</span>
              </span>
            </figure>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
