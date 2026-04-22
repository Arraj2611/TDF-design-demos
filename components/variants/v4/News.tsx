'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v4.module.css';

export function News() {
  const t = useT().news;
  const f = t.feature;
  return (
    <section id="news" className={styles.section}>
      <div className={styles.secPageNum}>§ V · p.05</div>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div className={styles.secMark}>§ V</div>
          <div>
            <div className={styles.secKickerRow}>
              <span className={styles.secKicker}>{t.kicker}</span>
              <span className={styles.secKickerDot} />
              <span className={styles.secKickerNum}>№ {t.num}</span>
            </div>
            <h2 className={styles.secTitle}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
        </Reveal>

        <Reveal className={clsx(styles.newsFeature)}>
          <div className={styles.newsFeatureTag}>— {f.tag}</div>
          <div className={styles.newsFeatureBody}>
            <div className={styles.newsFeatureMeta}>
              <span className="cat">{f.cat}</span>
              <span className="sep">·</span>
              <span>{f.date}</span>
            </div>
            <h3 className={styles.newsFeatureH}>{f.title}</h3>
            <p className={styles.newsFeatureExcerpt}>{f.excerpt}</p>
            <a href="#news" className={styles.newsReadMore}>
              Read the brief →
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05} className={clsx(styles.newsSmallGrid)}>
          {t.small.map((n, i) => (
            <article key={i} className={styles.newsSmall}>
              <div className={styles.newsSmallCat}>— {n.cat}</div>
              <h4 className={styles.newsSmallH}>{n.title}</h4>
              <div className={styles.newsSmallPh}>{n.ph}</div>
            </article>
          ))}
          {/* Pad when only two items — keeps the 3-col rhythm visible */}
          {t.small.length < 3 && (
            <article className={clsx(styles.newsSmall)} aria-hidden="true">
              <div className={styles.newsSmallCat}>— Archive</div>
              <h4 className={styles.newsSmallH}>
                Full weekly dispatch available to members via WhatsApp &amp; email.
              </h4>
              <div className={styles.newsSmallPh}>Subscribe from the footer →</div>
            </article>
          )}
        </Reveal>

        <Reveal delay={0.1} className={clsx(styles.newsSecondaryGrid)}>
          {t.secondary.map((n, i) => (
            <article key={i} className={styles.newsSecondary}>
              <div className={styles.newsSecondaryDate}>
                <div className={styles.newsSecondaryD}>{n.d}</div>
                <div className={styles.newsSecondaryM}>{n.m}</div>
              </div>
              <div className={styles.newsSecondaryBody}>
                <div className={styles.newsSecondaryCat}>{n.cat}</div>
                <div className={styles.newsSecondaryT}>{n.t}</div>
              </div>
            </article>
          ))}
        </Reveal>

        <div className={styles.secFoot}>
          <span>
            Footnote<span className={styles.dotSep}> · </span>
            Updated weekly by the TDF secretariat
          </span>
          <span>§ V · Newsletter · p.05</span>
        </div>
      </div>
    </section>
  );
}
