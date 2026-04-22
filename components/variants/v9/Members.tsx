'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BinaryStrip } from './BinaryStrip';
import styles from '@/styles/variants/v9.module.css';

// Hand-tuned binary pattern for Section II.
const PATTERN: readonly (0 | 1)[] = [1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1];

export function Members() {
  const t = useT().members;

  return (
    <section id="members" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <BinaryStrip roman="II" pattern={PATTERN} label={`No. ${t.num}`} />
          <h2 className={styles.secTitle}>{t.title}</h2>
          <p className={styles.secLede}>{t.lede}</p>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div className={styles.memStats}>
          {t.stats.map((s, i) => (
            <div key={i}>
              <div className={styles.memStatN}>
                {s.n}
                {i === 0 ? (
                  <span className={styles.memStatDot} aria-hidden="true" />
                ) : null}
              </div>
              <div className={styles.memStatL}>{s.l}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className={styles.memWall} role="list" aria-label="TDF member units">
          {t.logos.map((m) => (
            <div key={m.id} role="listitem" className={styles.memTile}>
              <div className={styles.memTileTop}>
                <span className={styles.memTileInit} aria-hidden="true">{m.m}</span>
                <span className={styles.memTileId}>{m.id}</span>
              </div>
              <div>
                <div className={styles.memTileName}>{m.n}</div>
                <div className={styles.memTileCat}>{m.c}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={styles.secFoot}>
        <span>II &middot; Membership &middot; No. {t.num}</span>
        <span>
          <em>{t.stats[0]?.n}</em> member units &middot; register revised Q2/2026
        </span>
      </div>
    </section>
  );
}
