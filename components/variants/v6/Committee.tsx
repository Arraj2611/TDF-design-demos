'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BOARD, COMMITTEE, type Member } from '@/lib/committee';
import styles from '@/styles/variants/v6.module.css';

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

  const prefix = tab === 'board' ? 'A' : 'B';

  return (
    <section id="committee" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.partLine}>
          <span className="num">IV</span>
          <span>Part Four</span>
          <span className="dot" aria-hidden="true" />
          <span>The Board</span>
        </div>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <div className={styles.secTitleRule} aria-hidden="true" />
        <p className={styles.secLede}>{t.lede}</p>
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
      <p className={styles.commTabNote}>
        {tab === 'board' ? t.boardNote : t.committeeNote}
      </p>

      <Reveal>
        <div className={styles.commTable} role="table" aria-label={tab === 'board' ? t.tabs.board : t.tabs.committee}>
          <div className={styles.commTableHead} role="row">
            <span>Ref.</span>
            <span>Init.</span>
            <span>Office</span>
            <span>Name</span>
            <span className="hideM">Appointment note</span>
          </div>
          {rows.map((m, i) => (
            <div
              key={`${tab}-${m.name}-${i}`}
              className={clsx(styles.commRow, i === 0 && styles.chief)}
              role="row"
            >
              <div className={styles.commRowNo}>{prefix}.{i + 1}</div>
              <div className={styles.commRowInit} aria-hidden="true">{m.img}</div>
              <div className={styles.commRowRole}>{m.role}</div>
              <div className={styles.commRowName}>{m.name}</div>
              <div className={styles.commRowMeta}>{m.meta}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>Part IV &middot; No. {t.num} &middot; Roster of Office</span>
        <span>
          Current term <em>2024–2027</em> &middot; {rows.length} positions
        </span>
      </div>
    </section>
  );
}
