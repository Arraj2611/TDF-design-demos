import { describe, it, expect } from 'vitest';
import { VARIANTS, type Variant } from '@/lib/versions';

describe('VARIANTS registry', () => {
  it('registers exactly 10 variants', () => {
    expect(VARIANTS).toHaveLength(10);
  });
  it('every variant has required fields', () => {
    VARIANTS.forEach((v: Variant) => {
      expect(v.id).toMatch(/^v\d+$/);
      expect(v.slug).toMatch(/^v\d+$/);
      expect(v.label).toBeTruthy();
      expect(v.blurb).toBeTruthy();
      expect(v.swatch).toHaveLength(3);
      v.swatch.forEach((hex) => expect(hex).toMatch(/^#[0-9a-fA-F]{3,8}$/));
      expect(v.signature).toBeTruthy();
    });
  });
  it('ids are v1..v10 in order', () => {
    expect(VARIANTS.map((v) => v.id)).toEqual(['v1','v2','v3','v4','v5','v6','v7','v8','v9','v10']);
  });
});
