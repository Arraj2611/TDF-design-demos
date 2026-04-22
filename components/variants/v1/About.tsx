'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v1.module.css';

export function About() {
  const t = useT().about;
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead, styles.secHeadNoBorder)}>
          <div className={styles.secKicker}>
            <span className="num">— {t.num}</span>
            <span>{t.kicker}</span>
          </div>
          <div>
            <h2 className={clsx(styles.secTitle, 'serif')}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
        </Reveal>
        <div className={styles.aboutGrid}>
          <div />
          <div className={styles.aboutBody}>
            {t.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside className={styles.aboutSide}>
            <h4>— {t.sidebar.title}</h4>
            <ul>
              {t.sidebar.items.map((it, i) => (
                <li key={i}>
                  <span className={clsx('yr', 'serif')}>{it.y}</span>
                  <span>{it.t}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <Reveal className={clsx(styles.timeline)}>
          <div className={styles.timelineHead}>
            <h3 className="serif">{t.timelineTitle}</h3>
            <div className="meta">{t.timelineMeta}</div>
          </div>
          <div className={styles.timelineScroll}>
            {t.timeline.map((it, i) => (
              <div key={i} className={clsx(styles.tlItem, it.a && styles.accent)}>
                <div className={styles.tlYear}>{it.y}</div>
                <div className={styles.tlTitle}>— {it.c}</div>
                <div className={styles.tlText}>{it.t}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
