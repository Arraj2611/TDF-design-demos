export function WarpWeftGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: `
          repeating-linear-gradient(
            to bottom,
            transparent 0 23px,
            rgba(225, 55, 39, 0.06) 23px 24px
          ),
          repeating-linear-gradient(
            to right,
            transparent 0 79px,
            rgba(20, 20, 20, 0.04) 79px 80px
          )
        `,
        zIndex: 0,
      }}
    />
  );
}
