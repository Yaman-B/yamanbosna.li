// Page-background contour field, generated once at build time (PRD 5.4).
// Used as a CSS mask, so the stroke color only needs to be opaque.
import type { APIRoute } from 'astro';
import { contourLines, terrain } from '../lib/contours';

export const GET: APIRoute = () => {
  const fn = terrain(11);
  const nx = 132, ny = 90;
  const x0 = -0.06, x1 = 1.56, y0 = -0.06, y1 = 1.06;
  let lo = Infinity, hi = -Infinity;
  for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) {
    const v = fn(x0 + ((x1 - x0) * i) / nx, y0 + ((y1 - y0) * j) / ny);
    lo = Math.min(lo, v); hi = Math.max(hi, v);
  }
  const n = 18;
  const thresholds = Array.from({ length: n }, (_, k) => lo + ((hi - lo) * (k + 0.5)) / n);
  const lines = contourLines({ fn, x0, x1, y0, y1, nx, ny, thresholds, project: (x, y) => [x * 1000, y * 1000], precision: 0 });

  const paths = lines
    .map((l, k) => `<path d="${l.d}" stroke-width="${k % 4 === 2 ? 2.2 : 1.2}"/>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1000" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#000" stroke-linejoin="round">${paths}</g></svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
