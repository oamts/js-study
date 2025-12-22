import { describe, test, expect } from 'vitest';
import debounce from './debounce.js';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

describe('debounce', () => {
  test('can be initialized', () => {
    const increment = debounce(() => {}, 50);
    expect(increment).toBeTruthy();
  });

  test('executes after duration', async () => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 10);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(0);

    await delay(20);
    expect(i).toBe(1);
  });

  describe('uses arguments', () => {
    test('called once', async () => {
      let i = 21;
      const increment = debounce((a, b) => {
        i += a * b;
      }, 10);

      expect(i).toBe(21);
      increment(3, 7);
      expect(i).toBe(21);

      await delay(20);
      expect(i).toBe(42);
    });

    test('uses arguments of latest invocation', async () => {
      let i = 21;
      const increment = debounce((a, b) => {
        i += a * b;
      }, 10);

      expect(i).toBe(21);
      increment(3, 7);
      increment(4, 5);
      expect(i).toBe(21);

      await delay(20);
      expect(i).toBe(41);
    });
  });

  test('execute once even after calling it multiple times', async () => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 20);

    expect(i).toBe(0);
    increment();
    increment();
    increment();
    increment();
    expect(i).toBe(0);

    // Should not fire yet.
    await delay(10);
    expect(i).toBe(0);

    await delay(20);
    expect(i).toBe(1);
  });

  test('duration extended if called again during window', async () => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 100);

    expect(i).toBe(0);
    increment();
    increment();
    expect(i).toBe(0);

    // Should not fire yet.
    await delay(50);
    expect(i).toBe(0);
    increment();
    expect(i).toBe(0);

    await delay(75); // now ~125ms since start
    expect(i).toBe(0);

    // Wait longer to accommodate unreliable timers (match original intent)
    await delay(1375); // reach ~1500ms total
    expect(i).toBe(1);
  });

  test('callbacks can access `this`', async () => {
    const increment = debounce(function (delta) {
      this.val += delta;
    }, 10);

    const obj = {
      val: 2,
      increment,
    };

    expect(obj.val).toBe(2);
    obj.increment(3);
    expect(obj.val).toBe(2);

    await delay(20);
    expect(obj.val).toBe(5);
  });
});
