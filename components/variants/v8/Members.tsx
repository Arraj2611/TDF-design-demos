'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { MemberTapestry } from './MemberTapestry';
import styles from '@/styles/variants/v8.module.css';

export function Members() {
  const t = useT().members;

  return (
    <section id="members" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.sectionHead}>
          <span className="roman">II</span>
          <span className="label">Membership</span>
          <span className="meta">No. {t.num}</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      <Reveal>
        <div className={styles.memStats}>
          {t.stats.map((s, i) => (
            <div key={i} className={styles.memStatCell}>
              <div className={styles.memStatN}>{s.n}</div>
              <div className={styles.memStatL}>{s.l}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <MemberTapestry />
      </Reveal>

      <Reveal delay={0.08}>
        <div className={styles.memFilters}>
          {t.filters.map((f) => (
            <div key={f.k} className={styles.memFilterCell}>
              <span>{f.l}</span>
              <span className="count">{f.c}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>II &middot; Membership &middot; No. {t.num}</span>
        <span>
          <em>{t.stats[0]?.n}</em> member units &middot; register revised Q2/2026
        </span>
      </div>
    </section>
  );
}
