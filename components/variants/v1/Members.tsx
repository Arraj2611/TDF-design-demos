'use client';

import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v1.module.css';

const SLOT_COUNT = 12;
const FADE_DURATION = 350; // ms for cross-fade

export function Members() {
  const t = useT().members;
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? t.logos : t.logos.filter((l) => l.k === filter);
  const total = visible.length;

  // Each slot tracks: current display index + whether it's mid-fade
  const [indices, setIndices] = useState<number[]>(() =>
    Array.from({ length: SLOT_COUNT }, (_, i) => i % Math.max(total, 1))
  );
  const [fading, setFading] = useState<boolean[]>(Array(SLOT_COUNT).fill(false));

  // Reseed indices when filter changes
  useEffect(() => {
    setIndices(Array.from({ length: SLOT_COUNT }, (_, i) => i % Math.max(total, 1)));
    setFading(Array(SLOT_COUNT).fill(false));
  }, [filter, total]);

  const cycleSlot = useCallback(
    (slot: number) => {
      setFading((f) => {
        const next = [...f];
        next[slot] = true;
        return next;
      });
      setTimeout(() => {
        setIndices((idx) => {
          const next = [...idx];
          next[slot] = (next[slot]! + 1) % Math.max(total, 1);
          return next;
        });
        setFading((f) => {
          const next = [...f];
          next[slot] = false;
          return next;
        });
      }, FADE_DURATION);
    },
    [total],
  );

  // Staggered auto-rotation per slot
  useEffect(() => {
    if (total <= 1) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let slot = 0; slot < SLOT_COUNT; slot++) {
      const base = 2200 + Math.random() * 800;
      const initialDelay = slot * 300 + Math.random() * 500;

      const schedule = (delay: number) => {
        const timer = setTimeout(() => {
          cycleSlot(slot);
          schedule(base); // reschedule with consistent interval
        }, delay);
        timers.push(timer);
      };

      schedule(initialDelay);
    }

    return () => timers.forEach(clearTimeout);
  }, [cycleSlot, total]);

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
          {Array.from({ length: SLOT_COUNT }).map((_, slot) => {
            const logo = visible[indices[slot]! % Math.max(total, 1)];
            if (!logo) return null;
            return (
              <div
                className={styles.logoCell}
                key={slot}
                style={{ opacity: fading[slot] ? 0 : 1, transition: `opacity ${FADE_DURATION}ms ease` }}
              >
                <div className={styles.lcId}>{logo.id}</div>
                <div className={clsx(styles.lcMark, 'serif')}>{logo.m}</div>
                <div className={styles.lcFoot}>
                  <div className={styles.lcName}>{logo.n}</div>
                  <div className={styles.lcCat}>{logo.c}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
