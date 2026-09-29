import { describe, expect, it } from 'vitest';
import {
  DEFAULT_START, F_MIN, GLOBAL_MIN, LOCAL_A, LOCAL_B, createOptimizer, loss, run, type OptName,
} from '../src/lib/surface';

const near = (p: [number, number], q: [number, number], r = 0.1) =>
  Math.hypot(p[0] - q[0], p[1] - q[1]) < r;

describe('hero surface (PRD Appendix B)', () => {
  it('has the documented minima', () => {
    expect(F_MIN).toBeCloseTo(-1.890, 2);
    expect(near(GLOBAL_MIN, [1.55, -1.16], 0.02)).toBe(true);
    expect(loss(...LOCAL_A)).toBeCloseTo(1.77, 1);
    expect(loss(...LOCAL_B)).toBeCloseTo(1.20, 1);
    expect(loss(...DEFAULT_START)).toBeCloseTo(3.14, 1);
  });

  it('every optimizer decreases loss on a convex bowl', () => {
    for (const name of ['sgd', 'momentum', 'adam'] as OptName[]) {
      // near the global minimum the surface is locally convex
      const step = createOptimizer(name, 0.02);
      let p: [number, number] = [GLOBAL_MIN[0] + 0.4, GLOBAL_MIN[1] - 0.3];
      const before = loss(...p);
      for (let i = 0; i < 200; i++) p = step(p).next;
      expect(loss(...p)).toBeLessThan(before);
    }
  });

  it('SGD gets stuck in local minimum A from the default start', () => {
    const { path } = run('sgd', DEFAULT_START);
    expect(near(path[path.length - 1], LOCAL_A)).toBe(true);
  });

  it('Momentum and Adam reach the global minimum from the default start', () => {
    for (const name of ['momentum', 'adam'] as OptName[]) {
      const { path, settledAt } = run(name, DEFAULT_START);
      expect(near(path[path.length - 1], GLOBAL_MIN)).toBe(true);
      expect(settledAt).toBeGreaterThan(100);
      expect(settledAt).toBeLessThan(200);
    }
  });
});
