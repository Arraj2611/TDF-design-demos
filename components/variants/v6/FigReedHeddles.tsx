// Fig. 3 · Reed & heddle arrangement in elevation.
export function FigReedHeddles({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 220"
      role="img"
      aria-label="Elevation view of a loom reed with adjacent heddle frame showing wire density."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="reedHatch" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#2f3438" strokeWidth="0.5" />
        </pattern>
      </defs>

      <g fill="none" stroke="#2f3438" strokeWidth="1">
        {/* Heddle frame on left */}
        <rect x="30" y="30" width="90" height="170" fill="#f2ece2" stroke="#2f3438" strokeWidth="1.2" />
        <rect x="30" y="30" width="90" height="170" fill="url(#reedHatch)" opacity="0.28" />
        {/* Frame rails */}
        <rect x="30" y="30" width="90" height="10" fill="#2f3438" />
        <rect x="30" y="190" width="90" height="10" fill="#2f3438" />
        {/* Heddle wires */}
        {Array.from({ length: 16 }, (_, i) => {
          const x = 36 + i * 5.4;
          return (
            <g key={i}>
              <line x1={x} y1="40" x2={x} y2="190" strokeWidth="0.4" opacity="0.95" />
              {/* Eye — tiny oval at centre */}
              <ellipse cx={x} cy="115" rx="1.4" ry="3.2" fill="#f2ece2" stroke="#2f3438" strokeWidth="0.35" />
            </g>
          );
        })}

        {/* Reed on right — high-density vertical comb */}
        <rect x="160" y="40" width="70" height="150" fill="#f2ece2" stroke="#2f3438" strokeWidth="1.2" />
        {/* Reed cap top */}
        <rect x="156" y="36" width="78" height="6" fill="#2f3438" />
        <rect x="156" y="188" width="78" height="6" fill="#2f3438" />
        {/* Reed blades */}
        {Array.from({ length: 34 }, (_, i) => (
          <line key={i} x1={162 + i * 2} y1="46" x2={162 + i * 2} y2="184" strokeWidth="0.3" />
        ))}

        {/* Warp threads passing through */}
        <g stroke="#a8542b" strokeWidth="0.4" opacity="0.75">
          <line x1="10" y1="115" x2="30" y2="115" />
          <line x1="120" y1="115" x2="160" y2="115" />
          <line x1="230" y1="115" x2="270" y2="115" />
        </g>

        {/* Callouts */}
        <g fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="0.16em">
          <text x="75" y="22" textAnchor="middle" fill="#a8542b">HEDDLE HARNESS</text>
          <line x1="75" y1="25" x2="75" y2="30" stroke="#a8542b" strokeWidth="0.5" />
          <text x="195" y="22" textAnchor="middle" fill="#a8542b">REED</text>
          <line x1="195" y1="25" x2="195" y2="36" stroke="#a8542b" strokeWidth="0.5" />

          <text x="10" y="124" fill="#787a7a" fontSize="6.5" letterSpacing="0.18em">WARP →</text>
        </g>

        {/* Dimension strokes */}
        <g stroke="#787a7a" strokeWidth="0.45">
          <line x1="160" y1="208" x2="160" y2="212" />
          <line x1="230" y1="208" x2="230" y2="212" />
          <line x1="160" y1="210" x2="230" y2="210" />
          <text x="195" y="218" fill="#787a7a" fontSize="6.5" fontFamily="var(--font-plex-mono), monospace" textAnchor="middle" letterSpacing="0.22em">— 70 / REED —</text>
        </g>
      </g>

      {/* Plate tag */}
      <g fontFamily="var(--font-plex-mono), monospace">
        <text x="270" y="16" textAnchor="end" fontSize="7" fill="#a8542b" letterSpacing="0.22em">PL. III</text>
        <line x1="234" y1="20" x2="270" y2="20" stroke="#a8542b" strokeWidth="0.5" />
      </g>
    </svg>
  );
}
