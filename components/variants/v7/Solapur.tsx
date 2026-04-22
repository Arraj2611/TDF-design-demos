'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v7.module.css';

const IDX = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'] as const;

export function Solapur() {
  const t = useT().solapur;

  return (
    <section id="solapur" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.sectionHead}>
          <span className={styles.sectionNo}>§ VIII</span>
          <span className={styles.sectionKicker}>
            Part VIII <span className="sep" aria-hidden="true" />
            Regional Data
          </span>
          <span className={styles.sectionMeta}>No. {t.num}</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      <div className={styles.solGrid}>
        <Reveal className={clsx(styles.solBody)}>
          {t.paras.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.06}>
          <div
            className={styles.solDash}
            role="table"
            aria-label="Regional indicators"
          >
            {t.facts.map((f, i) => (
              <div key={i} className={styles.solDashRow} role="row">
                <div className={styles.solDashIdx}>{IDX[i] ?? String(i + 1)}</div>
                <div className={styles.solDashL}>{f.l}</div>
                <div className={styles.solDashN}>{f.n}</div>
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
        <span>§ VIII &middot; No. {t.num} &middot; Regional Data</span>
        <span>
          <em>{t.facts[0]?.l}</em> &middot; {t.facts[0]?.n}
        </span>
      </div>
    </section>
  );
}
