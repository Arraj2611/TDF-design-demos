'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v8.module.css';

export function News() {
  const t = useT().news;
  const f = t.feature;

  return (
    <section id="news" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.sectionHead}>
          <span className="roman">V</span>
          <span className="label">Field Notes</span>
          <span className="meta">No. {t.num}</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      <Reveal>
        <div className={styles.newsFeat}>
          <div>
            <div className={styles.newsFeatMeta}>
              <span>{f.cat}</span>
              <span className="date">{f.date}</span>
              <span>{f.tag}</span>
            </div>
            <h3 className={styles.newsFeatTitle}>{f.title}</h3>
            <p className={styles.newsFeatExcerpt}>{f.excerpt}</p>
            <a href="#news" className={styles.newsRead}>
              <span>Read the dispatch</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <div className={styles.newsFeatMark} aria-hidden="true">
            <div className={styles.newsFeatMarkN}>01</div>
            <div className={styles.newsFeatMarkRule} />
            <div className={styles.newsFeatMarkCap}>Featured &middot; No. 01</div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div className={styles.newsSmall}>
          {t.small.map((n, i) => (
            <article key={i} className={styles.newsSmallCell}>
              <div className={styles.newsSmallCat}>&mdash; {n.cat}</div>
              <h4 className={styles.newsSmallTitle}>{n.title}</h4>
              <div className={styles.newsSmallPh}>{n.ph}</div>
            </article>
          ))}
          {t.small.length < 3 ? (
            <article className={styles.newsSmallCell} aria-hidden="true">
              <div className={styles.newsSmallCat}>&mdash; Archive</div>
              <h4 className={styles.newsSmallTitle}>
                Weekly dispatches reach members by email and WhatsApp.
              </h4>
              <div className={styles.newsSmallPh}>Subscribe from the footer &rarr;</div>
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
              <div className={styles.newsSecT}>
                <span className="cat">{n.cat}</span>
                {n.t}
              </div>
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
