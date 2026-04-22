'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v2.module.css';

export function About() {
  const a = useT().about;
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div>
            <div className={styles.secKicker}>
              <span className="dash" />
              {a.kicker}
            </div>
            <h2 className={styles.secTitle}>{a.title}</h2>
          </div>
          <p className={styles.secLede}>{a.lede}</p>
        </Reveal>

        <div className={styles.aboutBody}>
          <div>
            {a.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside className={styles.milestones}>
            <h4>Milestones</h4>
            {a.sidebar.items.map((m, i) => (
              <div key={i} className={styles.milestone}>
                <div className="y">{m.y}</div>
                <div className="t">{m.t}</div>
              </div>
            ))}
          </aside>
        </div>

        <Reveal className={clsx(styles.timeline)}>
          <div className={styles.timelineHead}>
            <h3>{a.timelineTitle}</h3>
            <div className="meta">{a.timelineMeta}</div>
          </div>
          <div className={styles.timelineTrack}>
            {a.timeline.map((e, i) => (
              <div key={i} className={clsx(styles.tvItem, e.a && styles.accent)}>
                <div className="y">{e.y}</div>
                <div className="c">{e.c}</div>
                <div className="t">{e.t}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
