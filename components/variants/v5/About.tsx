'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { WaxSeal } from './WaxSeal';
import { GrantScroll } from './GrantScroll';
import styles from '@/styles/variants/v5.module.css';

export function About() {
  const t = useT().about;

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.doubleRule} aria-hidden="true" />
        <div className={styles.sectionInner}>
          <div className={styles.marginL} aria-hidden="true">
            I
          </div>
          <div className={styles.marginRowMobile}>
            <span>I</span>
            <span>f. I</span>
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

            <div className={styles.aboutGrid}>
              <Reveal className={clsx(styles.aboutBody)}>
                {t.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </Reveal>
              <Reveal delay={0.08} className={clsx(styles.aboutSide)}>
                <div className={styles.aboutSideHead}>
                  &mdash; {t.sidebar.title}
                </div>
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

            <Reveal className={clsx(styles.aboutTimelineHead)} delay={0.04}>
              <div className={styles.aboutTimelineTitle}>{t.timelineTitle}</div>
              <div className={styles.aboutTimelineMeta}>{t.timelineMeta}</div>
            </Reveal>

            <GrantScroll>
              <div className={styles.timelineList}>
                {t.timeline.map((row, i) => (
                  <div
                    key={`${row.y}-${i}`}
                    className={clsx(
                      styles.timelineRow,
                      row.a && styles.anchor
                    )}
                  >
                    <div className={styles.timelineY}>{row.y}</div>
                    <div className={styles.timelineC}>{row.c}</div>
                    <div className={styles.timelineT}>{row.t}</div>
                    <div className={styles.timelineSeal}>
                      {row.a ? (
                        <WaxSeal
                          size={22}
                          monogram="T"
                          title={`Anchor entry — ${row.y}`}
                        />
                      ) : (
                        <span className={styles.timelineSealPlaceholder} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GrantScroll>

            <div className={styles.secFoot}>
              <span className={styles.secFootSign}>
                <span className={styles.secFootMono}>Folio I</span>
                <span>&mdash; {t.kicker.toLowerCase()}, recorded in the ledger of the Foundation.</span>
              </span>
              <span className={styles.secFootMono}>
                f. I &middot; {t.timeline[0]?.y} &mdash; {t.timeline[t.timeline.length - 1]?.y}
              </span>
            </div>
          </div>
          <div className={styles.marginR} aria-hidden="true">
            f. I &middot; About the Foundation
          </div>
        </div>
      </div>
    </section>
  );
}
