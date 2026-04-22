'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v1.module.css';

function FacilityVisual({ type }: { type: string }) {
  if (type === 'a') {
    return (
      <svg viewBox="0 0 400 280" className={styles.facSvg}>
        <defs>
          <pattern id="v1-labgrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(244,237,224,0.08)" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(244,237,224,0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="280" fill="url(#v1-labgrid)" />
        <path
          d="M 140 80 L 140 180 Q 140 210 170 210 L 230 210 Q 260 210 260 180 L 260 80"
          fill="none"
          stroke="#f4ede0"
          strokeWidth="1.5"
        />
        <path
          d="M 140 80 L 130 70 L 270 70 L 260 80"
          fill="none"
          stroke="#f4ede0"
          strokeWidth="1.5"
        />
        <path
          d="M 140 160 L 260 160 L 260 180 Q 260 210 230 210 L 170 210 Q 140 210 140 180 Z"
          fill="#c36a3f"
          opacity="0.3"
        />
        <line x1="150" y1="130" x2="250" y2="130" stroke="#f4ede0" strokeWidth="0.5" opacity="0.4" />
        <line x1="150" y1="110" x2="250" y2="110" stroke="#f4ede0" strokeWidth="0.5" opacity="0.4" />
        <polyline
          points="40,250 70,250 80,235 90,250 100,250 110,220 120,250 130,250"
          fill="none"
          stroke="#b58a3c"
          strokeWidth="1.2"
        />
        <polyline
          points="280,40 300,40 310,25 320,40 340,40 350,20 360,40"
          fill="none"
          stroke="#b58a3c"
          strokeWidth="1.2"
        />
        <text x="40" y="30" fill="#f4ede0" fontFamily="IBM Plex Mono" fontSize="9" opacity="0.5" letterSpacing="1">
          NABL/LAB-001
        </text>
      </svg>
    );
  }
  if (type === 'b') {
    return (
      <svg viewBox="0 0 400 280" className={styles.facSvg}>
        {Array.from({ length: 14 }).flatMap((_, r) =>
          Array.from({ length: 20 }).map((_, c) => {
            const fill =
              (r + c) % 5 === 0
                ? '#c36a3f'
                : (r * c) % 7 === 0
                ? '#b58a3c'
                : (r + c) % 2 === 0
                ? 'rgba(244,237,224,0.8)'
                : 'rgba(244,237,224,0.2)';
            return (
              <rect key={r + '-' + c} x={c * 20} y={r * 20} width="18" height="18" fill={fill} />
            );
          })
        )}
        <rect x="0" y="0" width="400" height="280" fill="none" stroke="#f4ede0" strokeWidth="0.5" opacity="0.3" />
        <text x="20" y="20" fill="#0f2340" fontFamily="IBM Plex Mono" fontSize="9" opacity="0.7" letterSpacing="1">
          MOTIF/JQ-214
        </text>
      </svg>
    );
  }
  if (type === 'c') {
    return (
      <svg viewBox="0 0 400 280" className={styles.facSvg}>
        <rect x="40" y="40" width="320" height="200" fill="none" stroke="#f4ede0" strokeWidth="1" opacity="0.4" />
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={i}
            x1={52 + i * 18}
            y1="40"
            x2={52 + i * 18}
            y2="240"
            stroke="#f4ede0"
            strokeWidth={i % 4 === 0 ? 1 : 0.4}
            opacity="0.6"
          />
        ))}
        <rect x="30" y="110" width="340" height="3" fill="#b58a3c" opacity="0.8" />
        <rect x="30" y="120" width="340" height="3" fill="#c36a3f" opacity="0.8" />
        <ellipse cx="200" cy="160" rx="22" ry="4" fill="#f4ede0" />
        <ellipse cx="200" cy="160" rx="18" ry="2.5" fill="#c36a3f" />
        <line x1="40" y1="160" x2="360" y2="160" stroke="#f4ede0" strokeWidth="0.5" opacity="0.5" strokeDasharray="2 4" />
        {Array.from({ length: 8 }).map((_, r) => (
          <rect key={r} x="40" y={180 + r * 7} width="320" height="3" fill="#f4ede0" opacity={0.15 + r * 0.05} />
        ))}
        <text x="40" y="30" fill="#f4ede0" fontFamily="IBM Plex Mono" fontSize="9" opacity="0.5" letterSpacing="1">
          TRAINING/LOOM-01
        </text>
      </svg>
    );
  }
  if (type === 'd') {
    const pocketPoints: Array<[number, number]> = [
      [40, 50],
      [200, 50],
      [360, 50],
      [40, 230],
      [200, 230],
      [360, 230],
    ];
    return (
      <svg viewBox="0 0 400 280" className={styles.facSvg}>
        <rect x="30" y="40" width="340" height="200" fill="#1a4026" stroke="#b58a3c" strokeWidth="4" />
        <rect x="40" y="50" width="320" height="180" fill="none" stroke="#b58a3c" strokeWidth="1" opacity="0.5" />
        {pocketPoints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="#0f2340" />
        ))}
        <circle cx="120" cy="140" r="5" fill="#f4ede0" />
        <circle cx="250" cy="140" r="5" fill="#c36a3f" />
        <circle cx="258" cy="135" r="5" fill="#b58a3c" />
        <circle cx="258" cy="145" r="5" fill="#0f2340" stroke="#f4ede0" strokeWidth="0.5" />
        <circle cx="266" cy="130" r="5" fill="#c36a3f" />
        <circle cx="266" cy="140" r="5" fill="#f4ede0" />
        <circle cx="266" cy="150" r="5" fill="#c36a3f" />
        <line x1="115" y1="140" x2="60" y2="140" stroke="#f4ede0" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.7" />
        <text x="40" y="30" fill="#f4ede0" fontFamily="IBM Plex Mono" fontSize="9" opacity="0.5" letterSpacing="1">
          GAME ZONE/TABLE-03
        </text>
      </svg>
    );
  }
  if (type === 'e') {
    return (
      <svg viewBox="0 0 400 280" className={styles.facSvg}>
        <rect x="0" y="0" width="400" height="280" fill="none" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={i * 34} y1="240" x2={i * 34} y2="280" stroke="#f4ede0" strokeWidth="0.4" opacity="0.25" />
        ))}
        <line x1="0" y1="240" x2="400" y2="240" stroke="#f4ede0" strokeWidth="0.6" opacity="0.4" />
        <ellipse cx="200" cy="165" rx="110" ry="50" fill="#1a2d4d" stroke="#b58a3c" strokeWidth="1.5" />
        <ellipse cx="200" cy="160" rx="110" ry="50" fill="none" stroke="#c36a3f" strokeWidth="0.6" opacity="0.7" />
        <rect x="175" y="145" width="22" height="30" fill="#f4ede0" stroke="#0f2340" strokeWidth="0.6" transform="rotate(-8 186 160)" />
        <rect x="195" y="145" width="22" height="30" fill="#f4ede0" stroke="#0f2340" strokeWidth="0.6" transform="rotate(4 206 160)" />
        <rect x="215" y="150" width="22" height="30" fill="#f4ede0" stroke="#0f2340" strokeWidth="0.6" transform="rotate(14 226 165)" />
        <text x="187" y="168" fill="#c36a3f" fontFamily="serif" fontSize="18" fontWeight="700">
          ♥
        </text>
        <text x="207" y="168" fill="#0f2340" fontFamily="serif" fontSize="16" fontWeight="700">
          ♠
        </text>
        <ellipse cx="90" cy="175" rx="14" ry="4" fill="#b58a3c" opacity="0.5" />
        <rect x="77" y="160" width="26" height="16" rx="1" fill="none" stroke="#f4ede0" strokeWidth="1" />
        <ellipse cx="310" cy="175" rx="14" ry="4" fill="#b58a3c" opacity="0.5" />
        <rect x="297" y="160" width="26" height="16" rx="1" fill="none" stroke="#f4ede0" strokeWidth="1" />
        <path d="M 20 60 Q 200 90 380 60" fill="none" stroke="#b58a3c" strokeWidth="0.5" opacity="0.6" />
        {[60, 110, 160, 210, 260, 310, 360].map((x, i) => {
          const y = 60 + Math.sin(((x - 200) / 200) * Math.PI) * 15 + 8;
          return <circle key={i} cx={x} cy={y} r="2.5" fill="#b58a3c" opacity="0.9" />;
        })}
        <text x="20" y="30" fill="#f4ede0" fontFamily="IBM Plex Mono" fontSize="9" opacity="0.5" letterSpacing="1">
          REC ZONE/TERRACE-EVE
        </text>
      </svg>
    );
  }
  return null;
}

export function Facilities() {
  const t = useT().facilities;
  const [active, setActive] = useState(0);
  const cur = t.items[active] ?? t.items[0];
  if (!cur) return null;

  return (
    <section id="facilities" className={styles.facilities}>
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

        <div className={styles.facWrap}>
          <nav className={styles.facNav} aria-label="Facilities">
            {t.items.map((it, i) => (
              <button
                key={i}
                type="button"
                className={clsx(styles.facTab, active === i && styles.active)}
                onClick={() => setActive(i)}
              >
                <span className={clsx(styles.facTabNum, 'serif')}>{it.num}.</span>
                <span className={styles.facTabName}>{it.name}</span>
                <span className={styles.facTabArrow}>{active === i ? '→' : ''}</span>
              </button>
            ))}
          </nav>

          <div className={styles.facBody}>
            <div className={styles.facHero}>
              <div className={styles.facVisual} data-type={cur.num}>
                <FacilityVisual type={cur.num} />
                <span className={styles.facTag}>{cur.tag}</span>
              </div>
              <div className={styles.facContent}>
                <div className={styles.facKicker}>— {cur.num.toUpperCase()}</div>
                <h3 className={clsx(styles.facName, 'serif')}>{cur.name}</h3>
                <p className={styles.facDesc}>{cur.desc}</p>
                <div className={styles.facStats}>
                  {cur.stats.map((s, i) => (
                    <div className={styles.facStat} key={i}>
                      <div className={clsx('n', 'serif')}>{s.n}</div>
                      <div className="l">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.facList}>
              <h4>— Available</h4>
              <ul>
                {cur.tests.map((x, i) => (
                  <li key={i}>
                    <span className="bullet">◦</span> {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
