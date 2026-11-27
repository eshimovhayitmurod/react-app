import DashboardService from '@modules/Dashboard/services';
import useStatuses from '@shared/hooks/useStatuses';
import { AxiosResponse } from 'axios';
import { CSSProperties, Fragment, memo, useEffect, useState } from 'react';
import { defaultStatuses } from '../constants';
import { fmt } from '../helpers';
import { StatusResponseDataType } from '../types';
type StatusProps = {
   color: string;
   data: StatusResponseDataType;
   index: number;
   label: string;
   loading: boolean;
   statusKey: keyof StatusResponseDataType;
};
const Status = memo(
   ({ color, data, label, loading, statusKey }: StatusProps) => (
      <article
         className='status-card spotlight-card flex flex-col gap-2 p-4'
         style={{ '--status-color': color } as CSSProperties}
         title={label}
      >
         <div className='flex items-center gap-3.5'>
            <span className='flex min-w-0 flex-col gap-0.5'>
               <span
                  className='text-sm uppercase leading-snug font-bold'
                  style={{ color }}
               >
                  {label}
               </span>
            </span>
         </div>
         {loading ? (
            <span className='h-9 w-32 animate-pulse rounded-xl bg-[#EDF1F6] dark:bg-[#1E2733]' />
         ) : (
            <span
               className='text-4xl leading-none font-extrabold tracking-[-0.035em] tabular-nums'
               style={{ color }}
            >
               {fmt(data?.[statusKey] || 0)}
            </span>
         )}
      </article>
   ),
);
const ByStatuses = () => {
   const [data, setData] = useState<StatusResponseDataType>(defaultStatuses);
   const [loading, setLoading] = useState<boolean>(false);
   const { statuses } = useStatuses({ filter: 'all' });
   useEffect(() => {
      const options = {
         onEnd: () => setLoading(false),
         onStart: () => setLoading(true),
         onError: () => setData(defaultStatuses),
         onSuccess: (response: AxiosResponse) => {
            const data = response?.data as StatusResponseDataType;
            setData(data);
         },
      };
      DashboardService.getStatisticsByStatus(options);
   }, []);
   return (
      <Fragment>
         <section className='grid grid-cols-4 gap-4'>
            {statuses.map((status, index) => (
               <Status
                  {...status}
                  data={data}
                  index={index}
                  key={status?.key}
                  loading={loading}
                  statusKey={status.key}
               />
            ))}
         </section>
      </Fragment>
   );
};
export default ByStatuses;
