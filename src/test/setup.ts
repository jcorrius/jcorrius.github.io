import { beforeEach, vi } from 'vitest';

// Mock intersection observer for tests
const mockIntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: vi.fn(() => []),
}));

globalThis.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;

// Setup DOM before each test
beforeEach(() => {
  document.body.innerHTML = '';
});
