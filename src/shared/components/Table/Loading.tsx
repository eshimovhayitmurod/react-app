import { Spinner } from '@shared/components';
import { Fragment } from 'react';
import type { LoadingProps } from './types';
const Loading = ({ colSpan = 1 }: LoadingProps) => {
   return (
      <Fragment>
         <tr className='custom-table-loading-row'>
            <td colSpan={colSpan}>
               <div className='custom-table-loading'>
                  <Spinner />
               </div>
            </td>
         </tr>
      </Fragment>
   );
};
export default Loading;
