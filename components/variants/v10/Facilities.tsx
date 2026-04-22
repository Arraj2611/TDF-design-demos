'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v10.module.css';

// Five facilities → Roman numerals I–V.
const ROMAN = ['I', 'II', 'III', 'IV', 'V'] as const;

export function Facilities() {
  const t = useT().facilities;

  return (
    <section id="facilities" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <div>
            <div className={styles.secKicker}>{t.kicker}</div>
            <h2 className={styles.secTitle}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
          <div className={styles.secNum}>04 / 08</div>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div className={styles.facList}>
          {t.items.map((f, i) => (
            <article key={f.num} className={styles.facRow}>
              <div className={styles.facNumeral} aria-hidden="true">
                {ROMAN[i] ?? String(i + 1)}
              </div>
              <div className={styles.facBody}>
                <div className={styles.facTag}>{f.tag}</div>
                <h3 className={styles.facName}>{f.name}</h3>
                <p className={styles.facDesc}>{f.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
