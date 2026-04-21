import { describe, it, expect } from 'vitest';
import { CONTENT, type Lang } from '@/lib/content';

describe('CONTENT dictionary', () => {
  it('has en and mr locales', () => {
    expect(CONTENT.en).toBeDefined();
    expect(CONTENT.mr).toBeDefined();
  });

  it('en and mr share the same top-level keys', () => {
    const enKeys = Object.keys(CONTENT.en).sort();
    const mrKeys = Object.keys(CONTENT.mr).sort();
    expect(mrKeys).toEqual(enKeys);
  });

  const langs: Lang[] = ['en', 'mr'];
  langs.forEach((lang) => {
    it(`${lang} has required sections`, () => {
      const c = CONTENT[lang];
      expect(c.nav).toBeTruthy();
      expect(c.hero).toBeTruthy();
      expect(c.about).toBeTruthy();
      expect(c.members).toBeTruthy();
      expect(c.committee).toBeTruthy();
      expect(c.facilities).toBeTruthy();
      expect(c.news).toBeTruthy();
      expect(c.events).toBeTruthy();
      expect(c.solapur).toBeTruthy();
      expect(c.contact).toBeTruthy();
      expect(c.foot).toBeTruthy();
    });

    it(`${lang} hero.stats includes "15,000+" power looms stat`, () => {
      const looms = CONTENT[lang].hero.stats.find((s) => /15,?000|१५,?०००/.test(s.n));
      expect(looms).toBeDefined();
    });

    it(`${lang} about timeline includes 1761 Peshwa entry`, () => {
      const peshwa = CONTENT[lang].about.timeline.find((e) => e.y === '1761' || e.y === '१७६१');
      expect(peshwa).toBeDefined();
    });
  });
});
