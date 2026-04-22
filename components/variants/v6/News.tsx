'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { FigJacquardCard } from './FigJacquardCard';
import styles from '@/styles/variants/v6.module.css';

export function News() {
  const t = useT().news;
  const f = t.feature;

  return (
    <section id="news" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.partLine}>
          <span className="num">VI</span>
          <span>Part Six</span>
          <span className="dot" aria-hidden="true" />
          <span>Field Notes</span>
        </div>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <div className={styles.secTitleRule} aria-hidden="true" />
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      <Reveal>
        <div className={styles.newsFeatureGrid}>
          <div className={styles.newsFeatureMain}>
            <span className={styles.newsFeatureTag}>{f.tag}</span>
            <div className={styles.newsFeatureMeta}>
              <span>{f.cat}</span>
              <span className="sep" aria-hidden="true" />
              <span className="date">{f.date}</span>
            </div>
            <h3 className={styles.newsFeatureTitle}>{f.title}</h3>
            <p className={styles.newsFeatureExcerpt}>{f.excerpt}</p>
            <a href="#news" className={styles.newsReadMore}>
              Read the brief &rarr;
            </a>
          </div>

          <div className={styles.newsFeatureAside}>
            <div className={styles.newsFeatureFig}>
              <FigJacquardCard />
            </div>
            <span className={styles.figCap}>
              <span className="fignum">FIG. 4</span>
              <span className="figtitle">Jacquard punch card &middot; historical context</span>
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className={styles.newsSmallGrid}>
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
              <div className={styles.newsSmallPh}>Subscribe from the footer &rarr;</div>
            </article>
          ) : null}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className={styles.newsSecGrid}>
          {t.secondary.map((n, i) => (
            <article key={i} className={styles.newsSec}>
              <div>
                <div className={styles.newsSecDay}>{n.d}</div>
                <div className={styles.newsSecMonth}>{n.m}</div>
              </div>
              <div>
                <div className={styles.newsSecCat}>{n.cat}</div>
                <div className={styles.newsSecText}>{n.t}</div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>Part VI &middot; No. {t.num} &middot; Field Notes</span>
        <span>Updated <em>weekly</em> by the TDF secretariat</span>
      </div>
    </section>
  );
}
