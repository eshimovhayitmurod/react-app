import { memo, useEffect, useId, useMemo, useRef } from 'react';
import {
   BORDER_TIME,
   CYCLE_MS,
   HIT_AT,
   LINE_WIDTH,
   SLICE_PAD,
   TRAIL_COLOR,
   TRAIL_MAX,
   TRAIL_RATIO,
   TRAIL_SLICES,
   WHITE,
} from './constants';
import { borderHalves, curvePath, topRightOf } from './geometry';
import { mixRgb } from './helpers';
import type { Comet, Line, Pt, Rect } from './types';
type Slice = {
   cap: 'round' | 'butt';
   dash: string;
   from: number;
   stroke: string;
   values: string;
};
export type Hit = { rect: Rect; at: Pt };
type CometView = Comet & { id: string; keyTimes: string; slices: Slice[] };
const DUR = `${CYCLE_MS}ms`;
const fr = (v: number) => v.toFixed(4);
// Kometa boshlari tegadigan kartalar va nuqtalar: [qator, batafsil]
export const hitsOf = (line: Line): Hit[] => {
   const hits: Hit[] = [{ rect: line.row, at: topRightOf(line.row) }];
   if (line.detail)
      hits.push({
         rect: line.detail,
         at: [(line.detail.l + line.detail.r) / 2, line.detail.t],
      });
   return hits;
};
const buildComets = (line: Line): Comet[] => {
   const comet = (
      x: { d: string; len: number },
      t0: number,
      t1: number,
      track: boolean,
   ): Comet => ({
      ...x,
      trail: Math.max(1, Math.min(TRAIL_MAX, x.len * TRAIL_RATIO)),
      t0,
      t1,
      track,
   });
   const from: Pt = [line.mx, line.my];
   const comets: Comet[] = [];
   hitsOf(line).forEach(({ rect, at }) => {
      comets.push(comet(curvePath(from, at, [0, -1]), 0, HIT_AT, true));
      borderHalves(rect, at).forEach(half =>
         comets.push(comet(half, HIT_AT, HIT_AT + BORDER_TIME, false)),
      );
   });
   return comets;
};
// Dum bo'laklari va ularning animatsiya qiymatlari bir marta hisoblanadi
const buildView = (comet: Comet, id: string, dark: boolean): CometView => {
   const travel = comet.len + comet.trail + SLICE_PAD;
   const tEnd = Math.min(
      1,
      comet.t0 + (comet.t1 - comet.t0) * (travel / comet.len),
   );
   const keyTimes = (
      comet.t0 ? ['0', fr(comet.t0), fr(tEnd), '1'] : ['0', fr(tEnd), '1']
   ).join(';');
   const s = comet.trail / TRAIL_SLICES;
   const slices = Array.from({ length: TRAIL_SLICES }, (_, i): Slice => {
      const u = (i + 1) / TRAIL_SLICES;
      const tone = mixRgb(TRAIL_COLOR, WHITE, dark ? u ** 6 * 0.65 : 0);
      const len = s + 0.6;
      const from = (TRAIL_SLICES - i) * s + SLICE_PAD;
      const to = from - travel;
      return {
         cap: i === TRAIL_SLICES - 1 ? 'round' : 'butt',
         dash: `${len} ${travel + comet.trail + len}`,
         from,
         stroke: `rgba(${tone},${(u * u).toFixed(3)})`,
         values: (comet.t0 ? [from, from, to, to] : [from, to, to]).join(';'),
      };
   });
   return { ...comet, id, keyTimes, slices };
};
const ConnectorLine = memo(
   ({
      dark,
      line,
      onHit,
      track,
   }: {
      dark: boolean;
      line: Line;
      onHit?: (hits: Hit[]) => void;
      track: string;
   }) => {
      // useId belgilari (`:`, `«»`) href fragmentida muammo bermasligi uchun
      const uid = 'cl' + useId().replace(/[^\w-]/g, '');
      const comets = useMemo(() => buildComets(line), [line]);
      const views = useMemo(
         () =>
            comets.map((comet, i) =>
               buildView(comet, `${uid}-comet-${i}`, dark),
            ),
         [comets, dark, uid],
      );
      const svgRef = useRef<SVGSVGElement>(null);
      const onHitRef = useRef(onHit);
      onHitRef.current = onHit;
      const hitsRef = useRef<Hit[]>([]);
      hitsRef.current = useMemo(() => hitsOf(line), [line]);
      // SMIL vaqt chizig'iga bog'langan: har siklda kometa tekkan zahoti chaqiriladi
      useEffect(() => {
         const svg = svgRef.current;
         if (!svg) return;
         const cycle = CYCLE_MS / 1000;
         const cycleOf = () =>
            Math.floor(svg.getCurrentTime() / cycle - HIT_AT);
         let fired = cycleOf();
         let frame = requestAnimationFrame(function tick() {
            const n = cycleOf();
            if (n > fired) {
               fired = n;
               onHitRef.current?.(hitsRef.current);
            }
            frame = requestAnimationFrame(tick);
         });
         return () => cancelAnimationFrame(frame);
      }, []);
      return (
         <svg
            aria-hidden
            ref={svgRef}
            className='pointer-events-none absolute top-0 left-0 z-10 h-full w-full overflow-visible'
            viewBox={`0 0 ${line.w} ${line.h}`}
         >
            {/* Har bir yo'l bir marta e'lon qilinadi, bo'laklar unga <use> orqali murojaat qiladi */}
            <defs>
               {views.map(view => (
                  <path d={view.d} id={view.id} key={view.id} />
               ))}
            </defs>
            {views
               .filter(view => view.track)
               .map(view => (
                  <use
                     fill='none'
                     href={`#${view.id}`}
                     key={`track-${view.id}`}
                     stroke={track}
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth={LINE_WIDTH}
                  />
               ))}
            {views.map(view => (
               <g
                  fill='none'
                  key={view.id}
                  strokeLinejoin='round'
                  strokeWidth={LINE_WIDTH}
               >
                  {view.slices.map(slice => (
                     <use
                        href={`#${view.id}`}
                        key={slice.from}
                        stroke={slice.stroke}
                        strokeDasharray={slice.dash}
                        strokeDashoffset={slice.from}
                        strokeLinecap={slice.cap}
                     >
                        <animate
                           attributeName='stroke-dashoffset'
                           calcMode='linear'
                           dur={DUR}
                           keyTimes={view.keyTimes}
                           repeatCount='indefinite'
                           values={slice.values}
                        />
                     </use>
                  ))}
               </g>
            ))}
         </svg>
      );
   },
);
export default ConnectorLine;
