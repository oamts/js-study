import { describe, test, expect } from 'vitest';
import './reduce.js'; // side-effect: adds Array.prototype.myReduce

describe('Array.prototype.myReduce', () => {
  test('works with an initial value (sums)', () => {
    const arr = [1, 2, 3];
    const sum = arr.myReduce((acc, cur) => acc + cur, 0);
    expect(sum).toBe(6);
  });

  test('works without an initial value (uses first element as accumulator)', () => {
    const arr = [1, 2, 3];
    const sum = arr.myReduce((acc, cur) => acc + cur);
    expect(sum).toBe(6);
  });

  test('throws on empty array without initial value', () => {
    expect(() => {
      [].myReduce((a, b) => a + b);
    }).toThrow();
  });

  test('callback receives (previousValue, currentValue, currentIndex, array)', () => {
    const arr = [10, 20, 30];
    const calls = [];
    const result = arr.myReduce((prev, cur, idx, array) => {
      calls.push([prev, cur, idx, array === arr]);
      return prev + cur;
    }, 0);

    expect(result).toBe(60);
    expect(calls).toEqual([
      [0, 10, 0, true],
      [10, 20, 1, true],
      [30, 30, 2, true],
    ]);
  });

  test('sparse arrays skip missing elements', () => {
    const arr = [];
    arr[1] = 1;
    arr[3] = 2;

    const sum = arr.myReduce((acc, cur) => acc + cur, 0);
    expect(sum).toBe(3);
  });

  test('elements added after current index are visited', () => {
    const arr = [1, 2, 3];
    const result = arr.myReduce((acc, cur, idx, array) => {
      if (idx === 0) array.push(4);
      return acc + cur;
    }, 0);
    // 1 + 2 + 3 + 4 = 10
    expect(result).toBe(10);
  });

  test('throws if callback is not a function', () => {
    expect(() => {
      [1].myReduce(null, 0);
    }).toThrow();
  });
});
