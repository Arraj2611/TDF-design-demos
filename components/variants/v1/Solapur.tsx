'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v1.module.css';

function SolapurPostcard() {
  return (
    <svg viewBox="0 0 560 340" className={styles.postcardSvg}>
      <defs>
        <pattern id="v1-chaddarBorder" x="0" y="0" width="24" height="12" patternUnits="userSpaceOnUse">
          <rect width="24" height="12" fill="#0f2340" />
          <rect x="0" y="0" width="4" height="12" fill="#c36a3f" />
          <rect x="8" y="4" width="4" height="4" fill="#b58a3c" />
          <rect x="16" y="0" width="4" height="12" fill="#c36a3f" />
        </pattern>
      </defs>

      <rect width="560" height="340" fill="#f4ede0" />
      <rect x="8" y="8" width="544" height="324" fill="none" stroke="#0f2340" strokeWidth="0.8" opacity="0.35" />
      <rect x="8" y="8" width="544" height="12" fill="url(#v1-chaddarBorder)" />
      <rect x="8" y="320" width="544" height="12" fill="url(#v1-chaddarBorder)" />

      <g transform="translate(40 150)">
        <path
          d="M 0 100 L 0 55 L 15 55 L 15 45 L 35 45 L 35 55 L 55 55 L 55 30 L 80 30 L 80 45 L 110 45 L 110 20 L 140 20 L 140 45 L 170 45 L 170 30 L 195 30 L 195 55 L 220 55 L 220 45 L 240 45 L 240 55 L 260 55 L 260 100 Z"
          fill="#0f2340"
          opacity="0.9"
        />
        {[5, 25, 45, 65, 85, 105, 125, 145, 165, 185, 205, 225, 245].map((x, i) => (
          <rect key={i} x={x} y={95} width="8" height="5" fill="#0f2340" />
        ))}
        <rect x="60" y="60" width="4" height="8" fill="#c36a3f" />
        <rect x="115" y="35" width="4" height="8" fill="#c36a3f" />
        <rect x="175" y="55" width="4" height="8" fill="#c36a3f" />
        <line x1="125" y1="20" x2="125" y2="0" stroke="#0f2340" strokeWidth="1.5" />
        <polygon points="125,0 145,5 125,10" fill="#c36a3f" />
      </g>

      <g transform="translate(330 130)">
        <polygon points="60,0 30,120 90,120" fill="#0f2340" opacity="0.9" />
        <polygon points="60,10 40,110 80,110" fill="none" stroke="#b58a3c" strokeWidth="0.6" opacity="0.6" />
        <rect x="45" y="120" width="30" height="50" fill="#0f2340" />
        <rect x="20" y="168" width="80" height="4" fill="#0f2340" />
        <path d="M 10 210 Q 60 200 110 210 T 210 210" fill="none" stroke="#0f2340" strokeWidth="0.6" opacity="0.5" />
        <path d="M 10 220 Q 60 212 110 220 T 210 220" fill="none" stroke="#0f2340" strokeWidth="0.4" opacity="0.4" />
        <path d="M 10 230 Q 60 224 110 230 T 210 230" fill="none" stroke="#0f2340" strokeWidth="0.3" opacity="0.3" />
      </g>

      <text x="40" y="50" fill="#0f2340" fontFamily="Libre Caslon Text" fontSize="26" fontWeight="700" letterSpacing="-0.5">
        Solapur
      </text>
      <text x="40" y="70" fill="#c36a3f" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="4">
        ॥ Est. c. 1590 ॥
      </text>

      <g transform="translate(475 40)">
        <rect width="60" height="70" fill="none" stroke="#0f2340" strokeWidth="0.6" strokeDasharray="1 2" />
        <rect x="4" y="4" width="52" height="52" fill="#c36a3f" opacity="0.15" />
        <text x="30" y="30" textAnchor="middle" fill="#0f2340" fontFamily="Libre Caslon Text" fontSize="18" fontWeight="700">
          S
        </text>
        <text x="30" y="46" textAnchor="middle" fill="#0f2340" fontFamily="IBM Plex Mono" fontSize="6" letterSpacing="1">
          MAHARASHTRA
        </text>
        <text x="30" y="65" textAnchor="middle" fill="#0f2340" fontFamily="IBM Plex Mono" fontSize="6" letterSpacing="1">
          IND · 413 001
        </text>
      </g>

      <text x="40" y="305" fill="#0f2340" fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="2" opacity="0.7">
        17.6599° N · 75.9064° E · 458m ASL
      </text>
    </svg>
  );
}

export function Solapur() {
  const t = useT().solapur;
  return (
    <section id="solapur" className={styles.solapur}>
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

        <div className={styles.solapurGrid}>
          <div className={styles.solapurFacts}>
            {t.facts.map((f, i) => (
              <div className={styles.sf} key={i}>
                <div className={clsx('n', 'serif')}>{f.n}</div>
                <div className="l">— {f.l}</div>
              </div>
            ))}
          </div>
          <div className={styles.solapurPostcard}>
            <SolapurPostcard />
          </div>
        </div>

        <div className={styles.solapurBody}>
          <div className={styles.solapurParas}>
            {t.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside className={styles.solapurHl}>
            <h4>— Quick facts</h4>
            <dl>
              {t.highlights.map((h, i) => (
                <div className={styles.hlRow} key={i}>
                  <dt>{h.k}</dt>
                  <dd>{h.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
