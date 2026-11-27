import type { MouseEvent } from 'react';
import { useCallback, useMemo } from 'react';
import type { SelectValue } from './types';
type DropdownContainerProps = {
   clearable?: boolean;
   disabled?: boolean;
   multiple?: boolean;
   onChange?: (value: SelectValue) => void;
   setOpen: (open: boolean) => void;
   value?: SelectValue;
};
const DropdownContainer = ({
   clearable = true,
   disabled = false,
   multiple = false,
   onChange,
   setOpen,
   value,
}: DropdownContainerProps) => {
   const hasValue = useMemo(() => {
      const newValue = Array.isArray(value) ? value : [];
      const hasMultipleValue = newValue?.length > 0;
      const singleValue = Array.isArray(value) ? undefined : value;
      const hasSingleValue = !!(singleValue?.label || singleValue?.value);
      const hasValue = multiple ? hasMultipleValue : hasSingleValue;
      return hasValue;
   }, [value, multiple]);
   const memoizedClearable = useMemo(() => {
      const memoizedClearable = !!clearable && hasValue && !disabled;
      return memoizedClearable;
   }, [clearable, hasValue, disabled]);
   const clearValue = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
         e.stopPropagation();
         e.preventDefault();
         const newValue = multiple ? [] : null;
         onChange?.(newValue);
         setOpen(false);
      },
      [multiple, onChange, setOpen],
   );
   return (
      <div className='items-center text-(--select-icon-color) flex justify-center'>
         {memoizedClearable && (
            <div
               className='clear-button items-center rounded-xl flex h-6 justify-center w-6 hover:bg-(--select-icon-hover-bg-color)'
               onClick={clearValue}
            >
               <svg fill='none' height='16' viewBox='0 0 16 16' width='16'>
                  <path
                     d='M12 4L4 12'
                     stroke='currentColor'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                  ></path>
                  <path
                     d='M4 4L12 12'
                     stroke='currentColor'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                  ></path>
               </svg>
            </div>
         )}
         <div className='items-center flex justify-center'>
            <svg height='18' width='18' viewBox='0 0 20 20'>
               <path
                  fill='currentColor'
                  d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'
               ></path>
            </svg>
         </div>
      </div>
   );
};
export default DropdownContainer;
