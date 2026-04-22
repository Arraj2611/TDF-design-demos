'use client';

import clsx from 'clsx';
import { useMemo } from 'react';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v7.module.css';

export function Members() {
  const t = useT().members;

  // The "all" filter gives us the denominator for share percentages in the
  // small-multiples distribution. Compute once per render of content.
  const { totalAll, rest } = useMemo(() => {
    const all = t.filters.find((f) => f.k === 'all');
    const denominator = all?.c ?? 0;
    const remainder = t.filters.filter((f) => f.k !== 'all');
    return { totalAll: denominator, rest: remainder };
  }, [t.filters]);

  return (
    <section id="members" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.sectionHead}>
          <span className={styles.sectionNo}>§ III</span>
          <span className={styles.sectionKicker}>
            Part III <span className="sep" aria-hidden="true" />
            Membership Metrics
          </span>
          <span className={styles.sectionMeta}>No. {t.num}</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      {/* Top-line 4-cell dashboard */}
      <Reveal className={clsx(styles.memDash)}>
        {t.stats.map((s, i) => (
          <div key={i} className={styles.memCell}>
            <div className={styles.memCellN}>{s.n}</div>
            <div className={styles.memCellL}>{s.l}</div>
          </div>
        ))}
      </Reveal>

      {/* Small-multiples: one tile per filter, share bar against the total */}
      <Reveal delay={0.04} className={clsx(styles.memSm)}>
        {rest.map((f) => {
          const share = totalAll > 0 ? Math.round((f.c / totalAll) * 100) : 0;
          return (
            <div key={f.k} className={styles.memSmCell}>
              <div className={styles.memSmK}>&mdash; {f.l}</div>
              <div className={styles.memSmN}>{f.c}</div>
              <div className={styles.memSmBar}>
                <div
                  className={styles.memSmBarTrack}
                  role="meter"
                  aria-label={`${f.l} share`}
                  aria-valuenow={share}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={styles.memSmBarFill}
                    style={{ width: `${Math.min(100, share)}%` }}
                  />
                </div>
                <div className={styles.memSmShare}>{share}%</div>
              </div>
            </div>
          );
        })}
      </Reveal>

      {/* Register table — tabular with hairline separators */}
      <Reveal delay={0.08}>
        <div
          className={styles.memTable}
          role="table"
          aria-label="Member register"
        >
          <div className={styles.memTableHead} role="row">
            <span>Folio</span>
            <span>Mark</span>
            <span>Name of Unit</span>
            <span className="hideM">Discipline</span>
            <span>Class</span>
          </div>
          {t.logos.map((lg) => (
            <div key={lg.id} className={styles.memRow} role="row">
              <div className={styles.memRowId}>{lg.id}</div>
              <div className={styles.memRowM}>{lg.m}</div>
              <div className={styles.memRowN}>{lg.n}</div>
              <div className={styles.memRowC}>{lg.c}</div>
              <div className={styles.memRowK}>{lg.k}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>§ III &middot; No. {t.num} &middot; Roll of Units</span>
        <span>
          <em>{t.stats[0]?.n}</em> active units &middot; register revised Q2/2026
        </span>
      </div>
    </section>
  );
}
