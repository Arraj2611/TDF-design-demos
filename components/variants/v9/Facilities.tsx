'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BinaryStrip } from './BinaryStrip';
import styles from '@/styles/variants/v9.module.css';

// Hand-tuned binary pattern for Section IV.
const PATTERN: readonly (0 | 1)[] = [0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0];

// Five facilities → Roman numerals I–V.
const ROMAN = ['I', 'II', 'III', 'IV', 'V'] as const;

export function Facilities() {
  const t = useT().facilities;
  const total = t.items.length;

  return (
    <section id="facilities" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <BinaryStrip roman="IV" pattern={PATTERN} label={`No. ${t.num}`} />
          <h2 className={styles.secTitle}>{t.title}</h2>
          <p className={styles.secLede}>{t.lede}</p>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div className={styles.facList}>
          {t.items.map((f, i) => (
            <article key={f.num} className={styles.facRow}>
              <div>
                <div className={styles.facNum} aria-hidden="true">
                  {ROMAN[i] ?? String(i + 1)}
                </div>
                <div className={styles.facDenom}>
                  {String(i + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
                </div>
              </div>
              <div>
                <div className={styles.facTag}>{f.tag}</div>
                <h3 className={styles.facName}>{f.name}</h3>
                <p className={styles.facDesc}>{f.desc}</p>
                <div className={styles.facStats}>
                  {f.stats.map((s, j) => (
                    <div key={j}>
                      <div className={styles.facStatN}>{s.n}</div>
                      <div className={styles.facStatL}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.facTests}>
                {f.tests.map((x, j) => (
                  <span key={j}>{x}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>IV &middot; Studios &middot; No. {t.num}</span>
        <span><em>{t.items.length}</em> centres under one roof</span>
      </div>
    </section>
  );
}
