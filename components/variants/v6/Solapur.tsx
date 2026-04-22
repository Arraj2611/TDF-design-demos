'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { FigThreadCount } from './FigThreadCount';
import styles from '@/styles/variants/v6.module.css';

const IDX = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'];

export function Solapur() {
  const t = useT().solapur;

  return (
    <section id="solapur" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.partLine}>
          <span className="num">VIII</span>
          <span>Part Eight</span>
          <span className="dot" aria-hidden="true" />
          <span>The City</span>
        </div>
        <h2 className={styles.secTitle}>{t.title}</h2>
        <div className={styles.secTitleRule} aria-hidden="true" />
        <p className={styles.secLede}>{t.lede}</p>
      </Reveal>

      <div className={styles.solGrid}>
        <Reveal className={clsx(styles.solFigCol)}>
          <div className={styles.solFig}>
            <FigThreadCount />
          </div>
          <span className={styles.figCap}>
            <span className="fignum">FIG. 5</span>
            <span className="figtitle">Thread-count tile &middot; plain weave magnification</span>
          </span>

          <div className={styles.solFacts}>
            {t.facts.map((f, i) => (
              <div key={i} className={styles.solFactRow}>
                <div className={styles.solFactIdx}>{IDX[i] ?? String(i + 1)}</div>
                <div className={styles.solFactL}>{f.l}</div>
                <div className={styles.solFactN}>{f.n}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08} className={clsx(styles.solBody)}>
          {t.paras.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
      </div>

      <Reveal delay={0.06}>
        <div className={styles.solHighlights}>
          {t.highlights.map((h, i) => (
            <div key={i} className={styles.solHl}>
              <div className={styles.solHlK}>{h.k}</div>
              <div className={styles.solHlV}>{h.v}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>Part VIII &middot; No. {t.num} &middot; The City</span>
        <span>
          <em>{t.facts[0]?.l}</em> &middot; {t.facts[0]?.n}
        </span>
      </div>
    </section>
  );
}
