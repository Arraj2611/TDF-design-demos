import Link from 'next/link';
import { VARIANTS } from '@/lib/versions';

export default function Landing() {
  return (
    <main
      className="min-h-dvh px-6 py-16 md:py-24"
      style={{ background: '#f4ede0', color: '#141414' }}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-14 md:mb-20">
          <p className="font-mono text-xs tracking-[0.3em] uppercase opacity-60 mb-3">
            Textile Development Foundation · Solapur
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-3xl">
            Ten design directions under evaluation.
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg opacity-75 leading-relaxed">
            Each edition below renders the same organisation content in a
            different visual register. Pick any to preview. The edition
            switcher (bottom-right) moves between them.
          </p>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VARIANTS.map((v) => (
            <li key={v.id}>
              <Link
                href={`/${v.slug}`}
                className="group block rounded-2xl border border-black/10 p-5 hover:border-black/30 transition-colors bg-white/40 no-underline"
                style={{ color: '#141414' }}
              >
                <div
                  className="h-16 w-full rounded-lg mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${v.swatch[0]} 0% 40%, ${v.swatch[1]} 40% 75%, ${v.swatch[2]} 75% 100%)`,
                  }}
                  aria-hidden="true"
                />
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-55">{v.id}</span>
                  <h2 className="font-serif text-xl">{v.label}</h2>
                </div>
                <p className="text-sm opacity-75 leading-relaxed mb-3">{v.blurb}</p>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-65 group-hover:opacity-100">
                  Signature · {v.signature} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
