'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v4.module.css';

export function Members() {
  const t = useT().members;
  return (
    <section id="members" className={styles.section}>
      <div className={styles.secPageNum}>§ II · p.02</div>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div className={styles.secMark}>§ II</div>
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

        <Reveal className={clsx(styles.membersStats)}>
          {t.stats.map((s, i) => (
            <div key={i} className={styles.membersStat}>
              <div className={styles.membersStatN}>{s.n}</div>
              <div className={styles.membersStatL}>{s.l}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.06} className={clsx(styles.logoGrid)}>
          {t.logos.map((lg) => (
            <div key={lg.id} className={styles.logoCell}>
              <div className={styles.logoId}>{lg.id}</div>
              <div className={styles.logoMark}>{lg.m}</div>
              <div>
                <div className={styles.logoName}>{lg.n}</div>
                <div className={styles.logoCat}>{lg.c}</div>
              </div>
            </div>
          ))}
        </Reveal>

        <div className={styles.secFoot}>
          <span>
            Footnote<span className={styles.dotSep}> · </span>
            {t.stats[0]?.l ?? ''}
          </span>
          <span>§ II · Members · p.02</span>
        </div>
      </div>
    </section>
  );
}
