import { Fragment, memo, RefObject, useMemo, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { fmt } from '../../helpers';
import {
   MAP_CODES,
   MARKER_STYLE,
   NO_POINTER,
   SKELETON,
   TK_INSET,
   type Palette,
} from './constants';
import { GEO } from './geo';
import { mix, regionName } from './helpers';
import type { Handlers, Region } from './types';
type RegionMapProps = Handlers & {
   active: number;
   c: Palette;
   loading: boolean;
   paused: boolean;
   onTogglePause: () => void;
   markerRef: RefObject<SVGCircleElement | null>;
   regions: Region[];
};
const RegionMap = memo(
   ({
      active,
      c,
      loading,
      paused,
      onTogglePause,
      markerRef,
      onPick,
      onHoverStart,
      onHoverEnd,
      regions,
   }: RegionMapProps) => {
      const { t } = useTranslation('dashboard');
      const ar = regions[active];
      const isTK = ar.code === 'UZ-TK';
      const g = ar.code ? GEO[ar.code] : undefined;
      const marker = isTK
         ? { x: TK_INSET.cx, y: TK_INSET.cy }
         : g
           ? { x: g.cx, y: g.cy }
           : null;
      const indexByCode = useMemo(() => {
         const map: Record<string, number> = {};
         regions.forEach((r, i) => {
            if (r.code && map[r.code] === undefined) map[r.code] = i;
         });
         return map;
      }, [regions]);
      const tkIndex = indexByCode['UZ-TK'] ?? -1;
      const tkOn = tkIndex === active;
      const { lo, hi } = useMemo(() => {
         const vals = regions.map(r => r.value);
         return { lo: Math.min(...vals), hi: Math.max(...vals) };
      }, [regions]);
      const fills = useMemo(
         () =>
            regions.map(r => {
               const k = hi > lo ? (r.value - lo) / (hi - lo) : 0;
               return c.levels[Math.min(2, Math.floor(k * 3))];
            }),
         [c, hi, lo, regions],
      );
      const emptyFill = useMemo(() => mix(c.seqLo, c.seqLo, 0), [c]);
      const fillOf = (i: number | undefined) =>
         loading || i === undefined || i < 0 ? emptyFill : fills[i];
      const legend = useMemo(() => {
         const [g, y, r] = c.levels;
         return `linear-gradient(90deg, ${g} 0 33.33%, ${y} 33.33% 66.66%, ${r} 66.66% 100%)`;
      }, [c]);
      return (
         <div className='col-span-2'>
            <div
               className='status-card spotlight-card flex h-full flex-col gap-3.5 p-5'
               style={{ '--status-color': '#2F6FEB55' } as CSSProperties}
            >
               <div className='flex items-center justify-end gap-2'>
                  <span className='inline-flex h-7.5 items-center gap-2 rounded-full bg-[#2F6FEB1A] px-3 text-[13px] font-semibold dark:bg-[#5B9BFF24]'>
                     <span className='size-2 rounded-full bg-[#2F6FEB] dark:bg-[#5B9BFF]' />
                     {regionName(t, ar, true)}
                  </span>
                  <button
                     aria-label={paused ? t('resume') : t('pause')}
                     className='flex size-9.5 cursor-pointer items-center justify-center rounded-[11px] focus:outline-2 focus:outline-solid focus:outline-[#3a79f3] text-[#3D4757] dark:text-[#A3AFBF] border border-[#E2E7EE] dark:border-[#232D3B]'
                     onClick={onTogglePause}
                     type='button'
                  >
                     {paused ? (
                        <svg
                           width='14'
                           height='14'
                           viewBox='0 0 24 24'
                           fill='currentColor'
                           aria-hidden
                        >
                           <path d='M7 4v16l13-8z' />
                        </svg>
                     ) : (
                        <svg
                           width='14'
                           height='14'
                           viewBox='0 0 24 24'
                           fill='currentColor'
                           aria-hidden
                        >
                           <rect x='6' y='4' width='4' height='16' rx='1' />
                           <rect x='14' y='4' width='4' height='16' rx='1' />
                        </svg>
                     )}
                  </button>
               </div>
               <div className='flex flex-1 items-center'>
                  <svg
                     aria-label={t('map_label')}
                     className='h-auto w-full overflow-visible'
                     role='img'
                     viewBox='0 0 1000 655'
                  >
                     {MAP_CODES.map(code => {
                        const i = indexByCode[code];
                        const r = i === undefined ? undefined : regions[i];
                        const on = i === active;
                        const tk = code === 'UZ-TK';
                        return (
                           <path
                              className={r ? 'cursor-pointer' : undefined}
                              d={GEO[code].d}
                              fillRule='evenodd'
                              key={code}
                              onClick={r ? () => onPick(i) : undefined}
                              onMouseEnter={
                                 r ? () => onHoverStart(i) : undefined
                              }
                              onMouseLeave={r ? onHoverEnd : undefined}
                              style={{
                                 fill: on ? c.hl : fillOf(i),
                                 strokeLinejoin: 'round',
                                 strokeWidth: tk ? 2 : 1.5,
                                 stroke: tk ? (on ? c.hl : c.text2) : c.surface,
                              }}
                           >
                              {r && (
                                 <title>
                                    {regionName(t, r)}: {fmt(r.value)}
                                 </title>
                              )}
                           </path>
                        );
                     })}
                     <circle
                        cx={770.4}
                        cy={332.1}
                        r={14}
                        fill='none'
                        stroke={tkOn ? c.hl : c.strong}
                        strokeWidth={1.5}
                        vectorEffect='non-scaling-stroke'
                     />
                     <path
                        d='M784.4 332.1 H796 V114 H812'
                        fill='none'
                        stroke={tkOn ? c.hl : c.strong}
                        strokeWidth={1.5}
                        strokeDasharray='6 5'
                        vectorEffect='non-scaling-stroke'
                     />
                     <rect
                        x={TK_INSET.x}
                        y={TK_INSET.y}
                        width={TK_INSET.size}
                        height={TK_INSET.size}
                        rx={16}
                        fill={c.surface}
                        stroke={tkOn ? c.hl : c.strong}
                        strokeWidth={1.5}
                        vectorEffect='non-scaling-stroke'
                     />
                     <g
                        transform={`translate(${TK_INSET.cx} ${TK_INSET.cy}) scale(${TK_INSET.scale}) translate(${-TK_INSET.ox} ${-TK_INSET.oy})`}
                     >
                        <path
                           d={GEO['UZ-TK'].d}
                           onClick={
                              tkIndex >= 0 ? () => onPick(tkIndex) : undefined
                           }
                           onMouseEnter={
                              tkIndex >= 0
                                 ? () => onHoverStart(tkIndex)
                                 : undefined
                           }
                           onMouseLeave={tkIndex >= 0 ? onHoverEnd : undefined}
                           className={
                              tkIndex >= 0 ? 'cursor-pointer' : undefined
                           }
                           vectorEffect='non-scaling-stroke'
                           style={{
                              fill: tkOn ? c.hl : fillOf(tkIndex),
                              stroke: tkOn ? c.hl : c.text2,
                              strokeWidth: 2,
                              strokeLinejoin: 'round',
                              transition: 'fill .45s ease',
                           }}
                        >
                           {tkIndex >= 0 && (
                              <title>
                                 {t('tashkent_city')}:{' '}
                                 {fmt(regions[tkIndex].value)}
                              </title>
                           )}
                        </path>
                     </g>
                     <text
                        x={TK_INSET.cx}
                        y={188}
                        textAnchor='middle'
                        style={{
                           fontSize: 18,
                           fontWeight: 600,
                           fill: c.text2,
                        }}
                     >
                        {t('tashkent_city')}
                     </text>
                     {!isTK && g && (
                        <path
                           d={g.d}
                           fill='none'
                           fillRule='evenodd'
                           stroke={c.hl}
                           strokeWidth={2}
                           strokeLinejoin='round'
                           style={NO_POINTER}
                        />
                     )}
                     {marker && (
                        <Fragment>
                           <circle
                              cx={marker.x}
                              cy={marker.y}
                              r={9}
                              fill={c.hl}
                              style={MARKER_STYLE}
                           />
                           <circle
                              cx={marker.x}
                              cy={marker.y}
                              r={9}
                              fill={c.hl}
                              style={MARKER_STYLE}
                           />
                           <circle
                              ref={markerRef}
                              cx={marker.x}
                              cy={marker.y}
                              r={8}
                              fill={c.hl}
                              stroke={c.surface}
                              strokeWidth={3}
                              style={NO_POINTER}
                           />
                        </Fragment>
                     )}
                  </svg>
               </div>
               <div className='flex items-center gap-2.5 text-xs text-[#5E6B7D] dark:text-[#8A97A8]'>
                  <span>{t('less')}</span>
                  <span
                     className='h-2 w-40 rounded-full'
                     style={{ background: legend }}
                  />
                  <span>{t('more')}</span>
                  {loading ? (
                     <span
                        className={`ml-auto h-4 w-20 rounded-md ${SKELETON}`}
                     />
                  ) : (
                     <span className='ml-auto font-mono'>
                        {fmt(lo)} – {fmt(hi)}
                     </span>
                  )}
               </div>
            </div>
         </div>
      );
   },
);
export default RegionMap;
