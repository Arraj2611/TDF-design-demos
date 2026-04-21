'use client';
import clsx from 'clsx';

export function Marquee({
  items,
  speed = 30,
  className,
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={clsx('marquee', className)} aria-label="News ticker">
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {doubled.map((t, i) => (
          <span key={i} className="marquee-item">{t}</span>
        ))}
      </div>
    </div>
  );
}
