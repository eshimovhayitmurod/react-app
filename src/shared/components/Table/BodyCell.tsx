import { useMemo, type ReactNode } from 'react';
import { renders, type BodyCellProps } from './types';
const BodyCell = <T extends object>({
   columnIndex,
   data,
   header,
   onClickRow,
   rowIndex,
   withPadding,
}: BodyCellProps<T>) => {
   const isClickable = useMemo(() => {
      const isClickable =
         typeof onClickRow === 'function' && header?.isClickable !== false;
      return isClickable;
   }, [onClickRow, header?.isClickable]);
   const content = useMemo(() => {
      const key = header?.key;
      const getContent = header?.getContent;
      const renderType = header?.renderType;
      const value = key === undefined ? undefined : data[key];
      const renderer = renders.find(item => item?.value === renderType);
      const content =
         typeof getContent === 'function'
            ? getContent({
                 data,
                 key: String(header.key ?? ''),
                 index: rowIndex,
              })
            : typeof renderer?.getContent === 'function'
              ? renderer.getContent(value)
              : (value as ReactNode);
      return content;
   }, [header]);
   return (
      <td
         className='custom-table-cell'
         data-clickable={isClickable}
         data-padding={withPadding}
         onClick={event => {
            if (isClickable && onClickRow) {
               onClickRow({
                  columnIndex,
                  data,
                  event,
                  rowIndex,
               });
            }
         }}
      >
         {content}
      </td>
   );
};
export default BodyCell;
