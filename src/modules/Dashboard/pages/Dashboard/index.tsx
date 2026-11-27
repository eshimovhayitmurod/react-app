import DashboardService from '@modules/Dashboard/services';
import type { StatisticsComposition } from '@modules/Dashboard/types';
import { PageTitle } from '@shared/components';
import useSpotlight from '@shared/hooks/useSpotlight';
import axios, { AxiosResponse } from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ByAge, ByGenders, ByRegions, ByStatuses, Header } from './components';
import { defaultComposition } from './constants';
const Dashboard = () => {
   const { t } = useTranslation('dashboard');
   useSpotlight();
   const [composition, setComposition] =
      useState<StatisticsComposition>(defaultComposition);
   const [compositionLoading, setCompositionLoading] = useState(false);
   useEffect(() => {
      const controller = new AbortController();
      DashboardService.getStatisticsComposition({
         signal: controller.signal,
         onStart: () => setCompositionLoading(true),
         onSuccess: (response: AxiosResponse<StatisticsComposition>) => {
            const data = response?.data;
            setComposition({
               age: { ...defaultComposition.age, ...data?.age },
               gender: { ...defaultComposition.gender, ...data?.gender },
               repeat_visits: {
                  ...defaultComposition.repeat_visits,
                  ...data?.repeat_visits,
               },
               time_of_day: {
                  ...defaultComposition.time_of_day,
                  ...data?.time_of_day,
               },
            });
         },
         onError: error => {
            if (axios.isCancel(error)) return;
            setComposition(defaultComposition);
         },
         onEnd: () => {
            if (!controller.signal.aborted) setCompositionLoading(false);
         },
      });
      return () => controller.abort();
   }, []);
   return (
      <Fragment>
         <PageTitle title={t('title')} />
         <div className='main-page-wrapper'>
            <main className='grid grid-cols-2 gap-4'>
               <div className='col-span-2'>
                  <Header title={t('title')} />
               </div>
               <div className='col-span-2'>
                  <ByStatuses />
               </div>
               <div className='col-span-2'>
                  <ByRegions />
               </div>
               <div>
                  <ByAge data={composition.age} loading={compositionLoading} />
               </div>
               <div>
                  <ByGenders
                     data={composition.gender}
                     loading={compositionLoading}
                  />
               </div>
            </main>
         </div>
      </Fragment>
   );
};
export default Dashboard;
