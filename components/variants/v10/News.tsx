'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v10.module.css';

const PULL_QUOTE =
  '\u201CA cluster does not modernise through slogans. It modernises one loom, one audit, one buyer at a time.\u201D';

export function News() {
  const t = useT().news;
  const f = t.feature;

  // Merge the two "small" items and the secondary list into a single
  // lookbook list — spec calls for one collapsed list, no grids.
  const list = [
    ...t.small.map((s) => ({ title: s.title, meta: `${s.cat} \u00b7 ${s.ph}` })),
    ...t.secondary.map((s) => ({
      title: s.t,
      meta: `${s.cat} \u00b7 ${s.d} ${s.m}`,
    })),
  ];

  return (
    <section id="news" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <div>
            <div className={styles.secKicker}>{t.kicker}</div>
            <h2 className={styles.secTitle}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
          <div className={styles.secNum}>05 / 08</div>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div className={styles.newsFeat}>
          <div className={styles.newsFeatMeta}>
            {f.cat} &middot; {f.date}
          </div>
          <h3 className={styles.newsFeatTitle}>{f.title}</h3>
          <p className={styles.newsFeatExcerpt}>{f.excerpt}</p>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <p className={styles.newsQuote}>{PULL_QUOTE}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className={styles.newsList}>
          {list.map((n, i) => (
            <div key={i} className={styles.newsItem}>
              <h4 className={styles.newsItemTitle}>{n.title}</h4>
              <div className={styles.newsItemMeta}>{n.meta}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
