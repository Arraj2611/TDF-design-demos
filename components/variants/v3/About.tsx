'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v3.module.css';

export function About() {
  const a = useT().about;
  return (
    <section id="about" className={styles.section}>
      <div className={styles.sectionRule} />
      <Reveal>
        <div className={styles.secHead}>
          <p className={styles.kicker}>{a.kicker}</p>
          <span className={styles.secNum}>№ {a.num}</span>
        </div>
        <h2 className={styles.secTitle}>{a.title}</h2>
        <p className={styles.secLede}>{a.lede}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <div className={clsx(styles.aboutBody, styles.dropcapParent)}>
          {a.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
