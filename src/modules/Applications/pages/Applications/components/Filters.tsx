import { TextInput } from '@shared/components/forms';
import useStatuses from '@shared/hooks/useStatuses';
import { type Dispatch, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';
import type { FilterState, StatusCountsType } from '../types';
type FiltersProps = {
   counts: StatusCountsType;
   filter: FilterState;
   getApplications: (params: FilterState) => void;
   loading: boolean;
   setFilter: Dispatch<SetStateAction<FilterState>>;
};
const Filters = ({
   filter,
   getApplications,
   loading,
   setFilter,
   counts,
}: FiltersProps) => {
   const { t } = useTranslation('applications');
   const { statuses } = useStatuses({ filter: 'all' });
   const { inspector_name, person_name, status } = filter;
   const debouncedSearch = useDebouncedCallback(
      (params: FilterState) => getApplications(params),
      300,
   );
   const onSearchChange =
      (key: keyof Pick<FilterState, 'inspector_name' | 'person_name'>) =>
      (value: string) => {
         const newFilter = { ...filter, [key]: value, page: 1 };
         setFilter(newFilter);
         debouncedSearch(newFilter);
      };
   return (
      <div className='flex flex-col gap-4'>
         <div
            className='flex max-w-full gap-1 self-start overflow-x-auto rounded-full border border-[#E2E7EE] dark:border-[#232D3B] bg-[#F6F8FB] dark:bg-[#0D121A] p-1'
            role='tablist'
         >
            {statuses.map(tab => {
               const isActive = tab.value === status;
               const count =
                  tab?.value === ''
                     ? counts?.all
                     : tab.value
                       ? counts[tab.value]
                       : '0';
               return (
                  <button
                     aria-selected={isActive}
                     disabled={loading && !isActive}
                     key={tab.value}
                     role='tab'
                     type='button'
                     onClick={() => {
                        if (isActive) {
                           return;
                        }
                        debouncedSearch.cancel();
                        const newFilter = {
                           ...filter,
                           page: 1,
                           status: tab.value,
                        };
                        setFilter(newFilter);
                        getApplications(newFilter);
                     }}
                     className={`flex h-9.5 cursor-pointer items-center gap-2 rounded-full px-3.5 text-sm font-semibold whitespace-nowrap ${
                        isActive
                           ? 'bg-[#0A0E14] dark:bg-[#E8EDF4] text-[#FFFFFF] dark:text-[#0A0E14]'
                           : 'text-[#5E6B7D] dark:text-[#8A97A8]'
                     }`}
                  >
                     {tab.label}
                     <span className='flex h-5.5 items-center rounded-full bg-[#2F6FEB] px-1.75 font-mono text-xs font-medium text-[#FFFFFF]'>
                        {count}
                     </span>
                  </button>
               );
            })}
         </div>
         <div className='grid grid-cols-1 gap-2.5 md:grid-cols-3'>
            <TextInput
               placeholder={t('search_by_full_name')}
               value={person_name}
               onChange={onSearchChange('person_name')}
            />
            <TextInput
               placeholder={t('search_by_inspector')}
               value={inspector_name}
               onChange={onSearchChange('inspector_name')}
            />
         </div>
      </div>
   );
};
export default Filters;
