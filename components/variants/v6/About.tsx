'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { FigShuttle } from './FigShuttle';
import styles from '@/styles/variants/v6.module.css';

export function About() {
  const t = useT().about;

  return (
    <section id="about" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.partLine}>
          <span className="num">II</span>
          <span>Part Two</span>
          <span className="dot" aria-hidden="true" />
          <span>The Foundation</span>
        </div>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <div className={styles.secTitleRule} aria-hidden="true" />
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      <div className={styles.aboutGrid}>
        <Reveal className={clsx(styles.aboutBody)}>
          {t.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.08} className={clsx(styles.aboutSide)}>
          <div>
            <div className={styles.aboutFig}>
              <FigShuttle />
            </div>
            <span className={styles.figCap}>
              <span className="fignum">FIG. 2</span>
              <span className="figtitle">{t.sidebar.title} &middot; shuttle in section</span>
            </span>
          </div>

          <div className={styles.aboutTable} aria-label={t.sidebar.title}>
            <div className={styles.aboutTableHead}>
              <span>Year</span>
              <span>Milestone</span>
            </div>
            {t.sidebar.items.map((it, i) => (
              <div key={i} className={styles.aboutTableRow}>
                <div className={styles.aboutTableY}>{it.y}</div>
                <div className={styles.aboutTableT}>{it.t}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className={styles.timelineWrap}>
        <Reveal>
          <div className={styles.timelineHead}>
            <div className={styles.timelineTitle}>{t.timelineTitle}</div>
            <div className={styles.timelineMeta}>{t.timelineMeta}</div>
          </div>
          <div className={styles.timelineAxisBar} aria-hidden="true" />
        </Reveal>

        <Reveal delay={0.04}>
          <div className={styles.timelineScroll} role="list">
            {t.timeline.map((row, i) => (
              <div
                key={`${row.y}-${i}`}
                role="listitem"
                className={clsx(
                  styles.timelineBlock,
                  row.a && styles.anchor
                )}
              >
                <div className={styles.timelineBar} aria-hidden="true" />
                <div>
                  <div className={styles.timelineBlockY}>{row.y}</div>
                  <div className={styles.timelineBlockC}>{row.c}</div>
                </div>
                <div className={styles.timelineBlockT}>{row.t}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className={styles.secFoot}>
        <span>Part II &middot; No. {t.num} &middot; The Foundation</span>
        <span>
          Plate spans <em>{t.timeline[0]?.y}</em> — <em>{t.timeline[t.timeline.length - 1]?.y}</em>
        </span>
      </div>
    </section>
  );
}
