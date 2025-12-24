import { describe, test, expect } from 'vitest';
import throttle from './throttle.js';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

describe('throttle', () => {
  test('can be initialized', () => {
    const increment = throttle(() => {}, 50);
    expect(increment).toBeInstanceOf(Function);
  });

  test('invokes callback immediately', () => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 50);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);
  });

  test('throttles immediate invocations', () => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 50);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);
    increment();
    expect(i).toBe(1);
  });

  test('throttles delayed invocations', async () => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 100);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);

    await delay(25);
    increment();
    expect(i).toBe(1);

    await delay(25);
    increment();
    expect(i).toBe(1);
  });

  test('allows calls after wait period', async () => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 100);

    increment();
    expect(i).toBe(1);

    await delay(110);
    increment();
    expect(i).toBe(2);
  });

  test('passes arguments to the callback', () => {
    let args;
    const func = (...a) => { args = a; };
    const throttled = throttle(func, 100);
    throttled('a', 2, { x: 1 });
    expect(args).toEqual(['a', 2, { x: 1 }]);
  });

  test('preserves this context', () => {
    const obj = { val: 0 };
    const throttled = throttle(function (delta) { this.val += delta; }, 100);
    obj.throttled = throttled;
    obj.throttled(5);
    expect(obj.val).toBe(5);
  });

  test('handles multiple calls after wait', async () => {
    let i = 0;
    const increment = throttle(() => { i++; }, 100);
    increment(); // i = 1
    await delay(110);
    increment(); // i = 2
    increment(); // ignored
    await delay(110);
    increment(); // i = 3
    expect(i).toBe(3);
  });

  test('handles wait of 0', async () => {
    let i = 0;
    const increment = throttle(() => { i++; }, 0);
    increment(); // i = 1
    increment(); // since wait=0, should invoke immediately? Wait, throttle with 0 might allow every call, but typically throttle with 0 is immediate every time.
    // Actually, for throttle, if wait=0, it might invoke every call, but the description says "at most once every X milliseconds", so for X=0, every call.
    // But the implementation might need to handle it.
    // For now, assume it invokes every call if wait=0.
    expect(i).toBe(2);
  });
});
