'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v5.module.css';

export function Members() {
  const t = useT().members;
  return (
    <section id="members" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.doubleRule} aria-hidden="true" />
        <div className={styles.sectionInner}>
          <div className={styles.marginL} aria-hidden="true">
            II
          </div>
          <div className={styles.marginRowMobile}>
            <span>II</span>
            <span>f. II</span>
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

            <Reveal className={clsx(styles.membersStats)}>
              {t.stats.map((s, i) => (
                <div key={i} className={styles.membersStat}>
                  <div className={styles.membersStatN}>{s.n}</div>
                  <div className={styles.membersStatL}>{s.l}</div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.05} className={clsx(styles.logoGrid)}>
              {t.logos.map((lg) => (
                <div key={lg.id} className={styles.logoCell}>
                  <div className={styles.logoId}>{lg.id}</div>
                  <div className={styles.logoMark}>{lg.m}</div>
                  <div className={styles.logoName}>{lg.n}</div>
                  <div className={styles.logoCat}>{lg.c}</div>
                </div>
              ))}
            </Reveal>

            <div className={styles.secFoot}>
              <span className={styles.secFootSign}>
                <span className={styles.secFootMono}>Folio II</span>
                <span>&mdash; {t.stats[0]?.l ?? ''}.</span>
              </span>
              <span className={styles.secFootMono}>
                f. II &middot; Members of the Foundation
              </span>
            </div>
          </div>
          <div className={styles.marginR} aria-hidden="true">
            f. II &middot; Roll of Members
          </div>
        </div>
      </div>
    </section>
  );
}
