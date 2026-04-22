'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v2.module.css';

export function Events() {
  const e = useT().events;
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const list = tab === 'upcoming' ? e.upcoming : e.past;
  const featured = list.find((x) => x.featured);
  const nonFeatured = list.filter((x) => !x.featured);

  return (
    <section id="events" className={styles.section}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div>
            <div className={styles.secKicker}>
              <span className="dash" />
              {e.kicker}
            </div>
            <h2 className={styles.secTitle}>{e.title}</h2>
          </div>
          <p className={styles.secLede}>{e.lede}</p>
        </Reveal>

        <div className={styles.eventsTabsRow}>
          <div className={styles.tabs}>
            <button
              type="button"
              className={clsx(styles.etab, tab === 'upcoming' && styles.active)}
              onClick={() => setTab('upcoming')}
            >
              {e.tabs.upcoming} <span className="num">[{e.upcoming.length}]</span>
            </button>
            <button
              type="button"
              className={clsx(styles.etab, tab === 'past' && styles.active)}
              onClick={() => setTab('past')}
            >
              {e.tabs.past} <span className="num">[{e.past.length}]</span>
            </button>
          </div>
        </div>

        {featured && tab === 'upcoming' && (
          <Reveal className={clsx(styles.eventFeatured)}>
            <div className={styles.eventFeaturedLeft}>
              <div className="tag">{featured.type}</div>
              <div className="big-date">
                {featured.d}
                <span className="m">{featured.m}</span>
              </div>
            </div>
            <div className={styles.eventFeaturedRight}>
              <h3>{featured.title}</h3>
              <p>{featured.sub}</p>
              <div className="venue">{featured.venue}</div>
              <a href="#" className={styles.btnPrimary}>
                {featured.cta}
              </a>
            </div>
          </Reveal>
        )}

        <div className={styles.eventsList}>
          {nonFeatured.map((ev, i) => (
            <article
              key={i}
              className={clsx(styles.eventCard, tab === 'past' && styles.past)}
            >
              <div className="date-blk">
                <div className="d">{ev.d}</div>
                <div className="m">{ev.m}</div>
              </div>
              <div>
                <div className="type">{ev.type}</div>
                <h4>{ev.title}</h4>
                <div className="sub">{ev.sub}</div>
                <div className="venue">{ev.venue}</div>
                <div className="cta">{ev.cta}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
