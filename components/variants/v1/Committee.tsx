'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BOARD, COMMITTEE, type Member } from '@/lib/committee';
import styles from '@/styles/variants/v1.module.css';

function OrgCard({ m, chief = false }: { m: Member; chief?: boolean }) {
  return (
    <div className={clsx(styles.orgCard, chief && styles.chief)}>
      <div className={styles.orgPortrait}>{m.img}</div>
      <div className={styles.orgRole}>— {m.role}</div>
      <div className={clsx(styles.orgName, 'serif')}>{m.name}</div>
      <div className={styles.orgMeta}>{m.meta}</div>
    </div>
  );
}

export function Committee() {
  const t = useT().committee;
  const [tab, setTab] = useState<'board' | 'committee'>('board');
  const B = BOARD;
  const C = COMMITTEE;

  return (
    <section id="committee" className={styles.committee}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div className={styles.secKicker}>
            <span className="num">— {t.num}</span>
            <span>{t.kicker}</span>
          </div>
          <div>
            <h2 className={clsx(styles.secTitle, 'serif')}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
        </Reveal>

        <div className={styles.tabsRow}>
          <div className={styles.tabs}>
            <button
              type="button"
              className={clsx(styles.tab, tab === 'board' && styles.active)}
              onClick={() => setTab('board')}
            >
              {t.tabs.board}
            </button>
            <button
              type="button"
              className={clsx(styles.tab, tab === 'committee' && styles.active)}
              onClick={() => setTab('committee')}
            >
              {t.tabs.committee}
            </button>
          </div>
          <div className={styles.tabNote}>
            {tab === 'board' ? t.boardNote : t.committeeNote}
          </div>
        </div>

        {tab === 'board' && (
          <div className={styles.org}>
            <div className={styles.orgRow}>
              <OrgCard m={B.chair} chief />
            </div>
            <div className={styles.orgRow}>
              {B.vice.map((m, i) => (
                <OrgCard key={i} m={m} />
              ))}
            </div>
            <div className={clsx(styles.orgRow, styles.wide)}>
              {B.directors.map((m, i) => (
                <OrgCard key={i} m={m} />
              ))}
            </div>
          </div>
        )}

        {tab === 'committee' && (
          <div className={styles.org}>
            <div className={styles.orgRow}>
              <OrgCard m={C.chair} chief />
            </div>
            <div className={styles.orgRow}>
              {C.vice.map((m, i) => (
                <OrgCard key={i} m={m} />
              ))}
            </div>
            <div className={clsx(styles.orgRow, styles.wide)}>
              {C.officers.map((m, i) => (
                <OrgCard key={i} m={m} />
              ))}
            </div>
            <div className={clsx(styles.orgRow, styles.wide)}>
              {C.executive.map((m, i) => (
                <OrgCard key={i} m={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
