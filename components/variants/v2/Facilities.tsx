'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v2.module.css';

function LabIllus() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%' }}
    >
      <rect width="400" height="300" fill="#2a1e2e" />
      <rect x="0" y="210" width="400" height="90" fill="#3d2c42" />
      <line x1="0" y1="210" x2="400" y2="210" stroke="#e6c560" strokeWidth="1" opacity="0.5" />
      {[80, 160, 240, 320].map((x, i) => (
        <g key={i}>
          <rect
            x={x - 18}
            y={130 + i * 3}
            width="36"
            height="80"
            fill="#f5f0e6"
            opacity="0.15"
            stroke="#e6c560"
            strokeOpacity="0.8"
            strokeWidth="1.2"
          />
          <rect x={x - 18} y={170 - i * 10} width="36" height={40 + i * 10} fill="#b9431f" opacity="0.55" />
          <ellipse cx={x} cy={130 + i * 3} rx="18" ry="3" fill="none" stroke="#e6c560" strokeWidth="1" />
        </g>
      ))}
      <g transform="translate(30,230)">
        <rect width="80" height="50" fill="#e6c560" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={i * 7} y1="0" x2={i * 7} y2="50" stroke="#b9431f" strokeWidth="0.8" opacity="0.7" />
        ))}
      </g>
      <text
        x="200"
        y="60"
        fontFamily="Fraunces, serif"
        fontSize="22"
        fill="#f5f0e6"
        textAnchor="middle"
        fontWeight="400"
        letterSpacing="-0.02em"
      >
        Testing Lab
      </text>
      <text
        x="200"
        y="84"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill="#e6c560"
        textAnchor="middle"
        letterSpacing="3"
      >
        FIBRE · YARN · FABRIC
      </text>
    </svg>
  );
}

function DesignIllus() {
  const cells: Array<[number, number]> = [
    [8, 6], [9, 6], [10, 6], [11, 6], [7, 7], [8, 7], [11, 7], [12, 7], [6, 8], [7, 8],
    [12, 8], [13, 8], [5, 9], [6, 9], [13, 9], [14, 9], [4, 10], [5, 10], [14, 10], [15, 10],
    [5, 11], [6, 11], [13, 11], [14, 11], [6, 12], [7, 12], [12, 12], [13, 12], [7, 13], [8, 13],
    [11, 13], [12, 13], [8, 14], [9, 14], [10, 14], [11, 14],
  ];
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%' }}
    >
      <rect width="400" height="300" fill="#2a1e2e" />
      <g opacity="0.8">
        {Array.from({ length: 25 }).map((_, i) => (
          <line
            key={'v' + i}
            x1={i * 16}
            y1="40"
            x2={i * 16}
            y2="260"
            stroke="#e6c560"
            strokeOpacity="0.25"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={'h' + i}
            x1="0"
            y1={40 + i * 16}
            x2="400"
            y2={40 + i * 16}
            stroke="#e6c560"
            strokeOpacity="0.25"
            strokeWidth="0.5"
          />
        ))}
      </g>
      {cells.map(([x, y], i) => (
        <rect key={i} x={x * 16} y={40 + y * 16} width="16" height="16" fill="#b9431f" />
      ))}
      <text
        x="200"
        y="28"
        fontFamily="Fraunces, serif"
        fontSize="20"
        fill="#f5f0e6"
        textAnchor="middle"
        fontWeight="400"
        letterSpacing="-0.02em"
      >
        Design Grid
      </text>
    </svg>
  );
}

function TrainingIllus() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%' }}
    >
      <rect width="400" height="300" fill="#2a1e2e" />
      <rect x="60" y="80" width="280" height="180" fill="none" stroke="#e6c560" strokeWidth="2" />
      <line x1="60" y1="110" x2="340" y2="110" stroke="#e6c560" strokeWidth="1.4" />
      <line x1="60" y1="220" x2="340" y2="220" stroke="#e6c560" strokeWidth="1.4" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1={72 + i * 11}
          y1="110"
          x2={72 + i * 11}
          y2="220"
          stroke="#f5f0e6"
          strokeWidth="0.8"
          opacity="0.7"
        />
      ))}
      <rect x="72" y="170" width="264" height="50" fill="#b9431f" opacity="0.8" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={'w' + i}
          x1={72 + i * 11}
          y1="170"
          x2={72 + i * 11}
          y2="220"
          stroke="#e6c560"
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}
      <ellipse cx="200" cy="145" rx="24" ry="5" fill="#8a5028" />
      <ellipse cx="200" cy="144" rx="16" ry="2" fill="#b58a5a" />
      <text
        x="200"
        y="50"
        fontFamily="Fraunces, serif"
        fontSize="20"
        fill="#f5f0e6"
        textAnchor="middle"
        fontWeight="400"
        letterSpacing="-0.02em"
      >
        Training Loom
      </text>
    </svg>
  );
}

function GameIllus() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%' }}
    >
      <rect width="400" height="300" fill="#2a1e2e" />
      <rect x="80" y="40" width="240" height="240" fill="#5a6b4a" stroke="#e6c560" strokeWidth="2" />
      <rect x="96" y="56" width="208" height="208" fill="none" stroke="#e6c560" strokeWidth="0.8" opacity="0.5" />
      <circle cx="200" cy="160" r="26" fill="none" stroke="#e6c560" strokeWidth="1" opacity="0.6" />
      <circle cx="200" cy="160" r="8" fill="#b9431f" />
      {[
        [100, 60],
        [300, 60],
        [100, 260],
        [300, 260],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="10" fill="#1f1a18" />
      ))}
      {[
        [170, 140],
        [230, 140],
        [170, 180],
        [230, 180],
        [200, 130],
        [200, 190],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="6"
          fill={i % 2 ? '#f5f0e6' : '#2a1e2e'}
          stroke="#e6c560"
          strokeWidth="0.6"
        />
      ))}
      <text
        x="200"
        y="24"
        fontFamily="Fraunces, serif"
        fontSize="18"
        fill="#f5f0e6"
        textAnchor="middle"
        fontWeight="400"
        letterSpacing="-0.02em"
      >
        Carrom · Snooker · Chess
      </text>
    </svg>
  );
}

function LoungeIllus() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%' }}
    >
      <rect width="400" height="300" fill="#2a1e2e" />
      <rect x="40" y="60" width="100" height="200" fill="#3d2c42" stroke="#e6c560" strokeWidth="1" />
      {Array.from({ length: 4 }).map((_, i) => (
        <g key={i}>
          <line
            x1="40"
            y1={60 + (i + 1) * 40}
            x2="140"
            y2={60 + (i + 1) * 40}
            stroke="#e6c560"
            strokeWidth="0.8"
          />
          {Array.from({ length: 8 }).map((_, j) => (
            <rect
              key={j}
              x={46 + j * 11}
              y={66 + i * 40}
              width="9"
              height="32"
              fill={(['#b9431f', '#e6c560', '#5a6b4a', '#f5f0e6'] as const)[(i * 7 + j * 3) % 4]}
              opacity="0.85"
            />
          ))}
        </g>
      ))}
      <g transform="translate(280,180)">
        <ellipse cx="0" cy="30" rx="34" ry="6" fill="#1f1a18" opacity="0.5" />
        <path d="M -28 0 L -24 30 L 24 30 L 28 0 Z" fill="#f5f0e6" />
        <path d="M 28 4 Q 40 10 28 22" fill="none" stroke="#f5f0e6" strokeWidth="3" />
        <ellipse cx="0" cy="0" rx="28" ry="5" fill="#b9431f" />
        <path
          d="M -8 -10 Q -4 -24 -8 -36 M 0 -10 Q 4 -24 0 -36 M 8 -10 Q 12 -24 8 -36"
          fill="none"
          stroke="#e6c560"
          strokeWidth="1.2"
          opacity="0.6"
        />
      </g>
      <g transform="translate(200,200)">
        <rect x="-36" y="-26" width="72" height="52" fill="#f5f0e6" transform="rotate(-5)" />
        <rect x="-30" y="-18" width="60" height="4" fill="#2a1e2e" transform="rotate(-5)" />
        <rect x="-30" y="-8" width="48" height="2" fill="#2a1e2e" transform="rotate(-5)" opacity="0.6" />
        <rect x="-30" y="-2" width="52" height="2" fill="#2a1e2e" transform="rotate(-5)" opacity="0.6" />
        <rect x="-30" y="4" width="42" height="2" fill="#2a1e2e" transform="rotate(-5)" opacity="0.6" />
      </g>
      <text
        x="200"
        y="40"
        fontFamily="Fraunces, serif"
        fontSize="20"
        fill="#f5f0e6"
        textAnchor="middle"
        fontWeight="400"
        letterSpacing="-0.02em"
      >
        Reading Room
      </text>
    </svg>
  );
}

function FacilityIllustration({ kind }: { kind: string }) {
  if (kind === 'a') return <LabIllus />;
  if (kind === 'b') return <DesignIllus />;
  if (kind === 'c') return <TrainingIllus />;
  if (kind === 'd') return <GameIllus />;
  if (kind === 'e') return <LoungeIllus />;
  return <LabIllus />;
}

export function Facilities() {
  const f = useT().facilities;
  const [idx, setIdx] = useState(0);
  const active = f.items[idx] ?? f.items[0];
  if (!active) return null;

  return (
    <section id="facilities" className={clsx(styles.section, styles.sectionLight)}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div>
            <div className={styles.secKicker}>
              <span className="dash" />
              {f.kicker}
            </div>
            <h2 className={styles.secTitle}>{f.title}</h2>
          </div>
          <p className={styles.secLede}>{f.lede}</p>
        </Reveal>

        <div className={styles.facShell}>
          <div className={styles.facSide}>
            {f.items.map((it, i) => (
              <button
                key={i}
                type="button"
                className={clsx(styles.facEntry, idx === i && styles.active)}
                onClick={() => setIdx(i)}
              >
                <span className="ltr">{it.num}</span>
                <span className="nm">{it.name}</span>
                <span className="ar">→</span>
              </button>
            ))}
          </div>
          <div className={styles.facMain}>
            <div className={styles.facHero}>
              <div className={styles.facIllus}>
                <FacilityIllustration kind={active.num} />
                <div className={styles.facTag}>{active.tag}</div>
              </div>
              <div>
                <div className={styles.facLabel}>Facility · {active.num.toUpperCase()}</div>
                <h3 className={styles.facTitle}>{active.name}</h3>
                <p className={styles.facDesc}>{active.desc}</p>
                <div className={styles.facStats}>
                  {active.stats.map((s, i) => (
                    <div key={i} className="st">
                      <div className="n">{s.n}</div>
                      <div className="l">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.facServices}>
              <h4>What&apos;s on offer</h4>
              <ul>
                {active.tests.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
