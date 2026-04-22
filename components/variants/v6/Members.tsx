'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v6.module.css';

export function Members() {
  const t = useT().members;

  return (
    <section id="members" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.partLine}>
          <span className="num">III</span>
          <span>Part Three</span>
          <span className="dot" aria-hidden="true" />
          <span>The Membership</span>
        </div>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <div className={styles.secTitleRule} aria-hidden="true" />
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      <Reveal className={clsx(styles.membersStats)}>
        {t.stats.map((s, i) => (
          <div key={i} className={styles.membersStat}>
            <div className={styles.membersStatN}>{s.n}</div>
            <div className={styles.membersStatL}>{s.l}</div>
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.05}>
        <div className={styles.membersTable} role="table" aria-label="Member register">
          <div className={styles.membersTableHead} role="row">
            <span>Folio</span>
            <span>Mark</span>
            <span>Name of Unit</span>
            <span className="hideM">Discipline</span>
            <span>Class</span>
          </div>
          {t.logos.map((lg) => (
            <div key={lg.id} className={styles.membersRow} role="row">
              <div className={styles.membersRowId}>{lg.id}</div>
              <div className={styles.membersRowM}>{lg.m}</div>
              <div className={styles.membersRowN}>{lg.n}</div>
              <div className={styles.membersRowC}>{lg.c}</div>
              <div className={styles.membersRowK}>{lg.k}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>Part III &middot; No. {t.num} &middot; Roll of Units</span>
        <span><em>{t.stats[0]?.n}</em> active units &middot; register revised Q2/2026</span>
      </div>
    </section>
  );
}
