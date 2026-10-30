// Vitest setup: a self-contained in-memory localStorage (full Storage API),
// React's act() flag, and stubs for the download helpers exportFieldLog
// touches. The stub keeps tests deterministic no matter which jsdom
// polyfill the environment happens to provide.
import { beforeEach } from 'vitest';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Minimal in-memory Storage. Implements the full interface the field log
// relies on (getItem/setItem/removeItem/clear/length/key).
function createMemoryStorage() {
  const store = new Map();
  return {
    get length() {
      return store.size;
    },
    key(i) {
      return [...store.keys()][i] ?? null;
    },
    getItem(k) {
      return store.has(k) ? store.get(k) : null;
    },
    setItem(k, v) {
      store.set(String(k), String(v));
    },
    removeItem(k) {
      store.delete(k);
    },
    clear() {
      store.clear();
    },
  };
}

globalThis.localStorage = createMemoryStorage();

beforeEach(() => {
  globalThis.localStorage.clear();
  // jsdom lacks object-URL + anchor click; stub so exportFieldLog is testable.
  if (!URL.createObjectURL) URL.createObjectURL = () => 'blob:mock';
  if (!URL.revokeObjectURL) URL.revokeObjectURL = () => {};
  if (window.HTMLAnchorElement) {
    Object.defineProperty(window.HTMLAnchorElement.prototype, 'click', {
      configurable: true,
      value: function () {},
    });
  }
});
