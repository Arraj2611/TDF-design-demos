'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import { VARIANTS } from '@/lib/versions';

export function VariantSwitcher({ currentSlug }: { currentSlug?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onEsc);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onEsc);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const current = VARIANTS.find((v) => v.slug === currentSlug);

  return (
    <div ref={rootRef} className="fixed bottom-5 right-5 z-[9999] font-mono">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex items-center gap-2 rounded-full bg-neutral-900 text-neutral-100 px-4 py-3 text-[11px] tracking-[0.18em] uppercase font-semibold border border-neutral-100/20 shadow-2xl hover:bg-neutral-800"
      >
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-400" />
        Edition · {current?.label ?? 'Overview'}
      </button>

      {open && (
        <div
          id={panelId}
          role="menu"
          className="absolute right-0 bottom-full mb-2 w-72 rounded-2xl bg-neutral-900 border border-neutral-100/20 p-2 shadow-2xl max-h-[70vh] overflow-auto"
        >
          <div className="px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-neutral-100/50">
            Switch edition
          </div>
          {VARIANTS.map((v) => {
            const isCurrent = v.slug === currentSlug;
            return (
              <Link
                key={v.id}
                href={`/${v.slug}`}
                aria-current={isCurrent ? 'page' : undefined}
                className={clsx(
                  'flex items-start gap-3 px-3 py-2 rounded-xl no-underline text-neutral-100 hover:bg-neutral-100/10',
                  isCurrent && 'bg-amber-400/10'
                )}
              >
                <span
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 rounded-md"
                  style={{
                    background: `linear-gradient(135deg, ${v.swatch[0]} 0 50%, ${v.swatch[1]} 50% 80%, ${v.swatch[2]} 80% 100%)`,
                  }}
                />
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold truncate">{v.label}</span>
                  <span className="block text-[10px] tracking-[0.08em] uppercase text-neutral-100/55">
                    {v.signature}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
