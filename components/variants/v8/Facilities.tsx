'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v8.module.css';

// Hoisted: five facilities → Roman numerals I–V.
const ROMAN = ['I', 'II', 'III', 'IV', 'V'] as const;

export function Facilities() {
  const t = useT().facilities;

  return (
    <section id="facilities" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.sectionHead}>
          <span className="roman">IV</span>
          <span className="label">Studios</span>
          <span className="meta">No. {t.num}</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      <Reveal>
        <div className={styles.facList}>
          {t.items.map((f, i) => (
            <article key={f.num} className={styles.facRow}>
              <div className={styles.facNum} aria-hidden="true">
                {ROMAN[i] ?? String(i + 1)}
              </div>
              <div>
                <div className={styles.facTag}>&mdash; {f.tag}</div>
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
                <p className={styles.facTests}>
                  {f.tests.map((x, j) => (
                    <span key={j}>
                      {x}
                      {j < f.tests.length - 1 ? '  ·  ' : ''}
                    </span>
                  ))}
                </p>
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
