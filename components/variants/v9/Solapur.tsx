'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BinaryStrip } from './BinaryStrip';
import styles from '@/styles/variants/v9.module.css';

// Hand-tuned binary pattern for Section VII.
const PATTERN: readonly (0 | 1)[] = [1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1];

export function Solapur() {
  const t = useT().solapur;

  return (
    <section id="solapur" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <BinaryStrip roman="VII" pattern={PATTERN} label={`No. ${t.num}`} />
          <h2 className={styles.secTitle}>{t.title}</h2>
          <p className={styles.secLede}>{t.lede}</p>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div className={styles.solGrid}>
          <div className={styles.solParas}>
            {t.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className={styles.solDivider} aria-hidden="true" />
          <div className={styles.solFacts}>
            {t.facts.map((f, i) => (
              <div key={i} className={styles.solFactRow}>
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

      <div className={styles.secFoot}>
        <span>VII &middot; The City &middot; No. {t.num}</span>
        <span>
          <em>{t.facts[0]?.l}</em> &middot; {t.facts[0]?.n}
        </span>
      </div>
    </section>
  );
}
