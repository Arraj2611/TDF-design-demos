'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BOARD, COMMITTEE, type Member } from '@/lib/committee';
import styles from '@/styles/variants/v3.module.css';

export function Committee() {
  const c = useT().committee;
  const [tab, setTab] = useState<'board' | 'committee'>('board');

  const people: Member[] =
    tab === 'board'
      ? [BOARD.chair, ...BOARD.vice, ...BOARD.directors]
      : [COMMITTEE.chair, ...COMMITTEE.vice, ...COMMITTEE.officers, ...COMMITTEE.executive];

  return (
    <section id="committee" className={styles.section}>
      <div className={styles.sectionRule} />
      <Reveal>
        <div className={styles.secHead}>
          <p className={styles.kicker}>{c.kicker}</p>
          <span className={styles.secNum}>№ {c.num}</span>
        </div>
        <h2 className={styles.secTitle}>{c.title}</h2>
        <p className={styles.secLede}>{c.lede}</p>
      </Reveal>
      <div className={styles.commTabs}>
        <button
          type="button"
          onClick={() => setTab('board')}
          className={clsx(styles.commTab, tab === 'board' && styles.active)}
        >
          {c.tabs.board}
        </button>
        <button
          type="button"
          onClick={() => setTab('committee')}
          className={clsx(styles.commTab, tab === 'committee' && styles.active)}
        >
          {c.tabs.committee}
        </button>
      </div>
      <Reveal delay={0.05}>
        <div className={styles.commGrid}>
          {people.map((p, i) => (
            <div key={`${tab}-${i}`} className={styles.commCard}>
              <div className={styles.initials}>{p.img}</div>
              <div className={styles.role}>{p.role}</div>
              <div className={styles.name}>{p.name}</div>
              <div className={styles.meta}>{p.meta}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
