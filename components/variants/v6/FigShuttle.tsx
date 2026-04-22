// Fig. 2 · Shuttle cross-section & bobbin assembly.
export function FigShuttle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 200"
      role="img"
      aria-label="Cross-sectional diagram of a weaving shuttle with bobbin and weft thread exit."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="figShuttleHatch" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#2f3438" strokeWidth="0.55" />
        </pattern>
      </defs>

      <g fill="none" stroke="#2f3438" strokeWidth="1">
        {/* Shuttle body — cigar silhouette */}
        <path d="M30 100 L60 70 L260 70 L290 100 L260 130 L60 130 Z" fill="#f2ece2" stroke="#2f3438" strokeWidth="1.4" />
        <path d="M30 100 L60 70 L260 70 L290 100 L260 130 L60 130 Z" fill="url(#figShuttleHatch)" opacity="0.4" />

        {/* Bobbin cavity */}
        <rect x="90" y="84" width="140" height="32" fill="#f2ece2" stroke="#2f3438" strokeWidth="1" />
        {/* Bobbin inside */}
        <rect x="100" y="88" width="120" height="24" fill="none" stroke="#2f3438" strokeWidth="0.8" />
        <line x1="110" y1="84" x2="110" y2="116" strokeWidth="0.8" />
        <line x1="210" y1="84" x2="210" y2="116" strokeWidth="0.8" />
        {/* Thread coils on bobbin */}
        {Array.from({ length: 18 }, (_, i) => (
          <line key={i} x1={112 + i * 5.4} y1="90" x2={112 + i * 5.4} y2="110" strokeWidth="0.35" opacity="0.85" />
        ))}
        <circle cx="160" cy="100" r="3" fill="#2f3438" />

        {/* Tip caps */}
        <path d="M30 100 L60 88 L60 112 Z" fill="#2f3438" />
        <path d="M290 100 L260 88 L260 112 Z" fill="#2f3438" />

        {/* Weft thread exiting right — porcelain eye */}
        <circle cx="252" cy="100" r="4" fill="#f2ece2" stroke="#a8542b" strokeWidth="1" />
        <path d="M256 100 Q280 95 300 110" stroke="#a8542b" strokeWidth="0.8" fill="none" />

        {/* Callouts */}
        <g fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="0.16em">
          <text x="160" y="62" textAnchor="middle" fill="#a8542b">A · BOBBIN</text>
          <line x1="160" y1="66" x2="160" y2="82" stroke="#a8542b" strokeWidth="0.6" />

          <text x="252" y="148" textAnchor="middle" fill="#a8542b">B · WEFT EYE</text>
          <line x1="252" y1="132" x2="252" y2="144" stroke="#a8542b" strokeWidth="0.6" />

          <text x="45" y="150" fill="#787a7a" fontSize="7">TIP · STEEL</text>
          <line x1="45" y1="130" x2="45" y2="144" stroke="#787a7a" strokeWidth="0.5" />
        </g>

        {/* Dimension strokes */}
        <g stroke="#787a7a" strokeWidth="0.45">
          <line x1="30" y1="172" x2="30" y2="178" />
          <line x1="290" y1="172" x2="290" y2="178" />
          <line x1="30" y1="175" x2="290" y2="175" />
          <text x="160" y="188" fill="#787a7a" fontSize="7" fontFamily="var(--font-plex-mono), monospace" textAnchor="middle" letterSpacing="0.22em">— 355 MM —</text>
        </g>
      </g>

      {/* Plate tag */}
      <g fontFamily="var(--font-plex-mono), monospace">
        <text x="310" y="20" textAnchor="end" fontSize="7" fill="#a8542b" letterSpacing="0.22em">PL. II</text>
        <line x1="272" y1="24" x2="310" y2="24" stroke="#a8542b" strokeWidth="0.5" />
      </g>
    </svg>
  );
}
