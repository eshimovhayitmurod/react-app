import { Fragment } from 'react';
import BodyCell from './BodyCell';
import type { BodyProps } from './types';
const Body = <T extends object>({
   data = [],
   headers = [],
   onClickRow,
   withPadding = true,
}: BodyProps<T>) => {
   return (
      <Fragment>
         {data.map((row, rowIndex) => (
            <tr
               className='custom-table-row'
               key={rowIndex}
            >
               {headers.map((header, columnIndex) => (
                  <BodyCell
                     columnIndex={columnIndex}
                     data={row}
                     header={header}
                     key={String(header.key ?? columnIndex)}
                     onClickRow={onClickRow}
                     rowIndex={rowIndex}
                     withPadding={withPadding}
                  />
               ))}
            </tr>
         ))}
      </Fragment>
   );
};
export default Body;
