'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BOARD, COMMITTEE, type Member } from '@/lib/committee';
import styles from '@/styles/variants/v2.module.css';

export function Committee() {
  const c = useT().committee;
  const [tab, setTab] = useState<'board' | 'committee'>('board');

  const people: Member[] =
    tab === 'board'
      ? [BOARD.chair, ...BOARD.vice, ...BOARD.directors]
      : [COMMITTEE.chair, ...COMMITTEE.vice, ...COMMITTEE.officers, ...COMMITTEE.executive];

  return (
    <section id="committee" className={clsx(styles.section, styles.sectionDark)}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div>
            <div className={styles.secKicker}>
              <span className="dash" />
              {c.kicker}
            </div>
            <h2 className={styles.secTitle}>{c.title}</h2>
          </div>
          <p className={styles.secLede}>{c.lede}</p>
        </Reveal>

        <div className={styles.tabsRow}>
          <div className={styles.tabs}>
            <button
              type="button"
              className={clsx(styles.tab, tab === 'board' && styles.active)}
              onClick={() => setTab('board')}
            >
              {c.tabs.board}
            </button>
            <button
              type="button"
              className={clsx(styles.tab, tab === 'committee' && styles.active)}
              onClick={() => setTab('committee')}
            >
              {c.tabs.committee}
            </button>
          </div>
          <div className={styles.tabNote}>
            {tab === 'board' ? c.boardNote : c.committeeNote}
          </div>
        </div>

        <div className={styles.peopleGrid}>
          {people.map((p, i) => (
            <div key={i} className={clsx(styles.person, i === 0 && styles.chief)}>
              <div className="portrait">{p.img}</div>
              <div className="role">{p.role}</div>
              <div className="name">{p.name}</div>
              <div className="meta">{p.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
