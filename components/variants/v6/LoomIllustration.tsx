// Full-bleed technical illustration of a 1900s power loom, monograph style.
// Crosshatched grayscale linework, labeled with major mechanical components:
// warp beam, heddles/harness, reed, shuttle, fell line, cloth beam.
// Pure inline SVG — no state, renders as a Server Component.
export function LoomIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 400"
      role="img"
      aria-label="Technical plate of a 1900s power loom showing the warp beam, heddle harness, reed, shuttle, fell line, and cloth beam in cross-section."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Cross-hatched fill patterns — the monograph texture */}
        <pattern id="loomHatch" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#2f3438" strokeWidth="0.6" />
        </pattern>
        <pattern id="loomHatchDense" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#2f3438" strokeWidth="0.7" />
        </pattern>
        <pattern id="loomHatchCross" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="5" y2="0" stroke="#2f3438" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="5" stroke="#2f3438" strokeWidth="0.5" />
        </pattern>
        <pattern id="loomWarp" x="0" y="0" width="3" height="2" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="2" stroke="#2f3438" strokeWidth="0.4" />
        </pattern>
      </defs>

      {/* Ground / base framing */}
      <g fill="none" stroke="#2f3438" strokeWidth="1">
        {/* Baseline floor */}
        <line x1="30" y1="356" x2="770" y2="356" strokeWidth="1.4" />
        <line x1="30" y1="360" x2="770" y2="360" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />

        {/* Main frame — cast-iron loom sideplates (left & right) */}
        <g>
          {/* Left sideplate */}
          <path d="M60 356 L60 110 Q60 92 78 92 L120 92 L120 356 Z" fill="url(#loomHatch)" stroke="#2f3438" strokeWidth="1.2" />
          <path d="M60 356 L60 110 Q60 92 78 92 L120 92 L120 356 Z" fill="none" stroke="#2f3438" strokeWidth="1.4" />
          {/* Cast-iron panel decoration */}
          <circle cx="90" cy="200" r="18" stroke="#f2ece2" strokeWidth="1.4" fill="none" />
          <circle cx="90" cy="200" r="12" stroke="#f2ece2" strokeWidth="0.8" fill="none" />
          <circle cx="90" cy="200" r="3" fill="#f2ece2" />
          <circle cx="90" cy="280" r="6" stroke="#f2ece2" strokeWidth="0.8" fill="none" />

          {/* Right sideplate */}
          <path d="M680 356 L680 110 Q680 92 698 92 L740 92 L740 356 Z" fill="url(#loomHatch)" stroke="#2f3438" strokeWidth="1.2" />
          <path d="M680 356 L680 110 Q680 92 698 92 L740 92 L740 356 Z" fill="none" stroke="#2f3438" strokeWidth="1.4" />
          <circle cx="710" cy="200" r="18" stroke="#f2ece2" strokeWidth="1.4" fill="none" />
          <circle cx="710" cy="200" r="12" stroke="#f2ece2" strokeWidth="0.8" fill="none" />
          <circle cx="710" cy="200" r="3" fill="#f2ece2" />
          <circle cx="710" cy="280" r="6" stroke="#f2ece2" strokeWidth="0.8" fill="none" />
        </g>

        {/* Warp beam — horizontal cylinder at rear, left */}
        <g>
          <ellipse cx="150" cy="270" rx="36" ry="36" fill="#f2ece2" stroke="#2f3438" strokeWidth="1.4" />
          <ellipse cx="150" cy="270" rx="36" ry="36" fill="url(#loomHatchDense)" opacity="0.8" />
          <circle cx="150" cy="270" r="28" stroke="#2f3438" strokeWidth="0.8" fill="none" />
          <circle cx="150" cy="270" r="22" stroke="#2f3438" strokeWidth="0.5" fill="none" />
          <circle cx="150" cy="270" r="5" fill="#2f3438" />
          {/* Axle tick */}
          <line x1="150" y1="238" x2="150" y2="246" strokeWidth="0.6" />
        </g>

        {/* Warp threads — many parallel lines from beam to reed */}
        <g stroke="#2f3438" strokeWidth="0.35" opacity="0.88">
          <line x1="186" y1="258" x2="420" y2="170" />
          <line x1="186" y1="262" x2="420" y2="174" />
          <line x1="186" y1="266" x2="420" y2="178" />
          <line x1="186" y1="270" x2="420" y2="182" />
          <line x1="186" y1="274" x2="420" y2="186" />
          <line x1="186" y1="278" x2="420" y2="190" />
          <line x1="186" y1="282" x2="420" y2="194" />
          {/* upper shed */}
          <line x1="186" y1="254" x2="420" y2="148" opacity="0.7" />
          <line x1="186" y1="258" x2="420" y2="152" opacity="0.7" />
          <line x1="186" y1="262" x2="420" y2="156" opacity="0.7" />
          <line x1="186" y1="266" x2="420" y2="160" opacity="0.7" />
        </g>

        {/* Heddle harness — two frames forming the shed */}
        <g>
          {/* Harness frame 1 — back (upper) */}
          <rect x="300" y="120" width="8" height="170" fill="#2f3438" />
          <rect x="308" y="120" width="42" height="170" fill="url(#loomHatch)" stroke="#2f3438" strokeWidth="1" />
          <rect x="350" y="120" width="8" height="170" fill="#2f3438" />
          {/* heddle lines inside frame 1 */}
          <g stroke="#2f3438" strokeWidth="0.45" opacity="0.95">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line key={i} x1={312 + i * 5} y1="130" x2={312 + i * 5} y2="280" />
            ))}
          </g>
          {/* Harness frame 2 — front (lower) */}
          <rect x="372" y="120" width="8" height="170" fill="#2f3438" />
          <rect x="380" y="120" width="42" height="170" fill="url(#loomHatch)" stroke="#2f3438" strokeWidth="1" />
          <rect x="422" y="120" width="8" height="170" fill="#2f3438" />
          <g stroke="#2f3438" strokeWidth="0.45" opacity="0.95">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line key={i} x1={384 + i * 5} y1="130" x2={384 + i * 5} y2="280" />
            ))}
          </g>
          {/* Top pulley system */}
          <circle cx="304" cy="108" r="9" fill="#f2ece2" stroke="#2f3438" strokeWidth="1" />
          <circle cx="304" cy="108" r="3" fill="#2f3438" />
          <circle cx="426" cy="108" r="9" fill="#f2ece2" stroke="#2f3438" strokeWidth="1" />
          <circle cx="426" cy="108" r="3" fill="#2f3438" />
          <line x1="304" y1="99" x2="426" y2="99" strokeWidth="0.8" />
        </g>

        {/* Reed — vertical fine-toothed comb */}
        <g>
          <rect x="440" y="130" width="18" height="180" fill="#f2ece2" stroke="#2f3438" strokeWidth="1.2" />
          <g stroke="#2f3438" strokeWidth="0.35">
            {Array.from({ length: 22 }, (_, i) => (
              <line key={i} x1={443 + i * 0.6} y1="136" x2={443 + i * 0.6} y2="304" />
            ))}
          </g>
          {/* Reed cap */}
          <rect x="436" y="126" width="26" height="6" fill="#2f3438" />
          <rect x="436" y="306" width="26" height="6" fill="#2f3438" />
        </g>

        {/* Shuttle — missile-shape flying left-to-right through the shed */}
        <g transform="translate(360 168)">
          <path d="M0 8 L12 0 L56 0 L68 8 L56 16 L12 16 Z" fill="#f2ece2" stroke="#2f3438" strokeWidth="1.2" />
          <path d="M0 8 L12 0 L56 0 L68 8 L56 16 L12 16 Z" fill="url(#loomHatchCross)" opacity="0.55" />
          {/* Bobbin slot */}
          <rect x="22" y="5" width="24" height="6" fill="#f2ece2" stroke="#2f3438" strokeWidth="0.8" />
          <circle cx="34" cy="8" r="2" fill="#2f3438" />
          {/* Motion blur — dotted tail */}
          <line x1="-4" y1="8" x2="-24" y2="8" strokeDasharray="2 3" opacity="0.55" />
          <line x1="-4" y1="4" x2="-24" y2="4" strokeDasharray="1 4" opacity="0.4" />
          <line x1="-4" y1="12" x2="-24" y2="12" strokeDasharray="1 4" opacity="0.4" />
        </g>

        {/* Fell line / finished cloth emerging to the right */}
        <g>
          <rect x="462" y="200" width="150" height="18" fill="url(#loomHatchDense)" stroke="#2f3438" strokeWidth="1" opacity="0.9" />
          <rect x="462" y="200" width="150" height="18" fill="none" stroke="#2f3438" strokeWidth="1" />
          {/* Weft texture on cloth */}
          <g stroke="#f2ece2" strokeWidth="0.6" opacity="0.85">
            <line x1="470" y1="202" x2="608" y2="202" />
            <line x1="470" y1="206" x2="608" y2="206" />
            <line x1="470" y1="210" x2="608" y2="210" />
            <line x1="470" y1="214" x2="608" y2="214" />
          </g>
          {/* Fell-line arrow */}
          <line x1="464" y1="196" x2="464" y2="186" strokeWidth="0.7" />
          <line x1="461" y1="189" x2="464" y2="186" strokeWidth="0.7" />
          <line x1="467" y1="189" x2="464" y2="186" strokeWidth="0.7" />
        </g>

        {/* Cloth beam — front-right cylinder, slightly smaller */}
        <g>
          <ellipse cx="640" cy="240" rx="28" ry="28" fill="#f2ece2" stroke="#2f3438" strokeWidth="1.4" />
          <ellipse cx="640" cy="240" rx="28" ry="28" fill="url(#loomHatchDense)" opacity="0.7" />
          <circle cx="640" cy="240" r="20" stroke="#2f3438" strokeWidth="0.7" fill="none" />
          <circle cx="640" cy="240" r="4" fill="#2f3438" />
          <line x1="612" y1="240" x2="620" y2="240" strokeWidth="0.5" />
        </g>

        {/* Drive belt + flywheel on left sideplate — the power part of power loom */}
        <g>
          <circle cx="90" cy="200" r="30" fill="none" stroke="#2f3438" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
          <line x1="60" y1="176" x2="30" y2="170" strokeWidth="1" />
          <line x1="60" y1="182" x2="30" y2="178" strokeWidth="0.8" />
          <line x1="60" y1="220" x2="30" y2="226" strokeWidth="0.8" />
          <line x1="60" y1="226" x2="30" y2="232" strokeWidth="1" />
          {/* Motor indicator */}
          <rect x="20" y="180" width="14" height="20" fill="#f2ece2" stroke="#2f3438" strokeWidth="1" />
          <line x1="20" y1="184" x2="34" y2="184" strokeWidth="0.4" />
          <line x1="20" y1="188" x2="34" y2="188" strokeWidth="0.4" />
          <line x1="20" y1="192" x2="34" y2="192" strokeWidth="0.4" />
          <line x1="20" y1="196" x2="34" y2="196" strokeWidth="0.4" />
        </g>
      </g>

      {/* Callout labels — numbered markers + italic component names */}
      <g fontFamily="var(--font-plex-mono), monospace" fontSize="9" fill="#a8542b" letterSpacing="0.18em">
        <text x="150" y="224" textAnchor="middle">A</text>
        <circle cx="150" cy="220" r="9" fill="none" stroke="#a8542b" strokeWidth="0.8" />
        <text x="340" y="74" textAnchor="middle">B</text>
        <circle cx="340" cy="70" r="9" fill="none" stroke="#a8542b" strokeWidth="0.8" />
        <text x="449" y="118" textAnchor="middle">C</text>
        <circle cx="449" cy="114" r="9" fill="none" stroke="#a8542b" strokeWidth="0.8" />
        <text x="394" y="156" textAnchor="middle">D</text>
        <circle cx="394" cy="152" r="9" fill="none" stroke="#a8542b" strokeWidth="0.8" />
        <text x="540" y="240" textAnchor="middle">E</text>
        <circle cx="540" cy="236" r="9" fill="none" stroke="#a8542b" strokeWidth="0.8" />
        <text x="640" y="200" textAnchor="middle">F</text>
        <circle cx="640" cy="196" r="9" fill="none" stroke="#a8542b" strokeWidth="0.8" />

        {/* Legend strip — bottom */}
        <g fill="#2f3438" fontSize="8" letterSpacing="0.12em">
          <text x="60" y="388">
            <tspan fill="#a8542b" fontWeight="500">A</tspan>
            <tspan dx="6"> WARP BEAM</tspan>
            <tspan dx="14" fill="#a8542b" fontWeight="500">B</tspan>
            <tspan dx="6"> HEDDLE HARNESS</tspan>
            <tspan dx="14" fill="#a8542b" fontWeight="500">C</tspan>
            <tspan dx="6"> REED</tspan>
            <tspan dx="14" fill="#a8542b" fontWeight="500">D</tspan>
            <tspan dx="6"> SHUTTLE</tspan>
            <tspan dx="14" fill="#a8542b" fontWeight="500">E</tspan>
            <tspan dx="6"> FELL LINE</tspan>
            <tspan dx="14" fill="#a8542b" fontWeight="500">F</tspan>
            <tspan dx="6"> CLOTH BEAM</tspan>
          </text>
        </g>
      </g>

      {/* Top-right plate indicator */}
      <g fontFamily="var(--font-plex-mono), monospace" fill="#a8542b">
        <text x="770" y="26" textAnchor="end" fontSize="8" letterSpacing="0.22em">PLATE I · SCALE 1:24</text>
        <line x1="660" y1="32" x2="770" y2="32" stroke="#a8542b" strokeWidth="0.6" />
      </g>

      {/* Dimension strokes — like engineering drawing callouts */}
      <g stroke="#787a7a" strokeWidth="0.5" fill="none">
        <line x1="60" y1="372" x2="60" y2="378" />
        <line x1="740" y1="372" x2="740" y2="378" />
        <line x1="60" y1="376" x2="740" y2="376" />
        <text x="400" y="374" fill="#787a7a" fontSize="7" fontFamily="var(--font-plex-mono), monospace" textAnchor="middle" letterSpacing="0.2em">— 3,660 MM —</text>
      </g>
    </svg>
  );
}
