import { Select as AppSelect } from '@shared/components/forms';
import { useMemo } from 'react';
import type { PaginationProps } from './types';
type PageSizeProps = Pick<
   PaginationProps,
   'disabled' | 'onChange' | 'page' | 'page_size' | 'totalItemsCount'
>;
const PageSize = ({
   disabled = false,
   onChange,
   page = 1,
   page_size = 1,
   totalItemsCount = 1,
}: PageSizeProps) => {
   const value = useMemo(() => {
      const value = { label: String(page_size), value: page_size };
      return value;
   }, [page_size]);
   const state = useMemo(() => {
      const end =
         page * page_size > totalItemsCount
            ? totalItemsCount
            : page * page_size;
      const start = totalItemsCount > 0 ? (page - 1) * page_size + 1 : 0;
      const state = `${start}-${end} / ${totalItemsCount}`;
      return state;
   }, [page, page_size, totalItemsCount]);
   return (
      <div className='flex items-center justify-center gap-2 flex-wrap'>
         <div className='w-25 min-w-25'>
            <AppSelect
               clearable={false}
               disabled={disabled || totalItemsCount === 0}
               searchable={false}
               size='md'
               value={value}
               onChange={option => {
                  const selectedOption = Array.isArray(option)
                     ? option[0]
                     : option;
                  if (typeof selectedOption?.value === 'number') {
                     onChange({ page: 1, page_size: selectedOption.value });
                  }
               }}
               options={[
                  {
                     label: '10',
                     value: 10,
                  },
                  {
                     label: '15',
                     value: 15,
                  },
                  {
                     label: '20',
                     value: 20,
                  },
                  {
                     label: '30',
                     value: 30,
                  },
                  {
                     label: '50',
                     value: 50,
                  },
               ]}
            />
         </div>
         <h4 className='text-[#3c3c3c] dark:text-[#e1e1e1] text-[13px] sm:text-[16px] font-semibold whitespace-nowrap'>
            {state}
         </h4>
      </div>
   );
};

export default PageSize;
