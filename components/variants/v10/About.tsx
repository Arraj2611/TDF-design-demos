'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v10.module.css';

export function About() {
  const t = useT().about;

  return (
    <section id="about" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <div>
            <div className={styles.secKicker}>{t.kicker}</div>
            <h2 className={styles.secTitle}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
          <div className={styles.secNum}>01 / 08</div>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div className={styles.aboutBody}>
          <div>
            {t.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Reveal>

      <div className={styles.aboutTimeline}>
        <Reveal>
          <div className={styles.aboutTimelineHead}>
            <span>{t.timelineTitle}</span>
            <span>{t.timeline.length} entries</span>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <div
            className={styles.aboutTable}
            role="table"
            aria-label={t.timelineTitle}
          >
            {t.timeline.map((row, i) => (
              <div
                key={`${row.y}-${i}`}
                role="row"
                className={styles.aboutRow}
              >
                <div className={styles.aboutRowY}>{row.y}</div>
                <div>
                  <div className={styles.aboutRowTC}>{row.c}</div>
                  <div className={styles.aboutRowT}>{row.t}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
