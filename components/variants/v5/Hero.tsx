'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v5.module.css';

export function Hero() {
  const t = useT();
  const hero = t.hero;

  return (
    <header id="top" className={styles.hero}>
      <div className={styles.heroInner}>
        <Reveal>
          <div className={styles.heroDecree}>
            <span className={styles.dot} />
            <span>Decree</span>
            <span>·</span>
            <span>Est. 1995</span>
            <span>·</span>
            <span>Ledger of the Foundation</span>
          </div>
        </Reveal>
        <Reveal delay={0.04}>
          <div className={styles.heroEyebrow}>{hero.eyebrow}</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className={styles.heroSub}>{hero.sub}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className={styles.heroStats}>
            {hero.stats.map((s, i) => (
              <div key={i} className={styles.heroStat}>
                <div className={styles.heroStatN}>{s.n}</div>
                <div className={styles.heroStatL}>{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.26}>
          <div className={styles.heroFoot}>
            <span className={styles.fleuron} aria-hidden="true">
              &#10086;
            </span>
            <span>
              Recorded at Akkalkot Road, MIDC Solapur &mdash; folio of active
              members and programmes, revised Q2, 2026.
            </span>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
