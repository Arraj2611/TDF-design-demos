// Fig. 4 · Jacquard punched card — the 19th-century precursor to the computer.
export function FigJacquardCard({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 200"
      role="img"
      aria-label="Jacquard loom punched card with a regular grid of square holes encoding weave lifting pattern."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="cardEdge" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="3" stroke="#2f3438" strokeWidth="0.35" />
        </pattern>
      </defs>

      {/* Card body */}
      <g>
        <rect x="24" y="40" width="270" height="120" fill="#f2ece2" stroke="#2f3438" strokeWidth="1.4" />
        {/* Tinted edges — like card darkening over time */}
        <rect x="24" y="40" width="270" height="6" fill="#2f3438" opacity="0.3" />
        <rect x="24" y="154" width="270" height="6" fill="#2f3438" opacity="0.3" />
        {/* Hinge holes on left edge */}
        <circle cx="34" cy="56" r="4" fill="#2f3438" />
        <circle cx="34" cy="100" r="4" fill="#2f3438" />
        <circle cx="34" cy="144" r="4" fill="#2f3438" />
        <circle cx="284" cy="56" r="4" fill="#2f3438" />
        <circle cx="284" cy="100" r="4" fill="#2f3438" />
        <circle cx="284" cy="144" r="4" fill="#2f3438" />
      </g>

      {/* Grid — the punch pattern */}
      {(() => {
        const cols = 18;
        const rows = 6;
        const startX = 52;
        const startY = 56;
        const cell = 12;
        const pattern: number[][] = [
          [1,0,1,1,0,0,1,0,1,0,1,1,0,1,1,0,0,1],
          [0,1,1,0,1,0,1,1,0,1,0,1,0,0,1,1,0,0],
          [1,1,0,1,0,1,0,1,1,0,1,0,1,1,0,0,1,1],
          [0,0,1,0,1,1,0,0,1,1,0,1,1,0,1,1,0,0],
          [1,0,1,1,0,0,1,1,0,1,1,0,0,1,0,1,1,0],
          [0,1,0,0,1,1,1,0,1,0,0,1,1,0,1,0,0,1],
        ];
        const cells = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const filled = (pattern[r]?.[c] ?? 0) === 1;
            const x = startX + c * cell;
            const y = startY + r * cell;
            cells.push(
              <g key={`${r}-${c}`}>
                {filled ? (
                  <rect x={x + 1.5} y={y + 1.5} width="7" height="7" fill="#2f3438" />
                ) : (
                  <rect x={x + 1.5} y={y + 1.5} width="7" height="7" fill="none" stroke="#2f3438" strokeWidth="0.4" />
                )}
              </g>
            );
          }
        }
        return <g>{cells}</g>;
      })()}

      {/* Binding thread at right */}
      <g stroke="#a8542b" strokeWidth="0.6" fill="none">
        <path d="M310 50 Q300 100 310 150" strokeDasharray="2 2" />
        <circle cx="308" cy="100" r="2" fill="#a8542b" />
      </g>

      {/* Callouts */}
      <g fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="0.16em">
        <text x="160" y="30" textAnchor="middle" fill="#a8542b">JACQUARD CARD · 18 × 6 GRID</text>
        <line x1="160" y1="33" x2="160" y2="39" stroke="#a8542b" strokeWidth="0.5" />

        <text x="14" y="100" fill="#787a7a" fontSize="6.5" letterSpacing="0.2em" transform="rotate(-90 14 100)" textAnchor="middle">HINGE EDGE</text>
      </g>

      {/* Legend: filled = warp lifted, empty = warp down */}
      <g fontFamily="var(--font-plex-mono), monospace" fontSize="7" letterSpacing="0.12em" fill="#2f3438">
        <rect x="30" y="178" width="6" height="6" fill="#2f3438" />
        <text x="42" y="184">LIFTED</text>
        <rect x="100" y="178" width="6" height="6" fill="none" stroke="#2f3438" strokeWidth="0.4" />
        <text x="112" y="184">DOWN</text>
        <text x="288" y="184" textAnchor="end" fill="#a8542b">PL. IV</text>
      </g>
    </svg>
  );
}
