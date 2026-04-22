'use client';

import { Children, type ReactNode } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v9.module.css';

/**
 * Render the hero title with its trailing "." peeled off and re-rendered
 * as a red <span>. Works with the ReactNode array shape from content.tsx.
 * If the last child is a string ending in ".", we strip that one character;
 * otherwise we append a standalone red stop after the whole title.
 */
function renderTitleWithRedDot(title: ReactNode): ReactNode {
  const children = Children.toArray(title);
  if (children.length === 0) {
    return <span className={styles.heroTitleDot}>.</span>;
  }
  const lastIndex = children.length - 1;
  const last = children[lastIndex];
  if (typeof last === 'string' && last.endsWith('.')) {
    const trimmed = last.slice(0, -1);
    return (
      <>
        {children.slice(0, lastIndex)}
        {trimmed}
        <span className={styles.heroTitleDot}>.</span>
      </>
    );
  }
  return (
    <>
      {children}
      <span className={styles.heroTitleDot}>.</span>
    </>
  );
}

export function Hero() {
  const t = useT();
  const hero = t.hero;

  return (
    <header id="top" className={clsx(styles.hero, styles.container)}>
      <div className={styles.heroGrid}>
        <div>
          <Reveal>
            <div className={styles.heroEyebrow}>
              <span>Textile Development Foundation</span>
              <span className={styles.heroEyebrowSep} aria-hidden="true">&middot;</span>
              <span>Solapur</span>
              <span className={styles.heroEyebrowSep} aria-hidden="true">&middot;</span>
              <span>1995</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className={styles.heroTitle}>
              {renderTitleWithRedDot(hero.title)}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.heroSub}>{hero.sub}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className={styles.heroStats}>
              {hero.stats.slice(0, 3).map((s, i) => (
                <div key={i} className={styles.heroStatCell}>
                  <div className={styles.heroStatN}>{s.n}</div>
                  <div className={styles.heroStatL}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className={styles.heroMeta}>
          <Reveal delay={0.08}>
            {Children.toArray(hero.corner).map((line, i) => (
              <div key={i} className={styles.heroMetaLine}>{line}</div>
            ))}
            <div className={styles.heroMetaBig}>{t.top.est}</div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
