'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v7.module.css';

// Hoisted outside the component — never changes. 5 facilities → I–V.
const ROMAN = ['I', 'II', 'III', 'IV', 'V'] as const;

export function Facilities() {
  const t = useT().facilities;

  return (
    <section id="facilities" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.sectionHead}>
          <span className={styles.sectionNo}>§ V</span>
          <span className={styles.sectionKicker}>
            Part V <span className="sep" aria-hidden="true" />
            Programme Data
          </span>
          <span className={styles.sectionMeta}>No. {t.num}</span>
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
              <div className={styles.facMain}>
                <div className={styles.facTag}>&mdash; {f.tag}</div>
                <h3 className={styles.facName}>{f.name}</h3>
                <p className={styles.facDesc}>{f.desc}</p>
                <div className={styles.facStatsRow}>
                  {f.stats.map((s, j) => (
                    <span key={j} className={styles.facStat}>
                      <span className="dot" aria-hidden="true" />
                      <span className="n">{s.n}</span>
                      <span>{s.l}</span>
                    </span>
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
              <div className={styles.facSide}>
                {f.stats.map((s, j) => (
                  <div key={`side-${j}`} className={styles.facSideRow}>
                    <div className={styles.facSideL}>{s.l}</div>
                    <div className={styles.facSideN}>{s.n}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>§ V &middot; No. {t.num} &middot; Shared Campus</span>
        <span><em>{t.items.length}</em> centres maintained under one roof</span>
      </div>
    </section>
  );
}
