'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v10.module.css';

export function Members() {
  const t = useT().members;

  return (
    <section id="members" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <div>
            <div className={styles.secKicker}>{t.kicker}</div>
            <h2 className={styles.secTitle}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
          <div className={styles.secNum}>02 / 08</div>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div className={styles.memStats}>
          {t.stats.map((s, i) => (
            <div key={i}>
              <div className={styles.memStatN}>{s.n}</div>
              <div className={styles.memStatL}>{s.l}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className={styles.memWall} role="list" aria-label="TDF member units">
          {t.logos.map((m) => (
            <div key={m.id} role="listitem" className={styles.memTile}>
              <div className={styles.memTileName}>{m.n}</div>
              <div className={styles.memTileCat}>{m.c}</div>
              <div className={styles.memTileId}>{m.id}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
