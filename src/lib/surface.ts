// Hero loss surface and optimizers (PRD Appendix B).
// Shared by build-time rendering and the browser animation.

export type Vec = [number, number];
export type OptName = 'sgd' | 'momentum' | 'adam';

export const DOMAIN = 4; // x and y in [-4, 4]
export const DEFAULT_START: Vec = [-2.0, 3.4];

const BOWL = 0.08;
// amplitude, center x, center y, width
const WELLS: ReadonlyArray<[number, number, number, number]> = [
  [-2.2, 1.6, -1.2, 0.9], // global minimum
  [-0.5, -1.8, 1.4, 0.5], // local minimum A
  [-1.0, -0.4, -2.0, 0.4], // local minimum B
];

export function f(x: number, y: number): number {
  let v = BOWL * (x * x + y * y);
  for (const [a, cx, cy, w] of WELLS) {
    const dx = x - cx;
    const dy = y - cy;
    v += a * Math.exp(-(dx * dx + dy * dy) / w);
  }
  return v;
}

export function grad(x: number, y: number): Vec {
  let gx = 2 * BOWL * x;
  let gy = 2 * BOWL * y;
  for (const [a, cx, cy, w] of WELLS) {
    const dx = x - cx;
    const dy = y - cy;
    const e = a * Math.exp(-(dx * dx + dy * dy) / w);
    gx += e * ((-2 * dx) / w);
    gy += e * ((-2 * dy) / w);
  }
  return [gx, gy];
}

function descend(start: Vec, steps = 400, lr = 0.2): Vec {
  let [x, y] = start;
  for (let i = 0; i < steps; i++) {
    const [gx, gy] = grad(x, y);
    x -= lr * gx;
    y -= lr * gy;
  }
  return [x, y];
}

export const GLOBAL_MIN: Vec = descend([1.55, -1.16]);
export const LOCAL_A: Vec = descend([-1.66, 1.29]);
export const LOCAL_B: Vec = descend([-0.37, -1.93]);
export const F_MIN = f(GLOBAL_MIN[0], GLOBAL_MIN[1]);

/** Displayed loss: 0 at the global minimum. */
export function loss(x: number, y: number): number {
  return f(x, y) - F_MIN;
}

export const LEARNING_RATES: Record<OptName, number> = {
  sgd: 0.1,
  momentum: 0.05,
  adam: 0.1,
};

export const OPT_LABELS: Record<OptName, string> = {
  sgd: 'SGD',
  momentum: 'Momentum',
  adam: 'Adam',
};

export type Stepper = (p: Vec) => { next: Vec; gradNorm: number };

export function createOptimizer(name: OptName, lr = LEARNING_RATES[name]): Stepper {
  let vx = 0, vy = 0; // momentum velocity
  let mx = 0, my = 0, sx = 0, sy = 0, t = 0; // adam moments
  const b1 = 0.9, b2 = 0.999, eps = 1e-8, beta = 0.9;

  return ([x, y]) => {
    const [gx, gy] = grad(x, y);
    const gradNorm = Math.hypot(gx, gy);
    if (name === 'sgd') {
      return { next: [x - lr * gx, y - lr * gy], gradNorm };
    }
    if (name === 'momentum') {
      vx = beta * vx + gx;
      vy = beta * vy + gy;
      return { next: [x - lr * vx, y - lr * vy], gradNorm };
    }
    t += 1;
    mx = b1 * mx + (1 - b1) * gx;
    my = b1 * my + (1 - b1) * gy;
    sx = b2 * sx + (1 - b2) * gx * gx;
    sy = b2 * sy + (1 - b2) * gy * gy;
    const mhx = mx / (1 - b1 ** t), mhy = my / (1 - b1 ** t);
    const shx = sx / (1 - b2 ** t), shy = sy / (1 - b2 ** t);
    return {
      next: [x - (lr * mhx) / (Math.sqrt(shx) + eps), y - (lr * mhy) / (Math.sqrt(shy) + eps)],
      gradNorm,
    };
  };
}

export interface Run {
  path: Vec[];
  settledAt: number; // index of the step where the run settled
}

/** Run an optimizer until it settles (tiny step and tiny gradient) or maxSteps. */
export function run(name: OptName, start: Vec, maxSteps = 600): Run {
  const step = createOptimizer(name);
  const path: Vec[] = [start];
  let p = start;
  for (let i = 1; i <= maxSteps; i++) {
    const { next, gradNorm } = step(p);
    path.push(next);
    const moved = Math.hypot(next[0] - p[0], next[1] - p[1]);
    p = next;
    if (moved < 1e-3 && gradNorm < 1e-2) return { path, settledAt: i };
    if (Math.abs(p[0]) > 12 || Math.abs(p[1]) > 12) break;
  }
  return { path, settledAt: path.length - 1 };
}

/** Map domain coordinates to the hero plot's 400 x 400 SVG space (y up). */
export const PLOT_SIZE = 400;
export function toPlot([x, y]: Vec): Vec {
  const s = PLOT_SIZE / (2 * DOMAIN);
  return [(x + DOMAIN) * s, (DOMAIN - y) * s];
}
export function fromPlot([px, py]: Vec): Vec {
  const s = PLOT_SIZE / (2 * DOMAIN);
  return [px / s - DOMAIN, DOMAIN - py / s];
}

export function pathD(points: Vec[]): string {
  return points
    .map((p, i) => {
      const [px, py] = toPlot(p);
      return `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`;
    })
    .join('');
}
