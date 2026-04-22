'use client';

import clsx from 'clsx';
import { useMemo } from 'react';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v8.module.css';

export function About() {
  const t = useT().about;

  // Source the pull-quote from actual content: the first sentence of the
  // first body paragraph. Never invent. If no body, fall back to the first
  // sidebar milestone so we still have *something* from the content bundle.
  const pull = useMemo<string>(() => {
    const first = t.body[0];
    if (first) {
      const match = first.match(/[^.]+[.!?]/);
      if (match) return match[0].trim();
      return first;
    }
    return t.sidebar.items[0]?.t ?? '';
  }, [t.body, t.sidebar.items]);

  return (
    <section id="about" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.sectionHead}>
          <span className="roman">I</span>
          <span className="label">Foundation</span>
          <span className="meta">No. {t.num}</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      <Reveal>
        <div className={styles.aboutBody}>
          {t.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>

      {pull ? (
        <Reveal delay={0.04}>
          <blockquote className={styles.aboutQuote}>
            &ldquo;{pull}&rdquo;
          </blockquote>
        </Reveal>
      ) : null}

      <Reveal delay={0.04}>
        <div className={styles.aboutTimelineHead}>
          <span className={styles.aboutTimelineTitle}>{t.timelineTitle}</span>
          <span>{t.timeline.length} entries</span>
        </div>
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
              <div className={styles.aboutRowC}>{row.c}</div>
              <div className={styles.aboutRowT}>{row.t}</div>
            </div>
          ))}
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
