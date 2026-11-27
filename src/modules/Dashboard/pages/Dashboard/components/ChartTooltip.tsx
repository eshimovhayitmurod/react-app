import { RootStateType } from '@shared/store';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
export type ChartTooltipProps = {
   active?: boolean;
   payload?: ReadonlyArray<{
      name?: string | number;
      payload?: { label?: string; range?: string };
      value?: number | string;
   }>;
};
const fmt = (n: number) =>
   String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const ChartTooltip = ({ active, payload }: ChartTooltipProps) => {
   const theme = useSelector((state: RootStateType) => state?.ui?.theme);
   const style = useMemo(() => {
      const LIGHT = {
         background: '#0A0E14',
         color: '#FFFFFF',
         boxShadow: '0 14px 36px rgba(10,14,20,0.12)',
      };
      const DARK = {
         background: '#E8EDF4',
         color: '#0A0E14',
         boxShadow: '0 18px 44px rgba(0,0,0,0.5)',
      };
      const style = theme === 'dark' ? DARK : LIGHT;
      return style;
   }, [theme]);
   const isActive = !active || !payload || !payload.length;
   const item = payload?.[0];
   const label = item?.payload?.label ?? item?.payload?.range ?? item?.name;
   if (isActive) return null;
   return (
      <div
         className='rounded-[10px] px-3 py-2 text-[13px] font-medium'
         style={style}
      >
         {label}: <span className='font-bold'>{fmt(Number(item?.value))}</span>
      </div>
   );
};
export default ChartTooltip;
