'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v8.module.css';

// A 12×12 plain-weave specimen. Warp (horizontal) threads on ivory; weft
// (vertical) threads in charcoal, crossing with a single burgundy warp mid-span.
// Rendered as SVG dots so it reads as "fabric specimen" at any size.
function SpecimenSwatch() {
  const size = 12;
  const cell = 16;
  const total = size * cell;
  const dots: Array<{ x: number; y: number; color: string }> = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Plain-weave rule: (x + y) % 2 decides which thread is on top.
      const up = (x + y) % 2 === 0;
      // A single burgundy warp threads through row 6 as an accent.
      const color = y === 6 && up ? '#5b1a1a' : up ? '#141414' : '#c4b998';
      dots.push({ x: x * cell + cell / 2, y: y * cell + cell / 2, color });
    }
  }
  return (
    <svg
      viewBox={`0 0 ${total} ${total}`}
      width="100%"
      height="100%"
      role="img"
      aria-label="Plain-weave specimen swatch"
      className={styles.heroSpecimenSvg}
    >
      <rect x="0" y="0" width={total} height={total} fill="#f4ede0" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={3.2} fill={d.color} />
      ))}
    </svg>
  );
}

export function Hero() {
  const t = useT();
  const hero = t.hero;

  return (
    <header id="top" className={clsx(styles.hero, styles.container)}>
      <div className={styles.heroGrid}>
        <div className={styles.heroLeft}>
          <Reveal>
            <div className={styles.heroEyebrow}>
              <span className="edition">Edition I</span>
              <span aria-hidden="true">&middot;</span>
              <span>TDF Solapur</span>
              <span aria-hidden="true">&middot;</span>
              <span>Est. 1995</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className={styles.heroTitle}>{hero.title}</h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.heroSub}>{hero.sub}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className={styles.heroStats}>
              {hero.stats.slice(0, 3).map((s, i) => (
                <div key={i} className={styles.heroStatRow}>
                  <div className={styles.heroStatIdx}>
                    0{i + 1}
                  </div>
                  <div className={styles.heroStatN}>{s.n}</div>
                  <div className={styles.heroStatL}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className={styles.heroRight}>
          <Reveal delay={0.12}>
            <figure className={styles.heroSpecimen}>
              <SpecimenSwatch />
              <figcaption className={styles.heroSpecimenCap}>
                Specimen &middot; Solapuri Chaddar<br />
                2/40s Cotton &middot; 160 g/m&sup2;
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
