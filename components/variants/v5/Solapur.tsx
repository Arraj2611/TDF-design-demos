'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v5.module.css';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export function Solapur() {
  const t = useT().solapur;
  return (
    <section id="solapur" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.doubleRule} aria-hidden="true" />
        <div className={styles.sectionInner}>
          <div className={styles.marginL} aria-hidden="true">
            VII
          </div>
          <div className={styles.marginRowMobile}>
            <span>VII</span>
            <span>f. VII</span>
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

            <div className={styles.solGrid}>
              <Reveal className={clsx(styles.solParas)}>
                {t.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </Reveal>
              <Reveal delay={0.08} className={clsx(styles.solFacts)}>
                {t.facts.map((f, i) => (
                  <div key={i} className={styles.solFactRow}>
                    <div className={styles.solFactIdx}>
                      {ROMAN[i] ?? String(i + 1)}
                    </div>
                    <div className={styles.solFactL}>{f.l}</div>
                    <div className={styles.solFactN}>{f.n}</div>
                  </div>
                ))}
              </Reveal>
            </div>

            <Reveal delay={0.06} className={clsx(styles.solHighlights)}>
              {t.highlights.map((h, i) => (
                <div key={i} className={styles.solHl}>
                  <div className={styles.solHlK}>&mdash; {h.k}</div>
                  <div className={styles.solHlV}>{h.v}</div>
                </div>
              ))}
            </Reveal>

            <div className={styles.secFoot}>
              <span className={styles.secFootSign}>
                <span className={styles.secFootMono}>Folio VII</span>
                <span>&mdash; {t.facts[0]?.l.toLowerCase()}: {t.facts[0]?.n}.</span>
              </span>
              <span className={styles.secFootMono}>
                f. VII &middot; City of Chaddars &amp; Towels
              </span>
            </div>
          </div>
          <div className={styles.marginR} aria-hidden="true">
            f. VII &middot; Of the Textile City
          </div>
        </div>
      </div>
    </section>
  );
}
