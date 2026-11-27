import type { StatisticsComposition } from '@modules/Dashboard/types';
import useCountUp from '@shared/hooks/useCountUp';
import { RootStateType } from '@shared/store';
import clsx from 'clsx';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { cardClass } from '../constants';
import { fmt, pct, sum } from '../helpers';
import ChartTooltip from './ChartTooltip';
import Icon from './Icon';
const LIGHT = {
   s1: '#2F6FEB',
   s2: '#EB6834',
   s3: '#1BAF7A',
   unk: '#A7B1BE',
};
const DARK: typeof LIGHT = {
   s1: '#3987E5',
   s2: '#D95926',
   s3: '#199E70',
   unk: '#4A5668',
};
type Palette = typeof LIGHT;
const AGES = [
   { label: 'age_under_18', dataKey: 'under_18', key: 's1' },
   { label: 'age_18_35', dataKey: 'age_18_35', key: 's2' },
   { label: 'age_over_35', dataKey: 'over_35', key: 's3' },
   { label: 'age_unidentified', dataKey: 'unidentified', key: 'unk' },
] as const;
type ByAgeProps = {
   data: StatisticsComposition['age'];
   loading: boolean;
};
const ByAge = ({ data, loading }: ByAgeProps) => {
   const { t } = useTranslation('dashboard');
   const theme = useSelector((state: RootStateType) => state?.ui?.theme);
   const c: Palette = theme === 'dark' ? DARK : LIGHT;
   const ageData = useMemo(
      () =>
         AGES.map(a => ({
            label: t(a.label),
            value: Number(data?.[a.dataKey]) || 0,
            color: c[a.key],
         })),
      [c, data, t],
   );
   const total = sum(ageData.map(a => a.value));
   const p = useCountUp(total);
   const chip =
      'flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-[#EDF1F6] text-[#3D4757] dark:bg-[#1E2733] dark:text-[#A3AFBF]';
   return (
      <Fragment>
         <section className={clsx(cardClass, 'h-full flex flex-col gap-5 p-5')}>
            <div className='flex items-center gap-3'>
               <span className={chip}>
                  <Icon d='M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' />
               </span>
               <span className='flex flex-col gap-0.5'>
                  <h2 className='text-lg font-bold'>{t('age_title')}</h2>
                  <span className='text-[13px] text-[#5E6B7D] dark:text-[#8A97A8]'>
                     {t('composition_subtitle')}
                  </span>
               </span>
            </div>
            <div className='flex flex-wrap items-center gap-7'>
               <div className='relative size-45 shrink-0'>
                  <ResponsiveContainer width='100%' height='100%'>
                     <PieChart>
                        <Pie
                           data={ageData}
                           dataKey='value'
                           nameKey='label'
                           innerRadius={62}
                           outerRadius={84}
                           paddingAngle={2}
                           startAngle={90}
                           endAngle={-270}
                           stroke='none'
                           animationDuration={1200}
                        >
                           {ageData.map(d => (
                              <Cell key={d.label} fill={d.color} />
                           ))}
                        </Pie>
                        <Tooltip content={<ChartTooltip />} />
                     </PieChart>
                  </ResponsiveContainer>
                  <span className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-0.5'>
                     {loading ? (
                        <span className='h-8 w-20 animate-pulse rounded-lg bg-[#EDF1F6] dark:bg-[#1E2733]' />
                     ) : (
                        <span className='text-[26px] font-extrabold tabular-nums'>
                           {fmt(total * p)}
                        </span>
                     )}
                     <span className='text-xs text-[#5E6B7D] dark:text-[#8A97A8]'>
                        {t('total')}
                     </span>
                  </span>
               </div>
               <div className='flex min-w-50 flex-1 flex-col'>
                  {ageData.map((a, i) => (
                     <div
                        key={a.label}
                        className={`flex h-11 items-center gap-3 ${i < 3 ? 'border-b border-[#EDF1F5] dark:border-[#1A222E]' : ''}`}
                     >
                        <span
                           className='size-3 shrink-0 rounded'
                           style={{ background: a.color }}
                        />
                        <span className='flex-1 text-sm'>{a.label}</span>
                        <span className='text-sm font-bold tabular-nums'>
                           {fmt(a.value)}
                        </span>
                        <span className='w-13 text-right font-mono text-xs text-[#5E6B7D] dark:text-[#8A97A8]'>
                           {pct(a.value, total)}
                        </span>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </Fragment>
   );
};
export default ByAge;
