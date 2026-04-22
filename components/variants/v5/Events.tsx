'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v5.module.css';

export function Events() {
  const t = useT().events;
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const list = tab === 'upcoming' ? t.upcoming : t.past;

  return (
    <section id="events" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.doubleRule} aria-hidden="true" />
        <div className={styles.sectionInner}>
          <div className={styles.marginL} aria-hidden="true">
            VI
          </div>
          <div className={styles.marginRowMobile}>
            <span>VI</span>
            <span>f. VI</span>
          </div>
          <div className={styles.col}>
            <Reveal className={clsx(styles.secHead)}>
              <div className={styles.secKickerRow}>
                <span className={styles.secKicker}>{t.kicker}</span>
                <span className={styles.secKickerDot} />
                <span className={styles.secKickerNum}>No. {t.num}</span>
              </div>
              <h2 className={styles.secTitle}>{t.title}</h2>
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
                <span className={styles.evCount}>{t.upcoming.length}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'past'}
                className={clsx(styles.evTab, tab === 'past' && styles.active)}
                onClick={() => setTab('past')}
              >
                {t.tabs.past}
                <span className={styles.evCount}>{t.past.length}</span>
              </button>
            </div>

            <Reveal className={clsx(styles.evList)}>
              {list.map((ev, i) => (
                <div
                  key={`${tab}-${i}`}
                  className={clsx(styles.evRow, ev.featured && styles.featured)}
                >
                  <div className={styles.evDate}>
                    <div className={styles.evDateD}>{ev.d}</div>
                    <div className={styles.evDateM}>{ev.m}</div>
                  </div>
                  <div>
                    <div className={styles.evType}>&mdash; {ev.type}</div>
                    <h4 className={styles.evTitle}>{ev.title}</h4>
                    <p className={styles.evSub}>{ev.sub}</p>
                  </div>
                  <div className={styles.evAside}>
                    <div className={styles.evVenue}>{ev.venue}</div>
                    <a href="#contact" className={styles.evCta}>
                      {ev.cta}
                    </a>
                  </div>
                </div>
              ))}
            </Reveal>

            <div className={styles.secFoot}>
              <span className={styles.secFootSign}>
                <span className={styles.secFootMono}>Folio VI</span>
                <span>&mdash; members register free; the wider trade warmly welcomed.</span>
              </span>
              <span className={styles.secFootMono}>
                f. VI &middot; {t.tabs.upcoming}
              </span>
            </div>
          </div>
          <div className={styles.marginR} aria-hidden="true">
            f. VI &middot; Diary of Gatherings
          </div>
        </div>
      </div>
    </section>
  );
}
