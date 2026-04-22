'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BOARD, COMMITTEE, type Member } from '@/lib/committee';
import styles from '@/styles/variants/v4.module.css';

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
      <div className={styles.secPageNum}>§ III · p.03</div>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div className={styles.secMark}>§ III</div>
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
              <div className={styles.commMedal} aria-hidden="true">
                {m.img}
              </div>
              <div className={styles.commRole}>{m.role}</div>
              <div className={styles.commName}>{m.name}</div>
              <div className={styles.commMeta}>{m.meta}</div>
            </div>
          ))}
        </Reveal>

        <div className={styles.secFoot}>
          <span>
            Footnote<span className={styles.dotSep}> · </span>
            Term 2024–2027 · elected triennially
          </span>
          <span>§ III · Board &amp; Committee · p.03</span>
        </div>
      </div>
    </section>
  );
}
