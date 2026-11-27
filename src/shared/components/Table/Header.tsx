import { Fragment } from 'react';
import type { HeaderProps } from './types';
const Header = <T extends object>({
   headers = [],
   withPadding = true,
}: HeaderProps<T>) => {
   return (
      <Fragment>
         <thead>
            <tr className='custom-table-header'>
               {headers.map((header, index) => (
                  <th
                     className='custom-table-header-cell'
                     data-padding={withPadding}
                     key={String(header.key ?? index)}
                  >
                     {header.label}
                  </th>
               ))}
            </tr>
         </thead>
      </Fragment>
   );
};
export default Header;
