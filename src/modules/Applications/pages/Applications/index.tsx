import ApplicationStatus from '@modules/Applications/components/ApplicationStatus';
import ApplicationService from '@modules/Applications/services';
import type { Admission } from '@modules/Applications/types';
import { apiErrorParser } from '@shared/api/apiErrorParser';
import { PageTitle } from '@shared/components';
import Pagination from '@shared/components/Pagination';
import Table, { type TableHeader } from '@shared/components/Table';
import { type ApplicationStatusType } from '@shared/constants/statuses';
import notification from '@shared/helpers/notification';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import {
   Fragment,
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Filters, Header } from './components';
import { defaultCounts, defaultFilter } from './constants';
import type { FilterState, StatusCountsType } from './types';
const Applications = () => {
   const { t } = useTranslation(['applications', 'common']);
   const [applications, setApplications] = useState<Admission[]>([]);
   const [counts, setCounts] = useState<StatusCountsType>(defaultCounts);
   const [filter, setFilter] = useState<FilterState>(defaultFilter);
   const [loading, setLoading] = useState(false);
   const [totalItemsCount, setTotalItemsCount] = useState(0);
   const controllerRef = useRef<AbortController | null>(null);
   const { page, page_size } = filter;
   const getApplications = useCallback((params: FilterState) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      const signal = controller.signal;
      const { inspector_name, page, page_size, person_name, status } = params;
      ApplicationService.getApplications({
         signal,
         onStart: () => setLoading(true),
         params: {
            inspector_name,
            page,
            page_size,
            person_name,
            status: status,
         },
         onSuccess: response => {
            const results = response?.data?.results;
            setApplications(Array.isArray(results) ? results : []);
            setTotalItemsCount(Number(response?.data?.count) || 0);
         },
         onError: error => {
            if (axios.isCancel(error)) {
               return;
            }
            notification(apiErrorParser(error), { type: 'error' });
         },
         onEnd: () => {
            if (!signal.aborted) {
               setLoading(false);
            }
         },
      });
   }, []);
   const onChangePage = (newFilter: FilterState) => {
      setFilter(newFilter);
      getApplications(newFilter);
   };
   const headers = useMemo<TableHeader<Admission>[]>(
      () => [
         {
            label: '№',
            renderType: 'custom',
            getContent: ({ index }) => (page - 1) * page_size + index + 1,
         },
         {
            key: 'person_name',
            label: t('full_name'),
            renderType: 'string',
         },
         {
            key: 'region_name',
            label: t('common:region'),
            renderType: 'string',
         },
         {
            key: 'district_name',
            label: t('city_district'),
            renderType: 'string',
         },
         {
            key: 'created_at',
            label: t('registered_at'),
            renderType: 'datetime',
         },
         {
            key: 'status_code',
            label: t('common:status'),
            renderType: 'custom',
            getContent: ({ data }) => {
               const status_code = data?.status_code as ApplicationStatusType;
               return <ApplicationStatus status_code={status_code} />;
            },
         },
         {
            label: t('common:actions'),
            isClickable: false,
            renderType: 'custom',
            getContent: ({ data }) => (
               <Link
                  aria-label={t('open_application', { id: data?.id })}
                  className='clear-btn'
                  to={`/account/applications/${data?.id}`}
               >
                  <ChevronRight className='size-4' strokeWidth={1.9} />
               </Link>
            ),
         },
      ],
      [page, page_size, t],
   );
   useEffect(() => {
      getApplications(defaultFilter);
      return () => controllerRef.current?.abort();
   }, [getApplications]);
   useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      const getStatusesCounts = () => {
         ApplicationService.getApplicationsStatusCounts({
            signal,
            onSuccess: response => {
               const data = response?.data;
               const list = Array.isArray(data) ? data : [];
               const placed = list.find(
                  item => item?.code === 'placed',
               )?.admission_count;
               const registered = list.find(
                  item => item?.code === 'registered',
               )?.admission_count;
               const closed = list.find(
                  item => item?.code === 'closed',
               )?.admission_count;
               const closedCount = typeof closed === 'number' ? closed : 0;
               const placedCount = typeof placed === 'number' ? placed : 0;
               const registeredCount =
                  typeof registered === 'number' ? registered : 0;
               const all = closedCount + placedCount + registeredCount;
               const counts = {
                  all,
                  closed: closedCount,
                  placed: placedCount,
                  registered: registeredCount,
               };
               setCounts(counts);
            },
            onError: error => {
               setCounts(defaultCounts);
               if (axios.isCancel(error)) {
                  return;
               }
            },
         });
      };
      getStatusesCounts();
      return () => controller?.abort();
   }, []);
   return (
      <Fragment>
         <PageTitle title={t('title')} />
         <div className='main-page-wrapper h-full'>
            <main className='flex flex-col gap-4 h-full'>
               <div>
                  <Header title={t('title')} />
               </div>
               <section className='flex flex-col main-card-wrapper max-h-[calc(100%-60px)]'>
                  <div className='flex flex-col gap-4 border-b border-[#E2E7EE] dark:border-[#232D3B] p-5'>
                     <Filters
                        counts={counts}
                        filter={filter}
                        getApplications={getApplications}
                        loading={loading}
                        setFilter={setFilter}
                     />
                  </div>
                  <div className='w-full h-[calc(100%-225px)]'>
                     <Table
                        data={applications}
                        emptyMessage={t('empty')}
                        headers={headers}
                        isLoading={loading}
                     />
                  </div>
                  <div className='p-4'>
                     <Pagination
                        disabled={loading}
                        page={page}
                        page_size={page_size}
                        totalItemsCount={totalItemsCount}
                        onChange={({ page, page_size }) =>
                           onChangePage({ ...filter, page, page_size })
                        }
                     />
                  </div>
               </section>
            </main>
         </div>
      </Fragment>
   );
};
export default Applications;
