import dateFormatter from '@shared/helpers/dateFormatter';
import type { Ref } from 'react';
import { useId, useMemo } from 'react';
import { IMask, IMaskInput } from 'react-imask';
import {
   containerClass,
   dropdownContainerClass,
   dropdownInputClass,
   dropdownTriggerClass,
   dropdownTriggerIconClass,
} from '../classNames';
import ClearButton from '../components/ClearButton';
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';
import Down from '../Icons/Down';
import type { FormInputProps } from '../types';
import type useDropdown from './useDropdown';
type ControlProps = Omit<FormInputProps<HTMLInputElement>, 'ref' | 'value'> & {
   ariaLabel?: string;
   background?: string;
   dataCY?: string;
   getReferenceProps: ReturnType<typeof useDropdown>['getReferenceProps'];
   max?: Date;
   min?: Date;
   ref?: Ref<HTMLInputElement>;
   refs: ReturnType<typeof useDropdown>['refs'];
   value?: string;
};
const Control = ({
   ariaLabel,
   autoComplete,
   background = '(--color-input-bg-color)',
   clearable = false,
   dataCY,
   disabled = false,
   error = '',
   getReferenceProps,
   id,
   loading = false,
   max,
   min,
   name,
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   ref,
   refs,
   size = 'md',
   value = '',
}: ControlProps) => {
   const errorId = useId();
   const hasSuffix = useMemo(
      () => Boolean(loading || (clearable && !disabled && value)),
      [loading, clearable, disabled, value],
   );
   const classNameOptions = {
      background,
      clearable: !!clearable,
      disabled: !!disabled,
      error: !!error,
      hasSuffix,
      loading: !!loading,
      size,
   };
   const memoizedValue = useMemo(() => {
      const stringValue = typeof value === 'string' ? value : '';
      const memoizedValue = stringValue.split('-').reverse().join('-');
      return memoizedValue;
   }, [value]);
   return (
      <div className={containerClass(classNameOptions)}>
         <div
            className={dropdownContainerClass(classNameOptions)}
            ref={node => refs?.setReference(node)}
         >
            <IMaskInput
               aria-describedby={error ? errorId : undefined}
               aria-invalid={!!error}
               aria-label={ariaLabel}
               autoComplete={autoComplete}
               autofix={true}
               className={dropdownInputClass(classNameOptions)}
               data-cy={dataCY}
               disabled={disabled}
               id={id}
               inputMode='numeric'
               inputRef={ref}
               lazy={true}
               mask={Date}
               name={name}
               onBlur={onBlur}
               onFocus={onFocus}
               overwrite={true}
               pattern='DD-MM-YYYY'
               placeholder={placeholder}
               placeholderChar=''
               type='text'
               value={memoizedValue}
               format={(date: Date | null) =>
                  date ? dateFormatter(date).format('DD-MM-YYYY') : ''
               }
               parse={(date: string) =>
                  dateFormatter(date, 'DD-MM-YYYY').toDate()
               }
               blocks={{
                  DD: {
                     mask: IMask.MaskedRange,
                     from: 1,
                     to: 31,
                     maxLength: 2,
                  },
                  MM: {
                     mask: IMask.MaskedRange,
                     from: 1,
                     to: 12,
                     maxLength: 2,
                  },
                  YYYY: {
                     mask: IMask.MaskedRange,
                     from: 1900,
                     to: 9999,
                  },
               }}
               onAccept={(acceptedValue, _maskRef, event) => {
                  const acceptedDate = String(acceptedValue);
                  const input = acceptedDate.split('-').reverse().join('-');
                  if (acceptedDate.length === 10) {
                     const inputDate = new Date(input).getTime();
                     const maxDate = max?.getTime();
                     const minDate = min?.getTime();
                     const newValue =
                        maxDate !== undefined && inputDate > maxDate
                           ? new Date(maxDate).toISOString().slice(0, 10)
                           : minDate !== undefined && inputDate < minDate
                             ? new Date(minDate).toISOString().slice(0, 10)
                             : input;
                     onChange?.(newValue, event ? { event } : undefined);
                     return;
                  } else {
                     onChange?.(input, event ? { event } : undefined);
                  }
               }}
            />
            <div className={dropdownTriggerClass(classNameOptions)}>
               {hasSuffix &&
                  (loading ? (
                     <div className='w-6 h-6 flex items-center justify-center'>
                        <Spinner />
                     </div>
                  ) : (
                     <ClearButton onChange={onChange} ref={ref} />
                  ))}
               <div
                  {...getReferenceProps()}
                  className={dropdownTriggerIconClass(classNameOptions)}
               >
                  <Down />
               </div>
            </div>
         </div>
         <ErrorMessage size={size} id={errorId} error={error} />
      </div>
   );
};
export default Control;
