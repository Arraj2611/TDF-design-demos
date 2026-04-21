import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => { cleanup(); });

// IntersectionObserver polyfill for jsdom
class IO {
  observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
  root = null; rootMargin = ''; thresholds = [];
}
// @ts-expect-error assign polyfill
globalThis.IntersectionObserver = IO;

// matchMedia polyfill
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (q: string) => ({
    matches: false, media: q, onchange: null,
    addListener() {}, removeListener() {},
    addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; },
  }),
});
