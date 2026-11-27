import useCountUp from '@shared/hooks/useCountUp';
import type { TFunction } from 'i18next';
import { memo, RefObject, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { fmt } from '../../helpers';
import { SKELETON } from './constants';
import { regionName } from './helpers';
import type { Handlers, Region } from './types';
type RegionCardProps = Handlers & {
   index: number;
   loading: boolean;
   on: boolean;
   progress: number;
   region: Region;
   rowRefs: RefObject<(HTMLDivElement | null)[]>;
   t: TFunction<'dashboard'>;
};
const RegionCard = memo(
   ({
      index,
      loading,
      on,
      progress,
      region,
      rowRefs,
      t,
      onPick,
      onHoverStart,
      onHoverEnd,
   }: RegionCardProps) => (
      <div
         aria-current={on}
         className='status-card spotlight-card w-full cursor-pointer flex flex-col gap-1 p-5 text-left'
         onBlur={onHoverEnd}
         onClick={() => onPick(index)}
         onFocus={() => onHoverStart(index)}
         onMouseEnter={() => onHoverStart(index)}
         onMouseLeave={onHoverEnd}
         role='listitem'
         style={{ '--status-color': '#2F6FEB55' } as CSSProperties}
         ref={el => {
            rowRefs.current[index] = el;
         }}
      >
         <span
            className={`min-w-0 text-xl leading-tight font-bold tracking-[-0.01em] ${on ? 'text-[#2F6FEB] dark:text-[#5B9BFF]' : ''}`}
         >
            {regionName(t, region)}
         </span>
         {loading ? (
            <span className={`mt-auto h-8 w-20 rounded-lg ${SKELETON}`} />
         ) : (
            <span
               className={`mt-auto text-[32px] leading-none font-extrabold tracking-[-0.02em] tabular-nums ${on ? 'text-[#2F6FEB] dark:text-[#5B9BFF]' : 'text-[#3D4757] dark:text-[#A3AFBF]'}`}
            >
               {fmt(region.value * progress)}
            </span>
         )}
      </div>
   ),
);
type RegionListProps = Handlers & {
   active: number;
   loading: boolean;
   regions: Region[];
   rowRefs: RefObject<(HTMLDivElement | null)[]>;
};
const RegionList = memo(
   ({
      active,
      loading,
      regions,
      rowRefs,
      onPick,
      onHoverStart,
      onHoverEnd,
   }: RegionListProps) => {
      const { t } = useTranslation('dashboard');
      const progress = useCountUp(loading ? 0 : regions.length);
      return (
         <div className='col-span-2'>
            <div className='grid grid-cols-2 gap-4' role='list'>
               {regions.map((region, i) => (
                  <RegionCard
                     index={i}
                     key={region.id}
                     loading={loading}
                     on={i === active}
                     onHoverEnd={onHoverEnd}
                     onHoverStart={onHoverStart}
                     onPick={onPick}
                     progress={progress}
                     region={region}
                     rowRefs={rowRefs}
                     t={t}
                  />
               ))}
            </div>
         </div>
      );
   },
);
export default RegionList;
