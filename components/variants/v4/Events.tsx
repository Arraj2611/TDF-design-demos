'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v4.module.css';

export function Events() {
  const t = useT().events;
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const list = tab === 'upcoming' ? t.upcoming : t.past;

  return (
    <section id="events" className={styles.section}>
      <div className={styles.secPageNum}>§ VI · p.06</div>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div className={styles.secMark}>§ VI</div>
          <div>
            <div className={styles.secKickerRow}>
              <span className={styles.secKicker}>{t.kicker}</span>
              <span className={styles.secKickerDot} />
              <span className={styles.secKickerNum}>№ {t.num}</span>
            </div>
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
            <span className={styles.evTabCount}>{t.upcoming.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'past'}
            className={clsx(styles.evTab, tab === 'past' && styles.active)}
            onClick={() => setTab('past')}
          >
            {t.tabs.past}
            <span className={styles.evTabCount}>{t.past.length}</span>
          </button>
        </div>

        <Reveal className={clsx(styles.evList)}>
          {list.map((ev, i) => (
            <div
              key={`${tab}-${i}`}
              className={clsx(styles.evRow, ev.featured && styles.featured)}
            >
              <div className={styles.evDate}>
                <div className={styles.evDateM}>{ev.m}</div>
                <div className={styles.evDateD}>{ev.d}</div>
              </div>
              <div className={styles.evMain}>
                <div className={styles.evType}>— {ev.type}</div>
                <h4 className={styles.evTitle}>{ev.title}</h4>
                <p className={styles.evSub}>{ev.sub}</p>
              </div>
              <div className={styles.evAside}>
                <div className={styles.evAsideVenue}>{ev.venue}</div>
                <a href="#contact" className={styles.evCta}>
                  {ev.cta}
                </a>
              </div>
            </div>
          ))}
        </Reveal>

        <div className={styles.secFoot}>
          <span>
            Footnote<span className={styles.dotSep}> · </span>
            Members register free · public warmly welcomed
          </span>
          <span>§ VI · Events · p.06</span>
        </div>
      </div>
    </section>
  );
}
