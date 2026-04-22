'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v4.module.css';
import { SpecimenCard } from './SpecimenCard';

export function Hero() {
  const t = useT();
  const hero = t.hero;

  return (
    <header id="top" className={styles.hero}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.heroKicker)}>
          <span className={styles.heroKickerDot} />
          <span>Dossier</span>
          <span className={styles.heroKickerLine} />
          <span>Q4 · 2026</span>
          <span className={styles.heroKickerLine} />
          <span>TDF Solapur</span>
          <span className={styles.heroKickerLine} />
          <span>{t.top.est}</span>
        </Reveal>

        <div className={styles.heroGrid}>
          <Reveal>
            <h1 className={styles.heroTitle}>{hero.title}</h1>
            <p className={styles.heroLede}>{hero.sub}</p>
            <div className={styles.heroStats}>
              {hero.stats.map((s, i) => (
                <div key={i} className={styles.heroStat}>
                  <div className={styles.heroStatN}>{s.n}</div>
                  <div className={styles.heroStatL}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SpecimenCard />
          </Reveal>
        </div>
      </div>
    </header>
  );
}
