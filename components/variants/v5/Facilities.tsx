'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v5.module.css';

// Map facility letter codes (a..e) to Roman numerals, fall back to value.
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
      <div className={styles.container}>
        <div className={styles.doubleRule} aria-hidden="true" />
        <div className={styles.sectionInner}>
          <div className={styles.marginL} aria-hidden="true">
            IV
          </div>
          <div className={styles.marginRowMobile}>
            <span>IV</span>
            <span>f. IV</span>
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

            <Reveal className={clsx(styles.facList)}>
              {t.items.map((f) => (
                <article key={f.num} className={styles.facRow}>
                  <div className={styles.facRom} aria-hidden="true">
                    {ROMAN[f.num] ?? f.num}
                  </div>
                  <div className={styles.facMain}>
                    <div className={styles.facTag}>&mdash; {f.tag}</div>
                    <h3 className={styles.facName}>{f.name}</h3>
                    <p className={styles.facDesc}>{f.desc}</p>
                    <div className={styles.facTests}>
                      {f.tests.map((x, i) => (
                        <span key={i}>
                          {x}
                          {i < f.tests.length - 1 ? ' · ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.facStats}>
                    {f.stats.map((s, i) => (
                      <div key={i} className={styles.facStatRow}>
                        <div className={styles.facStatN}>{s.n}</div>
                        <div className={styles.facStatL}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </Reveal>

            <div className={styles.secFoot}>
              <span className={styles.secFootSign}>
                <span className={styles.secFootMono}>Folio IV</span>
                <span>&mdash; {t.kicker.toLowerCase()} maintained on a shared campus.</span>
              </span>
              <span className={styles.secFootMono}>
                f. IV &middot; {t.items.length} centres in one campus
              </span>
            </div>
          </div>
          <div className={styles.marginR} aria-hidden="true">
            f. IV &middot; Of the Shared Campus
          </div>
        </div>
      </div>
    </section>
  );
}
