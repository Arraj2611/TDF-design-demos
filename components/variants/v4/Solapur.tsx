'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v4.module.css';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export function Solapur() {
  const t = useT().solapur;
  return (
    <section id="solapur" className={styles.section}>
      <div className={styles.secPageNum}>§ VII · p.07</div>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div className={styles.secMark}>§ VII</div>
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

        <div className={styles.solGrid}>
          <Reveal className={clsx(styles.solParas)}>
            {t.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.08} className={clsx(styles.solFacts)}>
            {t.facts.map((f, i) => (
              <div key={i} className={styles.solFactRow}>
                <div className={styles.solFactIdx}>{ROMAN[i] ?? String(i + 1)}</div>
                <div className={styles.solFactL}>{f.l}</div>
                <div className={styles.solFactN}>{f.n}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.06} className={clsx(styles.solHighlights)}>
          {t.highlights.map((h, i) => (
            <div key={i} className={styles.solHl}>
              <div className={styles.solHlK}>— {h.k}</div>
              <div className={styles.solHlV}>{h.v}</div>
            </div>
          ))}
        </Reveal>

        <div className={styles.secFoot}>
          <span>
            Footnote<span className={styles.dotSep}> · </span>
            {t.facts[0]?.l ?? ''}: {t.facts[0]?.n ?? ''}
          </span>
          <span>§ VII · About Solapur · p.07</span>
        </div>
      </div>
    </section>
  );
}
