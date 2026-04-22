'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v1.module.css';

export function News() {
  const t = useT().news;
  return (
    <section id="news" className={styles.news}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div className={styles.secKicker}>
            <span className="num">— {t.num}</span>
            <span>{t.kicker}</span>
          </div>
          <div>
            <h2 className={clsx(styles.secTitle, 'serif')}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
        </Reveal>

        <div className={styles.newsGrid}>
          <article className={clsx(styles.newsItem, styles.feature)}>
            <div className={styles.newsImage}>
              <span className="tag">{t.feature.tag}</span>
              <span className="ph">◦ editorial photo · mantralaya</span>
            </div>
            <div className={styles.newsMeta}>
              <span className="cat">{t.feature.cat}</span>
              <span>{t.feature.date}</span>
            </div>
            <h3 className={styles.newsTitle}>{t.feature.title}</h3>
            <p className={styles.newsExcerpt}>{t.feature.excerpt}</p>
            <div className={styles.newsArrow}>
              Read the briefing <span>→</span>
            </div>
          </article>

          {t.small.map((s, i) => (
            <article className={styles.newsItem} key={i}>
              <div className={styles.newsImage}>
                <span className="ph">◦ {s.ph}</span>
              </div>
              <div className={styles.newsMeta}>
                <span className="cat">{s.cat}</span>
              </div>
              <h3 className={styles.newsTitle}>{s.title}</h3>
              <div className={styles.newsArrow}>
                Continue <span>→</span>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.newsSecondary}>
          {t.secondary.map((n, i) => (
            <div className={styles.newsSm} key={i}>
              <div className="date">
                <div className={clsx('d', 'serif')}>{n.d}</div>
                <span className="m">{n.m}</span>
              </div>
              <div className="body">
                <div className="cat">{n.cat}</div>
                <h5>{n.t}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
