'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v1.module.css';

export function Events() {
  const t = useT().events;
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const list = tab === 'upcoming' ? t.upcoming : t.past;

  return (
    <section id="events" className={styles.events}>
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

        <div className={styles.tabsRow}>
          <div className={styles.tabs}>
            <button
              type="button"
              className={clsx(styles.tab, tab === 'upcoming' && styles.active)}
              onClick={() => setTab('upcoming')}
            >
              {t.tabs.upcoming}
              <span className={styles.tabCount}>{t.upcoming.length}</span>
            </button>
            <button
              type="button"
              className={clsx(styles.tab, tab === 'past' && styles.active)}
              onClick={() => setTab('past')}
            >
              {t.tabs.past}
              <span className={styles.tabCount}>{t.past.length}</span>
            </button>
          </div>
        </div>

        <div className={styles.eventsList}>
          {list.map((ev, i) => (
            <div
              key={i}
              className={clsx(
                styles.event,
                ev.featured && styles.featured,
                tab === 'past' && styles.isPast
              )}
            >
              <div className={styles.eventDate}>
                <div className={clsx('d', 'serif')}>{ev.d}</div>
                <span className="m">{ev.m}</span>
              </div>
              <div className={styles.eventType}>— {ev.type}</div>
              <div className={clsx(styles.eventTitle, 'serif')}>
                {ev.title}
                <span className="sub">{ev.sub}</span>
              </div>
              <div className={styles.eventVenue}>
                <span className="label">— {tab === 'past' ? 'Held at' : 'Venue'}</span>
                {ev.venue.split('\n').map((l, j) => (
                  <div key={j}>{l}</div>
                ))}
              </div>
              <div className={styles.eventCta}>{ev.cta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
