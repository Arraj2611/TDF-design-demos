'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v2.module.css';

function SolapurStampSvg() {
  return (
    <svg
      viewBox="0 0 300 170"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%' }}
    >
      <rect width="300" height="170" fill="#ebe3d3" />
      <path d="M 0 120 L 300 120" stroke="#c7b996" strokeWidth="0.8" />
      {/* Bhuikot fort silhouette */}
      <path
        d="M 20 120 L 20 80 L 30 80 L 30 66 L 40 66 L 40 80 L 52 80 L 52 58 L 62 58 L 62 80 L 74 80 L 74 70 L 86 70 L 86 80 L 96 80 L 96 62 L 106 62 L 106 80 L 116 80 L 116 120 Z"
        fill="#2a1e2e"
      />
      {/* Siddheshwar temple */}
      <g transform="translate(140,70)">
        <path
          d="M 0 50 L 0 30 L 8 30 L 8 20 L 16 10 L 24 20 L 24 30 L 32 30 L 32 50 Z"
          fill="#b9431f"
        />
        <circle cx="16" cy="6" r="3" fill="#e6c560" />
      </g>
      {/* chimney */}
      <g transform="translate(200,60)">
        <rect x="0" y="0" width="8" height="60" fill="#6b3a1a" />
        <rect x="-3" y="-4" width="14" height="4" fill="#6b3a1a" />
      </g>
      {/* mill body */}
      <rect x="180" y="85" width="80" height="35" fill="#5a6b4a" />
      <rect x="180" y="85" width="80" height="5" fill="#2a1e2e" opacity="0.4" />
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={i} x={186 + i * 18} y="95" width="10" height="10" fill="#e6c560" />
      ))}
      {/* sun */}
      <circle cx="250" cy="38" r="16" fill="#e6c560" />
      <circle cx="250" cy="38" r="22" fill="none" stroke="#e6c560" strokeWidth="0.6" opacity="0.5" />
      {/* ground */}
      <rect x="0" y="120" width="300" height="50" fill="#9a3818" opacity="0.85" />
      {Array.from({ length: 15 }).map((_, i) => (
        <rect key={i} x={i * 20} y="140" width="20" height="3" fill="#2a1e2e" opacity="0.3" />
      ))}
    </svg>
  );
}

export function Solapur() {
  const s = useT().solapur;
  return (
    <section id="solapur" className={clsx(styles.section, styles.solapur)}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div>
            <div className={styles.secKicker}>
              <span className="dash" />
              {s.kicker}
            </div>
            <h2 className={styles.secTitle}>{s.title}</h2>
          </div>
          <p className={styles.secLede}>{s.lede}</p>
        </Reveal>

        <div className={styles.solapurGrid}>
          <Reveal className={clsx(styles.solapurStamp)}>
            <div className={styles.solapurStampHead}>
              <span>Solapur · MH 13</span>
              <span>17.66° N</span>
            </div>
            <div className={styles.solapurStampSvg}>
              <SolapurStampSvg />
            </div>
            <div>
              <div className={styles.solapurStampTitle}>
                430 years <em>of weaving</em>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--ink-2)',
                  marginTop: 12,
                  lineHeight: 1.5,
                }}
              >
                The Deccan&apos;s mill town — chaddars, towels, bhakri, and the Siddheshwar yatra.
              </p>
            </div>
            <div className={styles.solapurStampFoot}>
              <span>Maharashtra, India</span>
              <span>est. 1590</span>
            </div>
          </Reveal>

          <div className={styles.solapurFacts}>
            {s.facts.map((f, i) => (
              <div key={i} className={styles.sfact}>
                <div className="n">
                  <em>{f.n}</em>
                </div>
                <div className="l">{f.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.solapurBody}>
          <div>
            {s.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside className={styles.solapurHl}>
            <h4>At a glance</h4>
            <dl>
              {s.highlights.map((h, i) => (
                <div key={i} className={styles.hlr}>
                  <dt className="k">{h.k}</dt>
                  <dd className="v">{h.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
