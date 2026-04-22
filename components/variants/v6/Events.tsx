'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v6.module.css';

export function Events() {
  const t = useT().events;
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const list = tab === 'upcoming' ? t.upcoming : t.past;

  return (
    <section id="events" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.partLine}>
          <span className="num">VII</span>
          <span>Part Seven</span>
          <span className="dot" aria-hidden="true" />
          <span>Proceedings Calendar</span>
        </div>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <div className={styles.secTitleRule} aria-hidden="true" />
        <p className={styles.secLede}>{t.lede}</p>
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
          <span className="count">{t.upcoming.length}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'past'}
          className={clsx(styles.evTab, tab === 'past' && styles.active)}
          onClick={() => setTab('past')}
        >
          {t.tabs.past}
          <span className="count">{t.past.length}</span>
        </button>
      </div>

      <Reveal>
        <div className={styles.evTable} role="table" aria-label={tab === 'upcoming' ? t.tabs.upcoming : t.tabs.past}>
          {list.map((ev, i) => (
            <div
              key={`${tab}-${i}`}
              className={clsx(styles.evRow, ev.featured && styles.featured)}
              role="row"
            >
              <div className={styles.evDate}>
                <div className={styles.evDateD}>{ev.d}</div>
                <div className={styles.evDateM}>{ev.m}</div>
              </div>
              <div className={styles.evType}>{ev.type}</div>
              <div>
                <h4 className={styles.evTitle}>{ev.title}</h4>
                <p className={styles.evSub}>{ev.sub}</p>
              </div>
              <div className={styles.evVenue}>{ev.venue}</div>
              <a href="#contact" className={styles.evCta}>
                {ev.cta}
              </a>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>Part VII &middot; No. {t.num} &middot; Proceedings Calendar</span>
        <span>Members register <em>free</em> &middot; trade warmly welcomed</span>
      </div>
    </section>
  );
}
