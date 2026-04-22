'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v7.module.css';

// Hoisted: keyed by timeline-entry year/category label the content object
// uses, so we can anchor rows to the data without parsing the body text.
// An "anchor" entry is one the content marks with `a: true`.
export function About() {
  const t = useT().about;

  // Find the 1992 "Peak" entry (or its Marathi translation) to cite in the
  // USSR export ribbon caption. We don't hard-code the string.
  const peak = t.timeline.find((row) =>
    row.t.includes('USSR') || row.t.includes('USSR') || row.t.includes('६५०') || row.t.includes('650'),
  );

  return (
    <section id="about" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.sectionHead}>
          <span className={styles.sectionNo}>§ II</span>
          <span className={styles.sectionKicker}>
            Part II <span className="sep" aria-hidden="true" />
            Foundation Context
          </span>
          <span className={styles.sectionMeta}>No. {t.num}</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className={styles.secTitle}>{t.title}</h2>
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
            <div
              className={styles.aboutTable}
              role="table"
              aria-label={t.sidebar.title}
            >
              <div className={styles.aboutTableHead} role="row">
                <span>Year</span>
                <span>Milestone</span>
              </div>
              {t.sidebar.items.map((it, i) => {
                // Treat the year as an anchor if the sidebar milestone carries
                // a year matching any `a: true` timeline entry.
                const anchored = t.timeline.some(
                  (row) => row.y === it.y && row.a === true,
                );
                return (
                  <div
                    key={i}
                    role="row"
                    className={clsx(
                      styles.aboutTableRow,
                      anchored && styles.anchor,
                    )}
                  >
                    <div className={styles.aboutTableY}>{it.y}</div>
                    <div className={styles.aboutTableT}>{it.t}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      {/* USSR export ribbon — 1980–1992 amber bar on a slate track. */}
      <Reveal>
        <div className={styles.ussrBlock}>
          <div className={styles.ussrHead}>
            <span>Fig. 2 · Export Era Ribbon</span>
            <span className="span">1980 &mdash; 1992 &middot; 12 years</span>
          </div>
          <div className={styles.ussrGrid}>
            <div className={styles.ussrLabel}>
              <div className={styles.ussrLabelN}>&#8377;650 Cr</div>
              <div className={styles.ussrLabelL}>USSR Export Order Era</div>
            </div>
            <div>
              <div className={styles.ussrTrack} aria-hidden="true">
                {/* Fill represents the 1980–1992 subspan of a 1877–1995 axis.
                    (1992 − 1980) / (1995 − 1877) ≈ 10.2% — but we visualize
                    the *share of active export activity* during the era, so
                    the fill is set to the full ribbon width as the entirety
                    of that order regime. The axis below anchors the dates. */}
                <div className={styles.ussrFill} style={{ width: '100%' }} />
              </div>
              <div className={styles.ussrAxis}>
                <span>1980</span>
                <span>1984</span>
                <span>1988</span>
                <span>1992</span>
              </div>
            </div>
          </div>
          {peak ? (
            <p
              style={{
                marginTop: 12,
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                lineHeight: 1.55,
                color: 'var(--v7-slate-mute)',
                maxWidth: '62ch',
              }}
            >
              {peak.t}
            </p>
          ) : null}
        </div>
      </Reveal>

      {/* Annotated timeline ledger — Plex Mono caps, amber underline on anchors */}
      <Reveal delay={0.04}>
        <div className={styles.tlBlock}>
          <div className={styles.tlHead}>
            <div className={styles.tlTitle}>{t.timelineTitle}</div>
            <div className={styles.tlMeta}>Ledger &middot; {t.timeline.length} entries</div>
          </div>
          <div
            className={styles.tlTable}
            role="table"
            aria-label="Foundation timeline ledger"
          >
            <div className={styles.tlTableHead} role="row">
              <span>Year</span>
              <span>Chapter</span>
              <span>Note</span>
              <span>•</span>
            </div>
            {t.timeline.map((row, i) => (
              <div
                key={`${row.y}-${i}`}
                role="row"
                className={clsx(styles.tlRow, row.a && styles.anchor)}
              >
                <div className={styles.tlY}>{row.y}</div>
                <div className={styles.tlC}>{row.c}</div>
                <div className={styles.tlT}>{row.t}</div>
                <span className={styles.tlDot} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>§ II &middot; No. {t.num} &middot; Foundation Context</span>
        <span>
          Ledger spans <em>{t.timeline[0]?.y}</em> &mdash; <em>{t.timeline[t.timeline.length - 1]?.y}</em>
        </span>
      </div>
    </section>
  );
}
