'use client';

import clsx from 'clsx';
import { useLang } from './LangProvider';

export function BilingualToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className={clsx('inline-flex gap-1 items-center', className)}>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={clsx(
          'px-2 py-1 text-xs tracking-widest uppercase transition-opacity',
          lang === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-80'
        )}
      >
        EN
      </button>
      <span aria-hidden="true" className="opacity-40 text-xs">·</span>
      <button
        type="button"
        onClick={() => setLang('mr')}
        aria-pressed={lang === 'mr'}
        className={clsx(
          'px-2 py-1 text-xs transition-opacity',
          lang === 'mr' ? 'opacity-100' : 'opacity-50 hover:opacity-80'
        )}
        style={{ fontFamily: '"Noto Serif Devanagari", serif' }}
      >
        मराठी
      </button>
    </div>
  );
}
