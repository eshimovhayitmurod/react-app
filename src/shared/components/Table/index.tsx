import { useMemo } from 'react';
import Body from './Body';
import Header from './Header';
import Loading from './Loading';
import NoInfo from './NoInfo';
import type { TableProps } from './types';
export type { TableHeader } from './types';
export { renderTypes } from './types';
export type { RenderType } from './types';
const Table = <T extends object>({
   data = [],
   emptyMessage = '',
   headers = [],
   isLoading = false,
   onClickRow,
   withPadding = true,
}: TableProps<T>) => {
   const headersCount = headers.length;
   const dataCount = data?.length;
   const colSpan = useMemo(() => Math.max(headersCount, 1), [headersCount]);
   const hasData = useMemo(() => dataCount > 0, [dataCount]);
   return (
      <div className='custom-table-wrapper'>
         <table className='custom-table'>
            <Header headers={headers} withPadding={withPadding} />
            <tbody>
               {isLoading ? (
                  <Loading colSpan={colSpan} />
               ) : hasData ? (
                  <Body
                     data={data}
                     headers={headers}
                     onClickRow={onClickRow}
                     withPadding={withPadding}
                  />
               ) : (
                  <NoInfo emptyMessage={emptyMessage} colSpan={colSpan} />
               )}
            </tbody>
         </table>
      </div>
   );
};
export default Table;
