import { describe, test, expect } from 'vitest';
import flatten from './flatten.js';

describe('flatten', () => {
  test('single-level arrays are unaffected', () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('inner arrays are flattened into a single level', () => {
    expect(flatten([1, [2, 3]])).toEqual([1, 2, 3]);
    expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
  });

  test('flattens recursively', () => {
    expect(flatten([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
  });

  test('handles empty arrays', () => {
    expect(flatten([])).toEqual([]);
  });

  test('handles arrays with mixed types', () => {
    expect(flatten([1, 'a', [2, 'b']])).toEqual([1, 'a', 2, 'b']);
  });

  test('handles deeply nested empty arrays', () => {
    expect(flatten([1, [], [2, []]])).toEqual([1, 2]);
  });
});
