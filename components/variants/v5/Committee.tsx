'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BOARD, COMMITTEE, type Member } from '@/lib/committee';
import styles from '@/styles/variants/v5.module.css';

export function Committee() {
  const t = useT().committee;
  const [tab, setTab] = useState<'board' | 'committee'>('board');

  const rows: Member[] = useMemo(() => {
    if (tab === 'board') {
      return [BOARD.chair, ...BOARD.vice, ...BOARD.directors];
    }
    return [
      COMMITTEE.chair,
      ...COMMITTEE.vice,
      ...COMMITTEE.officers,
      ...COMMITTEE.executive,
    ];
  }, [tab]);

  return (
    <section id="committee" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.doubleRule} aria-hidden="true" />
        <div className={styles.sectionInner}>
          <div className={styles.marginL} aria-hidden="true">
            III
          </div>
          <div className={styles.marginRowMobile}>
            <span>III</span>
            <span>f. III</span>
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

            <div className={styles.commTabs} role="tablist" aria-label="Committee view">
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'board'}
                className={clsx(styles.commTab, tab === 'board' && styles.active)}
                onClick={() => setTab('board')}
              >
                {t.tabs.board}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'committee'}
                className={clsx(styles.commTab, tab === 'committee' && styles.active)}
                onClick={() => setTab('committee')}
              >
                {t.tabs.committee}
              </button>
            </div>
            <p className={styles.commTabNote}>
              {tab === 'board' ? t.boardNote : t.committeeNote}
            </p>

            <Reveal className={clsx(styles.commRoster)}>
              {rows.map((m, i) => (
                <div
                  key={`${tab}-${m.name}-${i}`}
                  className={clsx(styles.commRow, i === 0 && styles.chief)}
                >
                  <div className={styles.commNo}>
                    {String(i + 1).padStart(3, '0')}
                  </div>
                  <div className={styles.commInit} aria-hidden="true">
                    {m.img}
                  </div>
                  <div className={styles.commRole}>{m.role}</div>
                  <div className={styles.commName}>{m.name}</div>
                  <div className={styles.commMeta}>{m.meta}</div>
                </div>
              ))}
            </Reveal>

            <div className={styles.secFoot}>
              <span className={styles.secFootSign}>
                <span className={styles.secFootMono}>Folio III</span>
                <span>&mdash; elected for the term 2024&ndash;2027.</span>
              </span>
              <span className={styles.secFootMono}>
                f. III &middot; Board &amp; Committee
              </span>
            </div>
          </div>
          <div className={styles.marginR} aria-hidden="true">
            f. III &middot; Roster of Office
          </div>
        </div>
      </div>
    </section>
  );
}
