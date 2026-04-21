'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { CONTENT, type Content, type Lang } from '@/lib/content';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Content;
}

const Ctx = createContext<LangCtx | null>(null);
const STORAGE_KEY = 'tdf.lang';

export function LangProvider({ children, initial = 'en' }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initial);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored === 'en' || stored === 'mr') setLangState(stored);
  }, []);

  // Toggle body class for MR-specific font vars
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('lang-mr', lang === 'mr');
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo<LangCtx>(() => ({ lang, setLang, t: CONTENT[lang] }), [lang, setLang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useLang must be used inside <LangProvider>');
  return v;
}

export function useT(): Content {
  return useLang().t;
}
