'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BinaryStrip } from './BinaryStrip';
import styles from '@/styles/variants/v9.module.css';

// Hand-tuned binary pattern for Section V.
const PATTERN: readonly (0 | 1)[] = [1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1];

export function News() {
  const t = useT().news;
  const f = t.feature;

  return (
    <section id="news" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <BinaryStrip roman="V" pattern={PATTERN} label={`No. ${t.num}`} />
          <h2 className={styles.secTitle}>{t.title}</h2>
          <p className={styles.secLede}>{t.lede}</p>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div className={styles.newsFeat}>
          <div>
            <div className={styles.newsFeatMeta}>
              <span className={styles.newsFeatCat}>{f.cat}</span>
              <span className={styles.newsFeatSep} aria-hidden="true">&middot;</span>
              <span className={styles.newsFeatDate}>{f.date}</span>
            </div>
            <h3 className={styles.newsFeatTitle}>{f.title}</h3>
            <p className={styles.newsFeatExcerpt}>{f.excerpt}</p>
          </div>
          <div className={styles.newsFeatNum} aria-hidden="true">01</div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div className={styles.newsSmall}>
          {t.small.map((n, i) => (
            <article key={i}>
              <div className={styles.newsSmallCat}>{n.cat}</div>
              <h4 className={styles.newsSmallTitle}>{n.title}</h4>
              <div className={styles.newsSmallPh}>{n.ph}</div>
            </article>
          ))}
          {t.small.length < 3 ? (
            <article aria-hidden="true">
              <div className={styles.newsSmallCat}>Archive</div>
              <h4 className={styles.newsSmallTitle}>
                Weekly dispatches reach members by email and WhatsApp.
              </h4>
              <div className={styles.newsSmallPh}>
                Subscribe from the footer &rarr;
              </div>
            </article>
          ) : null}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className={styles.newsSec}>
          {t.secondary.map((n, i) => (
            <div key={i} className={styles.newsSecRow}>
              <div className={styles.newsSecD}>{n.d}</div>
              <div className={styles.newsSecM}>{n.m}</div>
              <div className={styles.newsSecCat}>{n.cat}</div>
              <div className={styles.newsSecT}>{n.t}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>V &middot; Field Notes &middot; No. {t.num}</span>
        <span>Updated <em>weekly</em> by the TDF secretariat</span>
      </div>
    </section>
  );
}
