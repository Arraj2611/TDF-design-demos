'use client';

import clsx from 'clsx';
import { isValidElement, cloneElement, Fragment, type ReactElement, type ReactNode } from 'react';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v2.module.css';

function renderTitle(parts: ReactNode) {
  if (!Array.isArray(parts)) return parts;
  return parts.map((x, i) => {
    if (isValidElement(x)) {
      const el = x as ReactElement<{ className?: string }>;
      return cloneElement(el, { key: i, className: 'accent' });
    }
    return <Fragment key={i}>{x}</Fragment>;
  });
}

export function Hero() {
  const t = useT();
  const h = t.hero;
  return (
    <section id="top" className={styles.hero}>
      <div className={clsx(styles.container, styles.heroWrap)}>
        <Reveal className={clsx(styles.heroEyebrow)}>
          <span className="dot">t</span>
          {h.eyebrow} <span style={{ opacity: 0.5 }}>·</span> {t.top.est}
        </Reveal>
        <div className={styles.heroGrid}>
          <Reveal>
            <h1 className={styles.heroTitle}>{renderTitle(h.title)}</h1>
            <p className={styles.heroSub}>{h.sub}</p>
            <div className={styles.heroCtas}>
              <a href="#about" className={styles.btnPrimary}>
                Explore the Foundation <span>→</span>
              </a>
              <a href="#events" className={styles.btnGhost}>
                VTTES 2026
              </a>
            </div>
          </Reveal>
          <div className={styles.heroCard}>
            {/* Task 17 replaces this with <HeroCardWeave /> */}
            <div
              aria-hidden="true"
              className={styles.heroCardPlaceholder}
              style={{ background: 'linear-gradient(135deg, #2a1e2e 0%, #b9431f 100%)' }}
            />
            <div className={styles.heroCardTop}>
              <div className="swatch" />
              <div className="lbl">Solapuri Chaddar · sample no. 014</div>
            </div>
            <div className={styles.heroCardMeta}>
              <div>
                <div>Warp × Weft</div>
                <div className="big">52 × 88</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div>fell line — live</div>
                <div style={{ marginTop: 6 }}>160 g/m² · cotton 2/40s</div>
              </div>
            </div>
          </div>
        </div>

        <Reveal className={clsx(styles.heroStats)}>
          {h.stats.map((s, i) => (
            <div key={i} className="s">
              <div className="n">
                {s.n.includes('+') || s.n.includes(',') ? <em>{s.n}</em> : s.n}
              </div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
