'use client';

import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v3.module.css';

export function News() {
  const n = useT().news;
  const f = n.feature;
  return (
    <section id="news" className={styles.section}>
      <div className={styles.sectionRule} />
      <Reveal>
        <div className={styles.secHead}>
          <p className={styles.kicker}>{n.kicker}</p>
          <span className={styles.secNum}>№ {n.num}</span>
        </div>
        <h2 className={styles.secTitle}>{n.title}</h2>
        <p className={styles.secLede}>{n.lede}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <div className={styles.newsFeature}>
          <div>
            <p className={styles.kicker}>
              {f.cat} · {f.date}
            </p>
            <h3>{f.title}</h3>
            <p>{f.excerpt}</p>
          </div>
          <div>
            <span className={styles.newsFeatureTag}>{f.tag}</span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className={styles.newsGrid}>
          {n.small.map((s, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.tag}>{s.cat}</span>
              <h4>{s.title}</h4>
              <div className={styles.ph}>— {s.ph}</div>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <div className={styles.newsSecondary}>
          {n.secondary.map((s, i) => (
            <article key={i} className={styles.newsSecondaryItem}>
              <div className={styles.nsDate}>
                {s.d}
                <span className={styles.m}>{s.m}</span>
              </div>
              <div>
                <div className={styles.nsCat}>{s.cat}</div>
                <div className={styles.nsText}>{s.t}</div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
