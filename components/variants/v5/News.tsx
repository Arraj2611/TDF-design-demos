'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v5.module.css';

export function News() {
  const t = useT().news;
  const f = t.feature;
  return (
    <section id="news" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.doubleRule} aria-hidden="true" />
        <div className={styles.sectionInner}>
          <div className={styles.marginL} aria-hidden="true">
            V
          </div>
          <div className={styles.marginRowMobile}>
            <span>V</span>
            <span>f. V</span>
          </div>
          <div className={styles.col}>
            <Reveal className={clsx(styles.secHead)}>
              <div className={styles.secKickerRow}>
                <span className={styles.secKicker}>{t.kicker}</span>
                <span className={styles.secKickerDot} />
                <span className={styles.secKickerNum}>No. {t.num}</span>
              </div>
              <h2 className={styles.secTitle}>{t.title}</h2>
              <p className={styles.secLede}>{t.lede}</p>
            </Reveal>

            <Reveal className={clsx(styles.newsFeature)}>
              <div className={styles.newsFeatureTag}>{f.tag}</div>
              <div className={styles.newsFeatureMeta}>
                <span>{f.cat}</span>
                <span className="sep">&middot;</span>
                <span>{f.date}</span>
              </div>
              <h3 className={styles.newsFeatureTitle}>{f.title}</h3>
              <p className={styles.newsFeatureExcerpt}>{f.excerpt}</p>
              <a href="#news" className={styles.newsReadMore}>
                Read the brief &rarr;
              </a>
            </Reveal>

            <Reveal delay={0.05} className={clsx(styles.newsSmallGrid)}>
              {t.small.map((n, i) => (
                <article key={i} className={styles.newsSmall}>
                  <div className={styles.newsSmallCat}>&mdash; {n.cat}</div>
                  <h4 className={styles.newsSmallTitle}>{n.title}</h4>
                  <div className={styles.newsSmallPh}>{n.ph}</div>
                </article>
              ))}
              {t.small.length < 3 ? (
                <article className={styles.newsSmall} aria-hidden="true">
                  <div className={styles.newsSmallCat}>&mdash; Archive</div>
                  <h4 className={styles.newsSmallTitle}>
                    Full weekly dispatch reaches members by WhatsApp and email.
                  </h4>
                  <div className={styles.newsSmallPh}>
                    Subscribe from the footer &rarr;
                  </div>
                </article>
              ) : null}
            </Reveal>

            <Reveal delay={0.08} className={clsx(styles.newsSecondaryGrid)}>
              {t.secondary.map((n, i) => (
                <article key={i} className={styles.newsSec}>
                  <div>
                    <div className={styles.newsSecDay}>{n.d}</div>
                    <div className={styles.newsSecMonth}>{n.m}</div>
                  </div>
                  <div className={styles.newsSecBody}>
                    <div className={styles.newsSecCat}>{n.cat}</div>
                    <div className={styles.newsSecText}>{n.t}</div>
                  </div>
                </article>
              ))}
            </Reveal>

            <div className={styles.secFoot}>
              <span className={styles.secFootSign}>
                <span className={styles.secFootMono}>Folio V</span>
                <span>&mdash; updated weekly by the TDF secretariat.</span>
              </span>
              <span className={styles.secFootMono}>
                f. V &middot; {t.kicker}
              </span>
            </div>
          </div>
          <div className={styles.marginR} aria-hidden="true">
            f. V &middot; From the Dispatch
          </div>
        </div>
      </div>
    </section>
  );
}
