import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { LangProvider, useT, useLang } from '@/components/shared/LangProvider';

beforeEach(() => {
  localStorage.clear();
});

function Probe() {
  const t = useT();
  const { lang, setLang } = useLang();
  return (
    <div>
      <output data-testid="lang">{lang}</output>
      <output data-testid="hero-kicker">{t.hero.eyebrow}</output>
      <button onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}>toggle</button>
    </div>
  );
}

describe('LangProvider', () => {
  it('defaults to en', () => {
    render(<LangProvider><Probe/></LangProvider>);
    expect(screen.getByTestId('lang').textContent).toBe('en');
  });

  it('toggles to mr and flips the content', async () => {
    render(<LangProvider><Probe/></LangProvider>);
    const kickerEn = screen.getByTestId('hero-kicker').textContent;
    await userEvent.click(screen.getByRole('button', { name: /toggle/i }));
    expect(screen.getByTestId('lang').textContent).toBe('mr');
    const kickerMr = screen.getByTestId('hero-kicker').textContent;
    expect(kickerMr).not.toBe(kickerEn);
  });

  it('persists lang to localStorage', async () => {
    render(<LangProvider><Probe/></LangProvider>);
    await userEvent.click(screen.getByRole('button', { name: /toggle/i }));
    expect(localStorage.getItem('tdf.lang')).toBe('mr');
  });
});
