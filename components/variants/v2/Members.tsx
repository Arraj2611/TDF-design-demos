'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v2.module.css';

export function Members() {
  const m = useT().members;
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? m.logos : m.logos.filter((x) => x.k === filter);

  return (
    <section id="members" className={styles.section}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div>
            <div className={styles.secKicker}>
              <span className="dash" />
              {m.kicker}
            </div>
            <h2 className={styles.secTitle}>{m.title}</h2>
          </div>
          <p className={styles.secLede}>{m.lede}</p>
        </Reveal>

        <div className={styles.membersMeta}>
          {m.stats.map((s, i) => (
            <div key={i} className="m">
              <div className="n">{s.n}</div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </div>

        <div className={styles.filterRow}>
          {m.filters.map((f) => (
            <button
              key={f.k}
              type="button"
              className={clsx(styles.filter, filter === f.k && styles.active)}
              onClick={() => setFilter(f.k)}
            >
              {f.l} <span className="c">{f.c}</span>
            </button>
          ))}
        </div>

        <Reveal className={clsx(styles.ledger)}>
          <div className={styles.ledgerHead}>
            <div>ID</div>
            <div>Unit</div>
            <div>Discipline</div>
            <div>Category</div>
            <div>Code</div>
          </div>
          {filtered.map((x, i) => (
            <div key={i} className={styles.ledgerRow}>
              <div className={styles.ledgerMark}>{x.m}</div>
              <div className={styles.ledgerName}>{x.n}</div>
              <div className={styles.ledgerCat}>{x.c}</div>
              <div>
                <span className={styles.ledgerTag}>{x.k}</span>
              </div>
              <div className={styles.ledgerId}>{x.id}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
