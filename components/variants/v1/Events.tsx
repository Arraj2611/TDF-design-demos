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
  const isPast = tab === 'past';

  // First upcoming event gets the featured card treatment
  const featured = !isPast ? list.find((ev) => ev.featured) ?? list[0] : null;
  const rest = featured ? list.filter((ev) => ev !== featured) : list;

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

        {/* Featured event card — upcoming only */}
        {featured && (
          <div className={styles.eventFeatCard}>
            <div className={styles.efcDate}>
              <div className={clsx(styles.efcD, 'serif')}>{featured.d}</div>
              <div className={styles.efcM}>{featured.m}</div>
              <div className={styles.efcType}>— {featured.type}</div>
            </div>
            <div className={styles.efcBody}>
              <h3 className={clsx(styles.efcTitle, 'serif')}>
                {featured.title}
                {featured.sub && <span className={styles.efcSub}>{featured.sub}</span>}
              </h3>
              <div className={styles.efcVenue}>
                <span className={styles.efcVenueLabel}>Venue —</span>
                {featured.venue.split('\n').map((l, j) => (
                  <div key={j}>{l}</div>
                ))}
              </div>
              <div className={styles.efcCta}>{featured.cta} →</div>
            </div>
          </div>
        )}

        {/* Remaining / past events — compact cards */}
        {rest.length > 0 && (
          <div className={styles.eventCompactCards}>
            {rest.map((ev, i) => (
              <div key={i} className={clsx(styles.eventCompact, isPast && styles.isPast)}>
                <div className={styles.ecDate}>
                  <div className={clsx(styles.ecD, 'serif')}>{ev.d}</div>
                  <div className={styles.ecM}>{ev.m}</div>
                </div>
                <div className={styles.ecBody}>
                  <div className={styles.ecType}>— {ev.type}</div>
                  <div className={clsx(styles.ecTitle, 'serif')}>{ev.title}</div>
                  <div className={styles.ecVenue}>
                    <span>{isPast ? 'Held at' : 'Venue'} —</span>{' '}
                    {ev.venue.split('\n')[0]}
                  </div>
                  <div className={styles.ecCta}>{ev.cta}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
