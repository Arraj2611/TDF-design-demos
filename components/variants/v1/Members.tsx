'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v1.module.css';

export function Members() {
  const t = useT().members;
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? t.logos : t.logos.filter((l) => l.k === filter);

  const padCount = visible.length % 6 === 0 ? 0 : 6 - (visible.length % 6);

  return (
    <section id="members" className={styles.members}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div className={styles.secKicker}>
            <span className="num">— {t.num}</span>
            <span>{t.kicker}</span>
          </div>
          <div>
            <h2 className={clsx(styles.secTitle, 'serif')}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
        </Reveal>

        <div className={styles.membersMeta}>
          {t.stats.map((s, i) => (
            <div className="m" key={i}>
              <div className={clsx('n', 'serif')}>{s.n}</div>
              <div className="l">— {s.l}</div>
            </div>
          ))}
        </div>

        <div className={styles.membersFilters}>
          {t.filters.map((f) => (
            <button
              key={f.k}
              type="button"
              className={clsx(styles.chip, filter === f.k && styles.active)}
              onClick={() => setFilter(f.k)}
            >
              {f.l}
              <span className="ct">{f.c}</span>
            </button>
          ))}
        </div>

        <div className={styles.logoWall}>
          {visible.map((l) => (
            <div className={styles.logoCell} key={l.id}>
              <div className={styles.lcId}>{l.id}</div>
              <div className={clsx(styles.lcMark, 'serif')}>{l.m}</div>
              <div className={styles.lcFoot}>
                <div className={styles.lcName}>{l.n}</div>
                <div className={styles.lcCat}>{l.c}</div>
              </div>
            </div>
          ))}
          {Array.from({ length: padCount }).map((_, i) => (
            <div
              className={styles.logoCell}
              key={'pad' + i}
              style={{ background: 'transparent', cursor: 'default' }}
            >
              <div
                className={styles.lcMark}
                style={{
                  color: 'var(--line-2)',
                  fontSize: 14,
                  fontFamily: 'var(--font-plex-mono), ui-monospace, monospace',
                  letterSpacing: '0.1em',
                }}
              >
                — vacant —
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
