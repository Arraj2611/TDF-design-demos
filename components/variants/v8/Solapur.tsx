'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v8.module.css';

export function Solapur() {
  const t = useT().solapur;

  return (
    <section id="solapur" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.sectionHead}>
          <span className="roman">VII</span>
          <span className="label">The City</span>
          <span className="meta">No. {t.num}</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      <div className={styles.solGrid}>
        <Reveal>
          <div className={styles.solParas}>
            {t.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className={styles.solFacts}>
            {t.facts.map((f, i) => (
              <div key={i} className={styles.solFactRow}>
                <div className={styles.solFactN}>{f.n}</div>
                <div className={styles.solFactL}>{f.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.04}>
        <div className={styles.solHl}>
          {t.highlights.map((h, i) => (
            <div key={i} className={styles.solHlCell}>
              <div className={styles.solHlK}>{h.k}</div>
              <div className={styles.solHlV}>{h.v}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>VII &middot; The City &middot; No. {t.num}</span>
        <span>
          <em>{t.facts[0]?.l}</em> &middot; {t.facts[0]?.n}
        </span>
      </div>
    </section>
  );
}
