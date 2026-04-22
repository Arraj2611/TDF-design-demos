'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v2.module.css';

export function News() {
  const n = useT().news;
  return (
    <section id="news" className={clsx(styles.section, styles.news)}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div>
            <div className={styles.secKicker}>
              <span className="dash" />
              {n.kicker}
            </div>
            <h2 className={styles.secTitle}>{n.title}</h2>
          </div>
          <p className={styles.secLede}>{n.lede}</p>
        </Reveal>

        <div className={styles.newsGrid}>
          <Reveal as="article" className={clsx(styles.newsFeature)}>
            <div className="tag">{n.feature.tag}</div>
            <div className="cat">
              <span>{n.feature.cat}</span>
              <span className="date">{n.feature.date}</span>
            </div>
            <h3>{n.feature.title}</h3>
            <p>{n.feature.excerpt}</p>
          </Reveal>
          <div className={styles.newsSmallCol}>
            {n.small.map((s, i) => (
              <article key={i} className={styles.newsSmall}>
                <div className="cat">{s.cat}</div>
                <h4>{s.title}</h4>
                <div className="ph">— {s.ph}</div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.newsList}>
          {n.secondary.map((it, i) => (
            <article key={i} className={styles.newsItem}>
              <div className={styles.newsDate}>
                <div className="d">{it.d}</div>
                <div className="m">{it.m}</div>
              </div>
              <div>
                <div className="cat">{it.cat}</div>
                <div className="t">{it.t}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
