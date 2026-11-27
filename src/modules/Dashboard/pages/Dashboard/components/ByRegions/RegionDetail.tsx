import { Fragment, memo, RefObject, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
   Bar,
   BarChart,
   LabelList,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
} from 'recharts';
import { fmt, pct } from '../../helpers';
import ChartTooltip from '../ChartTooltip';
import Icon from '../Icon';
import {
   BAR_RADIUS,
   CHART_MARGIN,
   NAV_BTN,
   SKELETON,
   X_DOMAIN,
   type Palette,
} from './constants';
import { fmtLabel, regionName } from './helpers';
import type { Region } from './types';
const SKELETON_BARS = ['90%', '75%', '60%', '45%', '30%'];
type RegionDetailProps = {
   active: number;
   c: Palette;
   onPick: (i: number) => void;
   detailRef: RefObject<HTMLDivElement | null>;
   loading: boolean;
   regions: Region[];
   total: number;
};
const RegionDetail = memo(
   ({
      active,
      c,
      onPick,
      detailRef,
      loading,
      regions,
      total,
   }: RegionDetailProps) => {
      const { t } = useTranslation('dashboard');
      const ar = regions[active];
      const kpis = useMemo(
         () => [
            {
               label: t('brought_in'),
               value: fmt(ar.value),
               foot: t('rank_in_republic', { rank: active + 1 }),
               color: c.s2,
            },
            {
               label: t('released'),
               value: fmt(ar.closed),
               foot: t('of_brought_in', { percent: pct(ar.closed, ar.value) }),
               color: c.s3,
            },
            {
               label: t('republic_share'),
               value: pct(ar.value, total),
               foot: t('of_total', { total: fmt(total) }),
               color: c.s1,
            },
            {
               label: t('remaining'),
               value: fmt(ar.placed),
               foot: t('current_state'),
               color: c.unk,
            },
         ],
         [active, ar, c, total, t],
      );
      const tick = useMemo(() => ({ fill: c.text, fontSize: 14 }), [c]);
      const labelStyle = useMemo(
         () => ({
            fill: c.text2,
            fontSize: 13,
            fontFamily: 'JetBrains Mono, monospace',
         }),
         [c],
      );
      const prev = useCallback(() => onPick(active - 1), [onPick, active]);
      const next = useCallback(() => onPick(active + 1), [onPick, active]);
      return (
         <div ref={detailRef} className='col-span-4'>
            <article className='spotlight-card flex flex-col gap-5 rounded-2xl border border-solid border-[#e2e7ee] bg-[#FFFFFF] px-6 py-5.5 dark:border-[#232d3b] dark:bg-[#121822]'>
               <div className='flex flex-wrap items-start justify-between gap-4'>
                  <div className='flex items-center gap-4'>
                     <span className='flex size-14 shrink-0 items-center justify-center rounded-[18px] bg-[#2F6FEB1A] text-[#2F6FEB] dark:bg-[#5B9BFF24] dark:text-[#5B9BFF]'>
                        <Icon
                           d='M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'
                           size={26}
                        />
                     </span>
                     <span className='text-[26px] font-extrabold tracking-[-0.02em]'>
                        {regionName(t, ar)}
                     </span>
                  </div>
                  <div className='flex gap-2'>
                     <button
                        aria-label={t('prev_region')}
                        className={NAV_BTN}
                        onClick={prev}
                        type='button'
                     >
                        <Icon d='M15 6l-6 6 6 6' size={16} stroke={2} />
                     </button>
                     <button
                        aria-label={t('next_region')}
                        className={NAV_BTN}
                        onClick={next}
                        type='button'
                     >
                        <Icon d='M9 6l6 6-6 6' size={16} stroke={2} />
                     </button>
                  </div>
               </div>
               <div className='flex flex-wrap gap-6'>
                  <div className='grid min-w-0 flex-[1_1_380px] grid-cols-2 gap-3'>
                     {kpis.map(kpi => (
                        <div
                           key={kpi.label}
                           className='flex flex-col gap-1.5 rounded-[18px] border border-[#E2E7EE] bg-[#FFFFFF] px-4.5 py-4 dark:border-[#232D3B] dark:bg-[#121822]'
                        >
                           <span className='flex items-center gap-2 text-[13px] text-[#3D4757] dark:text-[#A3AFBF]'>
                              <span
                                 className='size-2.5 rounded-[3px]'
                                 style={{ background: kpi.color }}
                              />
                              {kpi.label}
                           </span>
                           {loading ? (
                              <Fragment>
                                 <span
                                    className={`h-8.5 w-24 rounded-lg ${SKELETON}`}
                                 />
                                 <span
                                    className={`h-4 w-32 rounded-md ${SKELETON}`}
                                 />
                              </Fragment>
                           ) : (
                              <Fragment>
                                 <span className='text-[28px] font-extrabold tracking-[-0.02em] tabular-nums'>
                                    {kpi.value}
                                 </span>
                                 <span className='text-xs text-[#5E6B7D] dark:text-[#8A97A8]'>
                                    {kpi.foot}
                                 </span>
                              </Fragment>
                           )}
                        </div>
                     ))}
                  </div>
                  <div className='flex min-w-0 flex-[1.3_1_420px] flex-col gap-2.5 rounded-[18px] border border-[#E2E7EE] bg-[#F6F8FB] px-5 py-4.5 dark:border-[#232D3B] dark:bg-[#0D121A]'>
                     <span className='text-sm font-bold'>
                        {t('districts_top5')}
                     </span>
                     {loading ? (
                        <div
                           className='flex flex-col justify-around'
                           style={{ height: 172 }}
                        >
                           {SKELETON_BARS.map(width => (
                              <span
                                 className={`h-4 rounded-full ${SKELETON}`}
                                 key={width}
                                 style={{ width }}
                              />
                           ))}
                        </div>
                     ) : (
                        <div style={{ height: 172 }}>
                           <ResponsiveContainer width='100%' height='100%'>
                              <BarChart
                                 barCategoryGap={8}
                                 data={ar.districts}
                                 layout='vertical'
                                 margin={CHART_MARGIN}
                              >
                                 <XAxis type='number' hide domain={X_DOMAIN} />
                                 <YAxis
                                    axisLine={false}
                                    dataKey='label'
                                    tickLine={false}
                                    type='category'
                                    width={190}
                                    tick={tick}
                                 />
                                 <Tooltip
                                    cursor={false}
                                    content={<ChartTooltip />}
                                 />
                                 <Bar
                                    dataKey='value'
                                    fill={c.hl}
                                    radius={BAR_RADIUS}
                                    barSize={8}
                                    animationDuration={900}
                                 >
                                    <LabelList
                                       dataKey='value'
                                       position='right'
                                       formatter={fmtLabel}
                                       style={labelStyle}
                                    />
                                 </Bar>
                              </BarChart>
                           </ResponsiveContainer>
                        </div>
                     )}
                  </div>
               </div>
            </article>
         </div>
      );
   },
);
export default RegionDetail;
