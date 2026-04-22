'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v7.module.css';

export function News() {
  const t = useT().news;
  const f = t.feature;

  return (
    <section id="news" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.sectionHead}>
          <span className={styles.sectionNo}>§ VI</span>
          <span className={styles.sectionKicker}>
            Part VI <span className="sep" aria-hidden="true" />
            Field Reports
          </span>
          <span className={styles.sectionMeta}>No. {t.num}</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      <Reveal>
        <div className={styles.newsFeatGrid}>
          <div className={styles.newsFeatMain}>
            <span className={styles.newsFeatTag}>{f.tag}</span>
            <div className={styles.newsFeatMeta}>
              <span>{f.cat}</span>
              <span className="sep" aria-hidden="true" />
              <span className="date">{f.date}</span>
            </div>
            <h3 className={styles.newsFeatTitle}>{f.title}</h3>
            <p className={styles.newsFeatExcerpt}>{f.excerpt}</p>
            <a href="#news" className={styles.newsRead}>
              <span>Read the brief</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className={styles.newsFeatAside} aria-label="Feature data card">
            <div className={styles.newsFeatAsideRow}>
              <div className={styles.newsFeatAsideK}>Ref.</div>
              <div className={styles.newsFeatAsideV}>TDF/NL/2026/012</div>
            </div>
            <div className={styles.newsFeatAsideRow}>
              <div className={styles.newsFeatAsideK}>Published</div>
              <div className={styles.newsFeatAsideV}>{f.date}</div>
            </div>
            <div className={styles.newsFeatAsideRow}>
              <div className={styles.newsFeatAsideK}>Filed under</div>
              <div className={styles.newsFeatAsideV}>{f.cat}</div>
            </div>
            <div className={styles.newsFeatAsideRow}>
              <div className={styles.newsFeatAsideK}>Reading time</div>
              <div className={styles.newsFeatAsideV}>6 min</div>
            </div>
            <div className={styles.newsFeatAsideRow}>
              <div className={styles.newsFeatAsideK}>Distribution</div>
              <div className={styles.newsFeatAsideV}>240 members</div>
            </div>
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
                Weekly dispatch reaches members by WhatsApp and email.
              </h4>
              <div className={styles.newsSmallPh}>Subscribe from the footer &rarr;</div>
            </article>
          ) : null}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div
          className={styles.newsLedger}
          role="table"
          aria-label="Secondary reports ledger"
        >
          <div className={styles.newsLedgerHead} role="row">
            <span>Entry</span>
            <span>Date</span>
            <span className="hideM">Category</span>
            <span>Report</span>
          </div>
          {t.secondary.map((n, i) => (
            <div key={i} className={styles.newsLedgerRow} role="row">
              <div className={styles.newsLedgerRowIdx}>
                VI.{String(i + 1).padStart(2, '0')}
              </div>
              <div className={styles.newsLedgerRowDate}>
                <span>{n.d}</span>
                <span className="m">{n.m}</span>
              </div>
              <div className={styles.newsLedgerRowCat}>{n.cat}</div>
              <div className={styles.newsLedgerRowT}>{n.t}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>§ VI &middot; No. {t.num} &middot; Field Reports</span>
        <span>Updated <em>weekly</em> by the TDF secretariat</span>
      </div>
    </section>
  );
}
