'use client';

import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v3.module.css';
import { WarpWeftGrid } from './WarpWeftGrid';
import { DropCap } from './DropCap';

export function About() {
  const a = useT().about;
  return (
    <section id="about" className={styles.section}>
      <WarpWeftGrid />
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
        <div className={styles.aboutBody}>
          {a.body.map((p, i) => {
            if (i === 0 && p.length > 1) {
              const first = p.charAt(0);
              const rest = p.slice(1);
              return (
                <p key={i}>
                  <DropCap letter={first} />
                  {rest}
                </p>
              );
            }
            return <p key={i}>{p}</p>;
          })}
        </div>
      </Reveal>
    </section>
  );
}
