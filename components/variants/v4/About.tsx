'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v4.module.css';

export function About() {
  const t = useT().about;
  return (
    <section id="about" className={styles.section}>
      <div className={styles.secPageNum}>§ I · p.01</div>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div className={styles.secMark}>§ I</div>
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

        <div className={styles.aboutGrid}>
          <div className={styles.aboutSpacer} />
          <Reveal className={clsx(styles.aboutBody)}>
            {t.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.08} className={clsx(styles.aboutSide)}>
            <div className={styles.aboutSideHead}>— {t.sidebar.title}</div>
            <div className={styles.aboutSideList}>
              {t.sidebar.items.map((it, i) => (
                <div key={i} className={styles.aboutSideItem}>
                  <div className={styles.aboutSideYear}>{it.y}</div>
                  <div className={styles.aboutSideText}>{it.t}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className={styles.secFoot}>
          <span>
            Footnote<span className={styles.dotSep}> · </span>
            Timeline: {t.timeline[0]?.y ?? ''} — {t.timeline[t.timeline.length - 1]?.y ?? ''}
          </span>
          <span>§ I · About TDF · p.01</span>
        </div>
      </div>
    </section>
  );
}
