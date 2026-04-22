'use client';

import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v3.module.css';

export function Solapur() {
  const s = useT().solapur;
  return (
    <section id="solapur" className={styles.section}>
      <div className={styles.sectionRule} />
      <Reveal>
        <div className={styles.secHead}>
          <p className={styles.kicker}>{s.kicker}</p>
          <span className={styles.secNum}>№ {s.num}</span>
        </div>
        <h2 className={styles.secTitle}>{s.title}</h2>
        <p className={styles.secLede}>{s.lede}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <div className={styles.solapurGrid}>
          <div className={styles.solapurParas}>
            {s.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className={styles.solapurFacts}>
            {s.facts.map((f, i) => (
              <div key={i} className={styles.f}>
                <div className={styles.v}>{f.n}</div>
                <span className={styles.l}>{f.l}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className={styles.solapurHighlights}>
          {s.highlights.map((h, i) => (
            <div key={i} className={styles.hi}>
              <div className={styles.k}>{h.k}</div>
              <div className={styles.v}>{h.v}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
