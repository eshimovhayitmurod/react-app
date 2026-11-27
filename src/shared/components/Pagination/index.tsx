import { memo } from 'react';
import PageSize from './PageSize';
import Paginate from './Pagination';
import type { PaginationProps } from './types';
const Pagination = memo(
   ({ totalItemsCount = 1, ...props }: PaginationProps) => (
      <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full gap-3'>
         <PageSize {...props} totalItemsCount={totalItemsCount} />
         <Paginate {...props} totalItemsCount={totalItemsCount} />
      </div>
   ),
);
export default Pagination;
