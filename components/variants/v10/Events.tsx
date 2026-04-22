'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v10.module.css';

type Tab = 'upcoming' | 'past';

export function Events() {
  const t = useT().events;
  const [tab, setTab] = useState<Tab>('upcoming');
  const list = tab === 'upcoming' ? t.upcoming : t.past;

  return (
    <section id="events" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <div>
            <div className={styles.secKicker}>{t.kicker}</div>
            <h2 className={styles.secTitle}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
          <div className={styles.secNum}>06 / 08</div>
        </div>
      </Reveal>

      <div className={styles.evTabs} role="tablist" aria-label="Events view">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'upcoming'}
          className={clsx(styles.evTab, tab === 'upcoming' && styles.active)}
          onClick={() => setTab('upcoming')}
        >
          {t.tabs.upcoming}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'past'}
          className={clsx(styles.evTab, tab === 'past' && styles.active)}
          onClick={() => setTab('past')}
        >
          {t.tabs.past}
        </button>
      </div>

      <Reveal delay={0.04}>
        <div
          className={styles.evList}
          role="table"
          aria-label={tab === 'upcoming' ? t.tabs.upcoming : t.tabs.past}
        >
          {list.map((ev, i) => (
            <div
              key={`${tab}-${i}`}
              role="row"
              className={clsx(styles.evRow, ev.featured && styles.featured)}
            >
              <div>
                <span className={styles.evDateD}>{ev.d}</span>
                <span className={styles.evDateM}>{ev.m}</span>
              </div>
              <div>
                <div className={styles.evType}>{ev.type}</div>
                <h4 className={styles.evTitle}>{ev.title}</h4>
                <p className={styles.evSub}>{ev.sub}</p>
              </div>
              <div className={styles.evVenueBlock}>
                <div className={styles.evVenue}>{ev.venue}</div>
                <a href="#contact" className={styles.evCta}>{ev.cta}</a>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
