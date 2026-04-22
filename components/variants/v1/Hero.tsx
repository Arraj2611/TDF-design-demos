'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v1.module.css';

const HeroWeaveCanvas = dynamic(
  () => import('./HeroWeaveCanvas').then((m) => m.HeroWeaveCanvas),
  { ssr: false },
);

export function Hero() {
  const t = useT().hero;
  return (
    <header className={styles.hero} id="top">
      <div aria-hidden="true" className={styles.heroCanvasPlaceholder}>
        <HeroWeaveCanvas />
      </div>
      <div className={styles.heroGrain} />
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
