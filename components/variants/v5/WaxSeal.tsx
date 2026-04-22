'use client';

// Inline SVG wax seal. Two concentric rings, TDF monogram centred, eight
// sunray notches around the rim. No images, no gradients heavy enough to
// cost bandwidth — all strokes on the parchment.

export interface WaxSealProps {
  size?: number;
  label?: string;
  monogram?: string;
  title?: string;
  className?: string;
}

export function WaxSeal({
  size = 56,
  label,
  monogram = 'TDF',
  title = 'Textile Development Foundation — Solapur',
  className,
}: WaxSealProps) {
  const id = `wax-${monogram}-${label ?? 'default'}`;
  const outer = 48;
  const inner = 38;
  const rayInner = 50;
  const rayOuter = 54;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <defs>
        {/* subtle radial shading so the seal reads as pressed wax, not a flat disc */}
        <radialGradient id={`${id}-wax`} cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#9a2b2b" />
          <stop offset="55%" stopColor="#7a1c1c" />
          <stop offset="100%" stopColor="#5b1313" />
        </radialGradient>
      </defs>

      {/* outer wax disc */}
      <circle cx="32" cy="32" r={outer / 2} fill={`url(#${id}-wax)`} />

      {/* eight sunray notches — evenly spaced on a slightly larger radius */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 8;
        const x1 = 32 + Math.cos(angle) * (rayInner / 2);
        const y1 = 32 + Math.sin(angle) * (rayInner / 2);
        const x2 = 32 + Math.cos(angle) * (rayOuter / 2);
        const y2 = 32 + Math.sin(angle) * (rayOuter / 2);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#7a1c1c"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.85"
          />
        );
      })}

      {/* inner ring */}
      <circle
        cx="32"
        cy="32"
        r={inner / 2}
        fill="none"
        stroke="#efe3c9"
        strokeWidth="0.9"
        opacity="0.6"
      />

      {/* monogram */}
      <text
        x="32"
        y="33"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily='"Playfair Display", Georgia, serif'
        fontSize={label ? '10' : '13'}
        fontWeight="900"
        fontStyle="italic"
        fill="#efe3c9"
        letterSpacing="0.5"
      >
        {monogram}
      </text>

      {/* optional label rendered below the monogram */}
      {label ? (
        <text
          x="32"
          y="43"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily='"IBM Plex Mono", monospace'
          fontSize="5"
          fill="#efe3c9"
          letterSpacing="1.1"
          opacity="0.78"
        >
          {label}
        </text>
      ) : null}
    </svg>
  );
}
