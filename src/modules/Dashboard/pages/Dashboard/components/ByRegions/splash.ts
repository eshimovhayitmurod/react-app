import {
   SPLASH_MS,
   SPLASH_RINGS,
   SPLASH_SQUASH,
   SPLASH_SQUASH_MAX,
   TRAIL_COLOR,
} from './constants';
import type { Pt } from './types';
const reduced = () =>
   window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const WOBBLE = [0, 1, -0.45, 0.18, -0.06, 0];
const WOBBLE_AT = [0, 0.14, 0.38, 0.6, 0.8, 1];
export const splash = (el: HTMLElement, at: Pt, dark: boolean) => {
   if (reduced()) return [];
   const w = el.offsetWidth,
      h = el.offsetHeight;
   if (!w || !h) return [];
   const [x, y] = at;
   const cx = w / 2,
      cy = h / 2;
   const angle = Math.atan2(cy - y, cx - x);
   const deg = (angle * 180) / Math.PI;
   const extent =
      Math.abs(Math.cos(angle)) * w + Math.abs(Math.sin(angle)) * h || 1;
   const s = Math.min(SPLASH_SQUASH_MAX, SPLASH_SQUASH / extent);
   const origin = `${2 * cx - x}px ${2 * cy - y}px`;
   const frame = (k: number, offset: number): Keyframe => ({
      offset,
      transformOrigin: origin,
      transform: `rotate(${deg}deg) scale(${1 - s * k}, ${1 + s * 0.6 * k}) rotate(${-deg}deg)`,
   });
   const animations: Animation[] = [];
   animations.push(
      el.animate(
         WOBBLE.map((k, i) => frame(k, WOBBLE_AT[i])),
         { duration: SPLASH_MS, easing: 'cubic-bezier(.3,.7,.4,1)' },
      ),
   );
   const layer = document.createElement('span');
   layer.setAttribute('aria-hidden', 'true');
   Object.assign(layer.style, {
      position: 'absolute',
      inset: '0',
      zIndex: '-1',
      overflow: 'hidden',
      borderRadius: 'inherit',
      pointerEvents: 'none',
   });
   el.appendChild(layer);
   const r = Math.max(
      Math.hypot(x, y),
      Math.hypot(w - x, y),
      Math.hypot(x, h - y),
      Math.hypot(w - x, h - y),
   );
   const rgb = TRAIL_COLOR.join(',');
   const alpha = dark ? 0.55 : 0.4;
   for (let i = 0; i < SPLASH_RINGS; i++) {
      const ring = document.createElement('span');
      Object.assign(ring.style, {
         position: 'absolute',
         left: `${x - r}px`,
         top: `${y - r}px`,
         width: `${2 * r}px`,
         height: `${2 * r}px`,
         borderRadius: '50%',
         border: `1.5px solid rgba(${rgb},${alpha})`,
         boxShadow: `0 0 12px rgba(${rgb},${alpha * 0.5}), inset 0 0 12px rgba(${rgb},${alpha * 0.5})`,
         transform: 'scale(0)',
         opacity: '0',
      });
      layer.appendChild(ring);
      animations.push(
         ring.animate(
            [
               { transform: 'scale(0)', opacity: 1 },
               { transform: 'scale(1)', opacity: 0 },
            ],
            {
               duration: SPLASH_MS * 1.6,
               delay: i * SPLASH_MS * 0.22,
               easing: 'cubic-bezier(.2,.6,.35,1)',
               fill: 'both',
            },
         ),
      );
   }
   const cleanup = () => layer.remove();
   Promise.all(animations.map(a => a.finished))
      .catch(() => undefined)
      .finally(cleanup);
   return animations;
};
