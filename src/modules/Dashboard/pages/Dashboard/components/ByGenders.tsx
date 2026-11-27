import type { StatisticsComposition } from '@modules/Dashboard/types';
import type { GenderOption } from '@shared/constants/genders';
import useCountUp from '@shared/hooks/useCountUp';
import useGenders from '@shared/hooks/useGenders';
import { RootStateType } from '@shared/store';
import clsx from 'clsx';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { cardClass } from '../constants';
import { fmt, pct, sum } from '../helpers';
import Icon from './Icon';
const LIGHT = {
   surface: '#FFFFFF',
   chip: '#EDF1F6',
   text2: '#3D4757',
   s1: '#2F6FEB',
   s2: '#EB6834',
   unk: '#A7B1BE',
};
const DARK: typeof LIGHT = {
   surface: '#121822',
   chip: '#1E2733',
   text2: '#A3AFBF',
   s1: '#3987E5',
   s2: '#D95926',
   unk: '#4A5668',
};
type Palette = typeof LIGHT;
const GENDER_STYLES: Record<
   GenderOption['value'],
   { key: 's1' | 's2' | 'unk'; icon: string }
> = {
   male: {
      key: 's1',
      icon: 'M10 20a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM14.3 9.7 20 4M15 4h5v5',
   },
   female: {
      key: 's2',
      icon: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 15v7M9 19h6',
   },
};
type ByGenderProps = {
   data: StatisticsComposition['gender'];
   loading: boolean;
};
const ByGender = ({ data, loading }: ByGenderProps) => {
   const { t } = useTranslation('dashboard');
   const theme = useSelector((state: RootStateType) => state?.ui?.theme);
   const c: Palette = theme === 'dark' ? DARK : LIGHT;
   const { genders: genderOptions } = useGenders();
   const genders = useMemo(
      () =>
         genderOptions.map(x => ({
            ...GENDER_STYLES[x.value],
            gender: x.value,
            label: x.label,
            value: Number(data?.[x.value]) || 0,
         })),
      [genderOptions, data],
   );
   const genderRow = useMemo(
      () => [
         {
            name: t('gender'),
            ...Object.fromEntries(genders.map(x => [x.gender, x.value])),
         },
      ],
      [genders, t],
   );
   const total = sum(genders.map(x => x.value));
   const p = useCountUp(total);
   const chip =
      'flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-[#EDF1F6] text-[#3D4757] dark:bg-[#1E2733] dark:text-[#A3AFBF]';
   return (
      <Fragment>
         <section className={clsx(cardClass, 'h-full flex flex-col gap-5 p-5')}>
            <div className='flex items-center gap-3'>
               <span className={chip}>
                  <Icon d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8' />
               </span>
               <span className='flex flex-col gap-0.5'>
                  <h2 className='text-lg font-bold'>{t('gender_title')}</h2>
                  <span className='text-[13px] text-[#5E6B7D] dark:text-[#8A97A8]'>
                     {t('composition_subtitle')}
                  </span>
               </span>
            </div>
            <div style={{ height: 14 }}>
               <ResponsiveContainer width='100%' height='100%'>
                  <BarChart
                     data={genderRow}
                     layout='vertical'
                     margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                     barCategoryGap={0}
                  >
                     <XAxis domain={[0, total || 1]} hide type='number' />
                     <YAxis dataKey='name' hide type='category' />
                     {genders.map((x, i) => (
                        <Bar
                           animationDuration={1100}
                           dataKey={x.gender}
                           fill={c[x.key]}
                           key={x.gender}
                           stackId='g'
                           stroke={c.surface}
                           strokeWidth={3}
                           radius={
                              i === 0
                                 ? [999, 0, 0, 999]
                                 : i === genders.length - 1
                                   ? [0, 999, 999, 0]
                                   : 0
                           }
                        />
                     ))}
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className='grid grid-cols-3 gap-3'>
               {genders.map(x => (
                  <div
                     key={x.gender}
                     className='flex flex-col gap-1.5 rounded-2xl border border-[#E2E7EE] bg-[#F6F8FB] p-4 dark:border-[#232D3B] dark:bg-[#0D121A]'
                  >
                     <span
                        className='mb-1 flex size-10 items-center justify-center rounded-xl'
                        style={
                           x.key === 'unk'
                              ? { color: c.text2, background: c.chip }
                              : {
                                   color: c[x.key],
                                   background: c[x.key] + '1F',
                                }
                        }
                     >
                        <Icon d={x.icon} size={22} />
                     </span>
                     <span className='text-[13px] text-[#3D4757] dark:text-[#A3AFBF]'>
                        {x.label}
                     </span>
                     {loading ? (
                        <span className='h-8 w-16 animate-pulse rounded-lg bg-[#EDF1F6] dark:bg-[#1E2733]' />
                     ) : (
                        <span className='text-2xl font-extrabold tabular-nums'>
                           {fmt(x.value * p)}
                        </span>
                     )}
                     <span className='font-mono text-xs text-[#5E6B7D] dark:text-[#8A97A8]'>
                        {pct(x.value, total)}
                     </span>
                  </div>
               ))}
            </div>
         </section>
      </Fragment>
   );
};
export default ByGender;
