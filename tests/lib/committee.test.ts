import { describe, it, expect } from 'vitest';
import { BOARD, COMMITTEE, type Member } from '@/lib/committee';

describe('BOARD', () => {
  it('has a chair', () => {
    expect(BOARD.chair).toBeDefined();
    expect(BOARD.chair.role).toBe('President');
  });
  it('has 2 vice-chairs', () => {
    expect(BOARD.vice).toHaveLength(2);
  });
  it('has 7 directors', () => {
    expect(BOARD.directors).toHaveLength(7);
  });
  it('all members have img, role, name, meta', () => {
    const all: Member[] = [BOARD.chair, ...BOARD.vice, ...BOARD.directors];
    all.forEach((m) => {
      expect(m.img).toBeTruthy();
      expect(m.role).toBeTruthy();
      expect(m.name).toBeTruthy();
      expect(m.meta).toBeTruthy();
    });
  });
});

describe('COMMITTEE', () => {
  it('has chair + vice + officers + executive', () => {
    expect(COMMITTEE.chair).toBeDefined();
    expect(COMMITTEE.vice).toHaveLength(2);
    expect(COMMITTEE.officers).toHaveLength(4);
    expect(COMMITTEE.executive).toHaveLength(6);
  });
});
