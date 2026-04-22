'use client';

import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v3.module.css';

export function Members() {
  const m = useT().members;
  return (
    <section id="members" className={styles.section}>
      <div className={styles.sectionRule} />
      <Reveal>
        <div className={styles.secHead}>
          <p className={styles.kicker}>{m.kicker}</p>
          <span className={styles.secNum}>№ {m.num}</span>
        </div>
        <h2 className={styles.secTitle}>{m.title}</h2>
        <p className={styles.secLede}>{m.lede}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <div className={styles.memberStats}>
          {m.stats.map((s, i) => (
            <div key={i} className={styles.memberStat}>
              <span className={styles.sN}>{s.n}</span>
              <span className={styles.sL}>{s.l}</span>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className={styles.logoWall}>
          {m.logos.map((lg, i) => (
            <div key={i} className={styles.logoTile}>
              <span className={styles.lM}>{lg.m}</span>
              <span className={styles.lN}>{lg.n}</span>
              <span className={styles.lC}>{lg.c}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
