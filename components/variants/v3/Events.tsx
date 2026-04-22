'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v3.module.css';

export function Events() {
  const e = useT().events;
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const list = tab === 'upcoming' ? e.upcoming : e.past;
  const featured = list.find((x) => x.featured);
  const rest = list.filter((x) => !x.featured);

  return (
    <section id="events" className={styles.section}>
      <div className={styles.sectionRule} />
      <Reveal>
        <div className={styles.secHead}>
          <p className={styles.kicker}>{e.kicker}</p>
          <span className={styles.secNum}>№ {e.num}</span>
        </div>
        <h2 className={styles.secTitle}>{e.title}</h2>
        <p className={styles.secLede}>{e.lede}</p>
      </Reveal>
      <div className={styles.commTabs}>
        <button
          type="button"
          onClick={() => setTab('upcoming')}
          className={clsx(styles.commTab, tab === 'upcoming' && styles.active)}
        >
          {e.tabs.upcoming}
        </button>
        <button
          type="button"
          onClick={() => setTab('past')}
          className={clsx(styles.commTab, tab === 'past' && styles.active)}
        >
          {e.tabs.past}
        </button>
      </div>
      {featured && tab === 'upcoming' && (
        <Reveal delay={0.05}>
          <div className={styles.eventFeatured}>
            <div className={styles.bigDate}>
              {featured.d}
              <span className={styles.m}>{featured.m}</span>
            </div>
            <div>
              <div className={styles.type}>{featured.type}</div>
              <h3>{featured.title}</h3>
              <p>{featured.sub}</p>
              <div className={styles.venue}>{featured.venue}</div>
              <span className={styles.newsFeatureTag}>{featured.cta}</span>
            </div>
          </div>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <div className={styles.eventsList}>
          {rest.map((ev, i) => (
            <div key={`${tab}-${i}`} className={styles.eventRow}>
              <div className={styles.date}>
                {ev.d}
                <span className={styles.m}>{ev.m}</span>
              </div>
              <div>
                <div className={styles.type}>{ev.type}</div>
                <h4>{ev.title}</h4>
                <p>{ev.sub}</p>
              </div>
              <div className={styles.venue}>{ev.venue}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
