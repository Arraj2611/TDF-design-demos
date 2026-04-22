'use client';

import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v3.module.css';

export function Facilities() {
  const f = useT().facilities;
  return (
    <section id="facilities" className={styles.section}>
      <div className={styles.sectionRule} />
      <Reveal>
        <div className={styles.secHead}>
          <p className={styles.kicker}>{f.kicker}</p>
          <span className={styles.secNum}>№ {f.num}</span>
        </div>
        <h2 className={styles.secTitle}>{f.title}</h2>
        <p className={styles.secLede}>{f.lede}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <div className={styles.facList}>
          {f.items.map((it, i) => (
            <div key={i} className={styles.facRow}>
              <div className={styles.num}>{it.num}</div>
              <div>
                <div className={styles.fname}>{it.name}</div>
                <div className={styles.ftag}>{it.tag}</div>
              </div>
              <div className={styles.fdesc}>{it.desc}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
