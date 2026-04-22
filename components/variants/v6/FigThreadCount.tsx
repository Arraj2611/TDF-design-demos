// Fig. 5 · Thread-count diagram — warp × weft intersections in plain weave.
export function FigThreadCount({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 240"
      role="img"
      aria-label="Thread-count reference diagram for plain weave showing warp and weft intersections in magnified view."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="fabricWarp" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="6" height="14" fill="#2f3438" />
          <rect x="7" y="4" width="7" height="6" fill="#2f3438" opacity="0.45" />
        </pattern>
      </defs>

      {/* Magnified weave tile on left */}
      <g>
        <rect x="30" y="40" width="140" height="140" fill="#f2ece2" stroke="#2f3438" strokeWidth="1.2" />
        {/* Plain weave — over/under alternation in 8×8 grid */}
        {(() => {
          const cols = 8;
          const rows = 8;
          const cell = 140 / 8;
          const cells = [];
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const up = (r + c) % 2 === 0; // warp over weft
              const x = 30 + c * cell;
              const y = 40 + r * cell;
              if (up) {
                cells.push(
                  <rect
                    key={`${r}-${c}`}
                    x={x + 2}
                    y={y + 2}
                    width={cell - 4}
                    height={cell / 2 - 3}
                    fill="#2f3438"
                  />
                );
                cells.push(
                  <rect
                    key={`${r}-${c}-b`}
                    x={x + 2}
                    y={y + cell / 2 + 1}
                    width={cell - 4}
                    height={cell / 2 - 3}
                    fill="#2f3438"
                    opacity="0.35"
                  />
                );
              } else {
                cells.push(
                  <rect
                    key={`${r}-${c}`}
                    x={x + 2}
                    y={y + 2}
                    width={cell / 2 - 3}
                    height={cell - 4}
                    fill="#2f3438"
                  />
                );
                cells.push(
                  <rect
                    key={`${r}-${c}-b`}
                    x={x + cell / 2 + 1}
                    y={y + 2}
                    width={cell / 2 - 3}
                    height={cell - 4}
                    fill="#2f3438"
                    opacity="0.35"
                  />
                );
              }
            }
          }
          return <g>{cells}</g>;
        })()}

        {/* Corner brackets — magnifier indicator */}
        <g stroke="#a8542b" strokeWidth="1" fill="none">
          <path d="M26 44 L26 36 L34 36" />
          <path d="M174 44 L174 36 L166 36" />
          <path d="M26 176 L26 184 L34 184" />
          <path d="M174 176 L174 184 L166 184" />
        </g>
      </g>

      {/* Axis labels */}
      <g fontFamily="var(--font-plex-mono), monospace" fontSize="7.5" letterSpacing="0.2em" fill="#a8542b">
        <text x="100" y="26" textAnchor="middle">WARP ↓</text>
        <text x="14" y="114" textAnchor="middle" transform="rotate(-90 14 114)">WEFT →</text>
      </g>

      {/* Count-ruler on right side */}
      <g fill="none" stroke="#2f3438" strokeWidth="0.8">
        <line x1="220" y1="50" x2="220" y2="180" strokeWidth="1.2" />
        {Array.from({ length: 14 }, (_, i) => {
          const y = 50 + i * 10;
          const long = i % 5 === 0;
          return (
            <line key={i} x1="220" y1={y} x2={long ? 235 : 228} y2={y} strokeWidth={long ? 0.8 : 0.5} />
          );
        })}
      </g>

      <g fontFamily="var(--font-plex-mono), monospace" fontSize="7" fill="#2f3438" letterSpacing="0.12em">
        <text x="240" y="54">0</text>
        <text x="240" y="104">25</text>
        <text x="240" y="154">50</text>
        <text x="240" y="194" fill="#a8542b" letterSpacing="0.16em">EPI · COUNT</text>
      </g>

      {/* Data table — warp/weft specs */}
      <g fontFamily="var(--font-plex-mono), monospace" fontSize="7" fill="#2f3438" letterSpacing="0.1em">
        <line x1="30" y1="196" x2="170" y2="196" stroke="#2f3438" strokeWidth="0.8" />
        <text x="30" y="208" fill="#a8542b">WARP</text>
        <text x="100" y="208">40/2 CC</text>
        <line x1="30" y1="212" x2="170" y2="212" stroke="#2f3438" strokeWidth="0.3" />
        <text x="30" y="224" fill="#a8542b">WEFT</text>
        <text x="100" y="224">30s CC</text>
        <line x1="30" y1="228" x2="170" y2="228" stroke="#2f3438" strokeWidth="0.3" />
      </g>

      {/* Plate tag */}
      <g fontFamily="var(--font-plex-mono), monospace">
        <text x="306" y="20" textAnchor="end" fontSize="7" fill="#a8542b" letterSpacing="0.22em">PL. V</text>
        <line x1="270" y1="24" x2="306" y2="24" stroke="#a8542b" strokeWidth="0.5" />
      </g>
    </svg>
  );
}
