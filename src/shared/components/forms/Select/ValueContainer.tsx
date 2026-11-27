import type { MouseEvent } from 'react';
import { memo, useCallback, useMemo } from 'react';
import type { SelectOption, SelectValue } from './types';
type ValueContainerProps = {
   clearable?: boolean;
   disabled?: boolean;
   multiple?: boolean;
   onChange?: (value: SelectValue) => void;
   setOpen: (open: boolean) => void;
   size?: 'lg' | 'md' | 'sm';
   value?: SelectValue;
};
type MultipleValueProps = {
   disabled?: boolean;
   index?: number;
   onChange?: (value: SelectValue) => void;
   setOpen: (open: boolean) => void;
   size?: 'lg' | 'md' | 'sm';
   value?: SelectOption;
   valueList?: SelectOption[];
};
const MultipleValue = memo(
   ({
      disabled = false,
      index = 0,
      onChange,
      setOpen,
      size = 'md',
      value,
      valueList = [],
   }: MultipleValueProps) => {
      const label = value?.label;
      const valueLabel = useMemo(() => {
         const isValid = ['string', 'number'].includes(typeof label) && label;
         const valueLabel = isValid ? label : '';
         return valueLabel;
      }, [label]);
      const clearable = useMemo(() => !disabled, [disabled]);
      const removeOption = useCallback(
         (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            const newValueList = valueList.filter(
               (_, order = 0) => order !== index,
            );
            onChange?.(newValueList);
            setOpen(false);
         },
         [index, setOpen, onChange, valueList],
      );
      const sizeClass =
         size === 'lg'
            ? 'min-h-[42px] rounded-[10px] text-[17px]'
            : size === 'sm'
              ? 'min-h-[22px] py-0.5 pr-[7px] pl-2.5'
              : 'min-h-8.5 py-1 pr-1.75 pl-2.5';
      return (
         <div
            className={`group flex max-w-full cursor-default items-center rounded-lg bg-(--select-tag-bg-color) text-(--select-color) ${sizeClass} data-[disabled=true]:bg-(--select-tag-disabled-bg-color)`}
            data-disabled={!!disabled}
            data-size={size}
         >
            <div
               className={`mr-1 w-[calc(100%-25px)] whitespace-nowrap font-medium ${
                  size === 'sm'
                     ? 'text-[13px] leading-4'
                     : size === 'lg'
                       ? 'text-[17px]'
                       : 'text-base'
               } group-data-[disabled=true]:w-full`}
            >
               {valueLabel}
            </div>
            {clearable && (
               <div
                  className='flex items-center justify-center h-5.5 w-5.5 cursor-pointer'
                  onClick={removeOption}
               >
                  <svg
                     fill='var(--select-icon-color)'
                     height='18'
                     viewBox='0 0 20 20'
                     width='18'
                  >
                     <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z'></path>
                  </svg>
               </div>
            )}
         </div>
      );
   },
);
const ValueContainer = ({
   clearable = false,
   disabled = false,
   multiple = false,
   onChange,
   setOpen,
   size = 'md',
   value,
}: ValueContainerProps) => {
   const label = Array.isArray(value) ? undefined : value?.label;
   const width = useMemo(
      () => (clearable ? 'calc(100% - 44px)' : 'calc(100% - 24px)'),
      [clearable],
   );
   const memoizedMultiple = useMemo(() => !!multiple, [multiple]);
   const valueList = useMemo(
      () => (Array.isArray(value) ? value : []),
      [value],
   );
   const valueLabel = useMemo(() => {
      const isValid = ['string', 'number'].includes(typeof label) && label;
      const valueLabel = isValid ? label : '';
      return valueLabel;
   }, [label]);
   return (
      <div className='select-none' style={{ width }}>
         {memoizedMultiple ? (
            <div className='flex flex-wrap gap-1'>
               {valueList.map((value, index = 0) => (
                  <MultipleValue
                     index={index}
                     disabled={disabled}
                     key={index}
                     onChange={onChange}
                     setOpen={setOpen}
                     size={size}
                     value={value}
                     valueList={valueList}
                  />
               ))}
            </div>
         ) : (
            <div className='overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium'>
               {valueLabel}
            </div>
         )}
      </div>
   );
};
export default ValueContainer;
