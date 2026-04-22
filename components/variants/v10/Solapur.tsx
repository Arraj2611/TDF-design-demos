'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v10.module.css';

export function Solapur() {
  const t = useT().solapur;

  return (
    <section id="solapur" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <div>
            <div className={styles.secKicker}>{t.kicker}</div>
            <h2 className={styles.secTitle}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
          <div className={styles.secNum}>07 / 08</div>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div className={styles.solGrid}>
          <div className={styles.solParas}>
            {t.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className={styles.solFacts}>
            {t.facts.map((f, i) => (
              <div key={i}>
                <div className={styles.solFactN}>{f.n}</div>
                <div className={styles.solFactL}>{f.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className={styles.solHl}>
          {t.highlights.map((h, i) => (
            <div key={i}>
              <div className={styles.solHlK}>{h.k}</div>
              <div className={styles.solHlV}>{h.v}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
