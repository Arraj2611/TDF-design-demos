export function ChaddarDivider({
  palette = ['#a8542b', '#f4ede0', '#0f2340'],
  height = 16,
  className,
}: {
  palette?: readonly [string, string, string];
  height?: number;
  className?: string;
}) {
  const [a, b, c] = palette;
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={className}
      style={{
        height,
        backgroundImage: `repeating-linear-gradient(90deg, ${a} 0 10px, ${b} 10px 14px, ${c} 14px 24px, ${b} 24px 28px)`,
      }}
    />
  );
}
