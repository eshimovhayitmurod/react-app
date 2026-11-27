import { ARC_STEPS, CARD_RADIUS, CURVE_BEND, CURVE_STEPS } from './constants';
import type { Pt, Rect } from './types';
export const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);
export const f1 = (v: number) => v.toFixed(1);
export const toPath = (pts: Pt[]) => {
   let len = 0;
   for (let i = 1; i < pts.length; i++) len += dist(pts[i - 1], pts[i]);
   return { d: 'M' + pts.map(q => `${f1(q[0])} ${f1(q[1])}`).join(' L'), len };
};
export const curvePath = (a: Pt, b: Pt, pref: Pt) => {
   const dx = b[0] - a[0],
      dy = b[1] - a[1];
   const sign = -dy * pref[0] + dx * pref[1] < 0 ? -1 : 1;
   const nx = -dy * CURVE_BEND * sign,
      ny = dx * CURVE_BEND * sign;
   const c1: Pt = [a[0] + dx / 3 + nx, a[1] + dy / 3 + ny];
   const c2: Pt = [a[0] + (2 * dx) / 3 + nx, a[1] + (2 * dy) / 3 + ny];
   const pts: Pt[] = [];
   for (let i = 0; i <= CURVE_STEPS; i++) {
      const t = i / CURVE_STEPS;
      const u = 1 - t;
      const w0 = u * u * u,
         w1 = 3 * u * u * t,
         w2 = 3 * u * t * t,
         w3 = t * t * t;
      pts.push([
         w0 * a[0] + w1 * c1[0] + w2 * c2[0] + w3 * b[0],
         w0 * a[1] + w1 * c1[1] + w2 * c2[1] + w3 * b[1],
      ]);
   }
   return toPath(pts);
};
export const outlineOf = (q: Rect, radius = CARD_RADIUS): Pt[] => {
   const r = Math.min(radius, (q.r - q.l) / 2, (q.b - q.t) / 2);
   const corners: [number, number, number][] = [
      [q.r - r, q.t + r, -Math.PI / 2],
      [q.r - r, q.b - r, 0],
      [q.l + r, q.b - r, Math.PI / 2],
      [q.l + r, q.t + r, Math.PI],
   ];
   const pts: Pt[] = [];
   corners.forEach(([cx, cy, a0]) => {
      for (let i = 0; i <= ARC_STEPS; i++) {
         const a = a0 + (Math.PI / 2) * (i / ARC_STEPS);
         pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
      }
   });
   return pts;
};
export const topRightOf = (q: Rect, radius = CARD_RADIUS): Pt => {
   const r = Math.min(radius, (q.r - q.l) / 2, (q.b - q.t) / 2);
   return [q.r - r + r * Math.SQRT1_2, q.t + r - r * Math.SQRT1_2];
};
export const borderHalves = (q: Rect, start: Pt) => {
   const ring = outlineOf(q);
   const n = ring.length;
   let best = 0,
      bestD = Infinity,
      bestP: Pt = ring[0];
   for (let i = 0; i < n; i++) {
      const a = ring[i],
         b = ring[(i + 1) % n];
      const vx = b[0] - a[0],
         vy = b[1] - a[1];
      const l2 = vx * vx + vy * vy || 1;
      const t = Math.max(
         0,
         Math.min(1, ((start[0] - a[0]) * vx + (start[1] - a[1]) * vy) / l2),
      );
      const proj: Pt = [a[0] + vx * t, a[1] + vy * t];
      const dd = dist(proj, start);
      if (dd < bestD) {
         bestD = dd;
         best = i;
         bestP = proj;
      }
   }
   const loop: Pt[] = [bestP];
   for (let k = 1; k <= n; k++) loop.push(ring[(best + k) % n]);
   loop.push(bestP);
   const total = toPath(loop).len;
   const walk = (pts: Pt[]) => {
      const out: Pt[] = [pts[0]];
      let acc = 0;
      for (let i = 1; i < pts.length; i++) {
         const seg = dist(pts[i - 1], pts[i]);
         if (acc + seg >= total / 2) {
            const k = (total / 2 - acc) / (seg || 1);
            out.push([
               pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k,
               pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k,
            ]);
            break;
         }
         acc += seg;
         out.push(pts[i]);
      }
      return toPath(out);
   };
   return [walk(loop), walk([...loop].reverse())];
};
