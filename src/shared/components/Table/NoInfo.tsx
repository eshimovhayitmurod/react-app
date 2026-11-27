import { NoData } from '@shared/components';
import { Fragment } from 'react';
import type { NoInfoProps } from './types';
const NoInfo = ({ emptyMessage = '', colSpan = 1 }: NoInfoProps) => (
   <Fragment>
      <tr>
         <td className='custom-table-empty' colSpan={colSpan}>
            <NoData backButton={null} title={null} description={emptyMessage} />
         </td>
      </tr>
   </Fragment>
);
export default NoInfo;
