'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BinaryStrip } from './BinaryStrip';
import styles from '@/styles/variants/v9.module.css';

// Hand-tuned binary pattern for Section I.
const PATTERN: readonly (0 | 1)[] = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0];

export function About() {
  const t = useT().about;

  return (
    <section id="about" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <BinaryStrip roman="I" pattern={PATTERN} label={`No. ${t.num}`} />
          <h2 className={styles.secTitle}>{t.title}</h2>
          <p className={styles.secLede}>{t.lede}</p>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div className={styles.aboutBody}>
          <div className={styles.aboutBodyText}>
            {t.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside className={styles.aboutSide}>
            <span className={styles.aboutSideTitle}>{t.sidebar.title}</span>
            <ul>
              {t.sidebar.items.map((it, i) => (
                <li key={i}>
                  <span className={styles.aboutSideY}>{it.y}</span>
                  <span className={styles.aboutSideT}>{it.t}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div className={styles.aboutTimelineHead}>
          <span className={styles.aboutTimelineTitle}>{t.timelineTitle}</span>
          <span className={styles.aboutTimelineMeta}>
            {t.timeline.length} entries
          </span>
        </div>
        <div
          className={styles.aboutTable}
          role="table"
          aria-label={t.timelineTitle}
        >
          {t.timeline.map((row, i) => {
            // Anchor the TDF founding row as the ONE red element in About.
            const isAnchor = /TDF/i.test(row.c);
            return (
              <div
                key={`${row.y}-${i}`}
                role="row"
                className={styles.aboutRow}
              >
                <div className={styles.aboutRowY}>
                  {isAnchor ? (
                    <span className="anchor">{row.y}</span>
                  ) : (
                    row.y
                  )}
                </div>
                <div className={styles.aboutRowC}>{row.c}</div>
                <div className={styles.aboutRowT}>{row.t}</div>
              </div>
            );
          })}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>I &middot; Foundation &middot; No. {t.num}</span>
        <span>
          Ledger <em>{t.timeline[0]?.y}</em> &mdash; <em>{t.timeline[t.timeline.length - 1]?.y}</em>
        </span>
      </div>
    </section>
  );
}
