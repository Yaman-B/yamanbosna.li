// Build-time contour generation. Nothing here ships to the browser.
import { contours } from 'd3-contour';

export interface ContourSpec {
  fn: (x: number, y: number) => number;
  x0: number; x1: number; y0: number; y1: number; // sampled domain (extend past the view to hide edge artifacts)
  nx: number; ny: number;
  thresholds: number[];
  /** Map a domain point to SVG coordinates. */
  project: (x: number, y: number) => [number, number];
  /** Decimal places for output coordinates. */
  precision?: number;
}

export interface ContourLine { value: number; d: string }

export function contourLines(spec: ContourSpec): ContourLine[] {
  const { fn, x0, x1, y0, y1, nx, ny, thresholds, project, precision = 1 } = spec;
  const dx = (x1 - x0) / nx;
  const dy = (y1 - y0) / ny;
  const values = new Float64Array(nx * ny);
  // d3-contour places sample i at grid coordinate i + 0.5
  for (let j = 0; j < ny; j++) {
    const y = y0 + (j + 0.5) * dy;
    for (let i = 0; i < nx; i++) values[j * nx + i] = fn(x0 + (i + 0.5) * dx, y);
  }
  const gen = contours().size([nx, ny]).thresholds(thresholds);
  return gen(Array.from(values)).map((mp) => {
    let d = '';
    for (const polygon of mp.coordinates) {
      for (const ring of polygon) {
        ring.forEach(([gx, gy], k) => {
          const [px, py] = project(x0 + gx * dx, y0 + gy * dy);
          d += `${k ? 'L' : 'M'}${px.toFixed(precision)} ${py.toFixed(precision)}`;
        });
        d += 'Z';
      }
    }
    return { value: mp.value, d };
  });
}

/** Deterministic pseudo-random generator (mulberry32). */
export function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth terrain-like field for the page background: Gaussian hills plus gentle waves. */
export function terrain(seed = 7) {
  const r = rng(seed);
  const hills = Array.from({ length: 14 }, () => ({
    cx: r() * 1.5, cy: r(), a: (r() - 0.35) * 2, w: 0.01 + r() * 0.05,
  }));
  return (x: number, y: number) => {
    let v = 0.25 * Math.sin(3.1 * x + 1.3) * Math.cos(2.3 * y - 0.4);
    for (const h of hills) {
      const ddx = x - h.cx, ddy = y - h.cy;
      v += h.a * Math.exp(-(ddx * ddx + ddy * ddy) / h.w);
    }
    return v;
  };
}
