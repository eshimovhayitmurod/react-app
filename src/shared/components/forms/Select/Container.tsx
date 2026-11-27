import clsx from 'clsx';
import type { FocusEventHandler } from 'react';
import { useMemo } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import DropdownContainer from './DropdownContainer';
import Placeholder from './Placeholder';
import type { SelectValue } from './types';
import type useDropdown from './useDropdown';
import ValueContainer from './ValueContainer';
type ContainerProps = {
   background?: string;
   className?: string;
   clearable?: boolean;
   dataCY?: string;
   disabled?: boolean;
   error?: string;
   getReferenceProps: ReturnType<typeof useDropdown>['getReferenceProps'];
   multiple?: boolean;
   onBlur?: FocusEventHandler<HTMLDivElement>;
   onChange?: (value: SelectValue) => void;
   onFocus?: FocusEventHandler<HTMLDivElement>;
   placeholder?: string;
   refs: ReturnType<typeof useDropdown>['refs'];
   setOpen: ReturnType<typeof useDropdown>['setOpen'];
   size?: 'lg' | 'md' | 'sm';
   value?: SelectValue;
};
const Container = ({
   background = '(--color-input-bg-color)',
   className = '',
   clearable = true,
   dataCY,
   disabled = false,
   error = '',
   getReferenceProps,
   multiple = false,
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   refs,
   setOpen,
   size = 'md',
   value,
}: ContainerProps) => {
   const hasValue = useMemo(() => {
      const newValue = Array.isArray(value) ? value : [];
      const hasMultipleValue = newValue?.length > 0;
      const singleValue = Array.isArray(value) ? undefined : value;
      const hasSingleValue = !!(singleValue?.label || singleValue?.value);
      const hasValue = multiple ? hasMultipleValue : hasSingleValue;
      return hasValue;
   }, [value, multiple]);
   const sizeClass =
      size === 'lg'
         ? 'min-h-[52px]'
         : size === 'sm'
           ? 'min-h-9 rounded-lg'
           : 'min-h-11';
   const padding = useMemo(() => {
      const padding =
         multiple && hasValue
            ? size === 'sm'
               ? '4px 8px 4px 4px'
               : '4px 12px 4px 4px'
            : size === 'sm'
              ? '4px 8px 4px 10px'
              : '4px 12px 4px 15px';
      return padding;
   }, [multiple, hasValue, size]);
   return (
      <div
         className={`group w-full cursor-pointer outline-none [*]:box-border ${sizeClass} data-[disabled=true]:cursor-default`}
         data-size={size}
         data-disabled={!!disabled}
      >
         <div
            {...getReferenceProps()}
            data-cy={dataCY}
            data-disabled={!!disabled}
            data-error={!!error}
            data-size={size}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={refs?.setReference}
            style={{ padding }}
            tabIndex={0}
            className={clsx(
               className,
               'flex w-full items-center justify-between outline-none',
               `bg-${background} rounded-[10px] border border-(--select-border-color) text-(--select-color) hover:border-(--select-border-focus-color) focus:border-(--select-border-focus-color) ${sizeClass} data-[error=true]:border-(--select-border-error-color) data-[disabled=true]:border-(--select-border-color) data-[disabled=true]:bg-(--select-disabled-bg-color) data-[disabled=true]:text-(--select-disabled-color)`,
            )}
         >
            {hasValue ? (
               <ValueContainer
                  clearable={clearable}
                  disabled={disabled}
                  multiple={multiple}
                  onChange={onChange}
                  setOpen={setOpen}
                  size={size}
                  value={value}
               />
            ) : (
               <Placeholder placeholder={placeholder} />
            )}
            <DropdownContainer
               clearable={clearable}
               disabled={disabled}
               multiple={multiple}
               onChange={onChange}
               setOpen={setOpen}
               value={value}
            />
         </div>
         <ErrorMessage size={size} error={error} />
      </div>
   );
};
export default Container;
