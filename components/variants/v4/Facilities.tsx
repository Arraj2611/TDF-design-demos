'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v4.module.css';

// Roman numerals up to 'e' (five facility items)
const ROMAN: Record<string, string> = {
  a: 'I',
  b: 'II',
  c: 'III',
  d: 'IV',
  e: 'V',
};

export function Facilities() {
  const t = useT().facilities;
  return (
    <section id="facilities" className={styles.section}>
      <div className={styles.secPageNum}>§ IV · p.04</div>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div className={styles.secMark}>§ IV</div>
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

        <Reveal className={clsx(styles.facGrid)}>
          {t.items.map((f) => (
            <article key={f.num} className={styles.facCard}>
              <div className={styles.facHead}>
                <div className={styles.facNum}>{ROMAN[f.num] ?? f.num}</div>
                <div />
                <div className={styles.facTag}>{f.tag}</div>
              </div>
              <h3 className={styles.facName}>{f.name}</h3>
              <p className={styles.facDesc}>{f.desc}</p>
              <div className={styles.facRule} aria-hidden="true" />
              <div className={styles.facStats}>
                {f.stats.map((s, i) => (
                  <div key={i} className={styles.facStat}>
                    <div className={styles.facStatN}>{s.n}</div>
                    <div className={styles.facStatL}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div className={styles.facTests}>
                <div className={styles.facTestsHead}>— Services</div>
                {f.tests.map((x, i) => (
                  <div key={i} className={styles.facTest}>
                    {x}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </Reveal>

        <div className={styles.secFoot}>
          <span>
            Footnote<span className={styles.dotSep}> · </span>
            {t.items[0]?.stats[0]?.l ?? ''}: {t.items[0]?.stats[0]?.n ?? ''}
          </span>
          <span>§ IV · Facilities · p.04</span>
        </div>
      </div>
    </section>
  );
}
