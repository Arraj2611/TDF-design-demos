'use client';

import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v3.module.css';
import { WarpWeftGrid } from './WarpWeftGrid';

export function Hero() {
  const t = useT();
  const h = t.hero;
  return (
    <section id="top" className={styles.hero}>
      <WarpWeftGrid />
      <Reveal>
        <p className={styles.kicker}>{h.eyebrow}</p>
        <h1 className={styles.heroTitle}>{h.title}</h1>
        <p className={styles.heroLede}>{h.sub}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <aside className={styles.heroSide}>
          <h3>Dateline</h3>
          <p className={styles.heroDateline}>
            Solapur · {t.top.est}
          </p>
          <p className={styles.heroPreamble}>
            {t.about.lede}
          </p>
          <div className={styles.heroStats}>
            {h.stats.map((s, i) => (
              <div key={i}>
                <span className={styles.sN}>{s.n}</span>
                <span className={styles.sL}>{s.l}</span>
              </div>
            ))}
          </div>
        </aside>
      </Reveal>
    </section>
  );
}
