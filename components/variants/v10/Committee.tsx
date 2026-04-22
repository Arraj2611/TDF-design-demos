'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BOARD, COMMITTEE, type Member } from '@/lib/committee';
import styles from '@/styles/variants/v10.module.css';

type Tab = 'board' | 'committee';

export function Committee() {
  const t = useT().committee;
  const [tab, setTab] = useState<Tab>('board');

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
    <section id="committee" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <div>
            <div className={styles.secKicker}>{t.kicker}</div>
            <h2 className={styles.secTitle}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
          <div className={styles.secNum}>03 / 08</div>
        </div>
      </Reveal>

      <div className={styles.commTabs} role="tablist" aria-label="Board & Committee view">
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
      <p className={styles.commNote}>
        {tab === 'board' ? t.boardNote : t.committeeNote}
      </p>

      <Reveal delay={0.04}>
        <div
          className={styles.commTable}
          role="table"
          aria-label={tab === 'board' ? t.tabs.board : t.tabs.committee}
        >
          {rows.map((m, i) => (
            <div
              key={`${tab}-${m.name}-${i}`}
              role="row"
              className={styles.commRow}
            >
              <div className={styles.commRowInit} aria-hidden="true">{m.img}</div>
              <div>
                <div className={styles.commRowRole}>{m.role}</div>
                <div className={styles.commRowName}>{m.name}</div>
                <div className={styles.commRowMeta}>{m.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
