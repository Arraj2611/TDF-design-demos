'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BinaryStrip } from './BinaryStrip';
import styles from '@/styles/variants/v9.module.css';

// Hand-tuned binary pattern for Section VI.
const PATTERN: readonly (0 | 1)[] = [0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1];

type Tab = 'upcoming' | 'past';

export function Events() {
  const t = useT().events;
  const [tab, setTab] = useState<Tab>('upcoming');
  const list = tab === 'upcoming' ? t.upcoming : t.past;

  return (
    <section id="events" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <BinaryStrip roman="VI" pattern={PATTERN} label={`No. ${t.num}`} />
          <h2 className={styles.secTitle}>{t.title}</h2>
          <p className={styles.secLede}>{t.lede}</p>
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
          <span className={styles.evTabCount}>({t.upcoming.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'past'}
          className={clsx(styles.evTab, tab === 'past' && styles.active)}
          onClick={() => setTab('past')}
        >
          {t.tabs.past}
          <span className={styles.evTabCount}>({t.past.length})</span>
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
              <div className={styles.evDate}>
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

      <div className={styles.secFoot}>
        <span>VI &middot; Proceedings &middot; No. {t.num}</span>
        <span>Members register <em>free</em> &middot; trade warmly welcomed</span>
      </div>
    </section>
  );
}
