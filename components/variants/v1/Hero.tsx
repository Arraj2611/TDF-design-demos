'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v1.module.css';

export function Hero() {
  const t = useT().hero;
  return (
    <header className={styles.hero} id="top">
      {/* Task 15 replaces this placeholder with HeroWeaveCanvas */}
      <div
        aria-hidden="true"
        className={styles.heroCanvasPlaceholder}
        style={{
          background:
            'linear-gradient(135deg, #f4ede0 0%, #f4ede0 60%, #a8542b 100%)',
        }}
      />
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
