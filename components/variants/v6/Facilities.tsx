'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { FigReedHeddles } from './FigReedHeddles';
import styles from '@/styles/variants/v6.module.css';

export function Facilities() {
  const t = useT().facilities;

  return (
    <section id="facilities" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.partLine}>
          <span className="num">V</span>
          <span>Part Five</span>
          <span className="dot" aria-hidden="true" />
          <span>Facilities</span>
        </div>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <div className={styles.secTitleRule} aria-hidden="true" />
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      <Reveal>
        <div className={styles.facList}>
          {t.items.map((f, i) => (
            <article key={f.num} className={styles.facRow}>
              <div>
                <div className={styles.facFig}>
                  <FigReedHeddles />
                </div>
                <span className={styles.facFigCap}>
                  Fig. 3.{i + 1} &middot; Plate {String.fromCharCode(65 + i)}
                </span>
              </div>
              <div className={styles.facMain}>
                <div className={styles.facTag}>&mdash; {f.tag}</div>
                <h3 className={styles.facName}>{f.name}</h3>
                <p className={styles.facDesc}>{f.desc}</p>
                <div className={styles.facTests}>
                  {f.tests.map((x, j) => (
                    <span key={j}>
                      {x}
                      {j < f.tests.length - 1 ? '  ·  ' : ''}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.facStats}>
                {f.stats.map((s, j) => (
                  <div key={j} className={styles.facStatRow}>
                    <div className={styles.facStatL}>{s.l}</div>
                    <div className={styles.facStatN}>{s.n}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>Part V &middot; No. {t.num} &middot; Shared Campus</span>
        <span><em>{t.items.length}</em> centres maintained under one roof</span>
      </div>
    </section>
  );
}
