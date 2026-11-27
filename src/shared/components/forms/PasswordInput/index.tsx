import { memo, useId, useMemo, useRef, useState } from 'react';
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
import Close from '../Icons/Close';
import Open from '../Icons/Open';
import type { FormInputProps } from '../types';
const PasswordInput = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY,
      autoComplete,
      background = '(--color-input-bg-color)',
      clearable = false,
      disabled = false,
      error = '',
      id,
      loading = false,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref: innerRef,
      size = 'md',
      value = '',
   }: FormInputProps<HTMLInputElement>) => {
      const errorId = useId();
      const ref = useRef<HTMLInputElement | null>(null);
      const currentRef = innerRef ? innerRef : ref;
      const [type, setType] = useState(false);
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
      return (
         <div className={containerClass(classNameOptions)}>
            <div className={dropdownContainerClass(classNameOptions)}>
               <input
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={!!error}
                  aria-label={ariaLabel}
                  autoComplete={autoComplete}
                  className={dropdownInputClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={!!disabled}
                  id={id}
                  name={name}
                  onBlur={onBlur}
                  onChange={event => onChange?.(event.target.value, { event })}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  ref={currentRef}
                  type={type ? 'text' : 'password'}
                  value={value}
               />
               <div className={dropdownTriggerClass(classNameOptions)}>
                  {hasSuffix &&
                     (loading ? (
                        <div className='w-6 h-6 flex items-center justify-center'>
                           <Spinner />
                        </div>
                     ) : (
                        <ClearButton onChange={onChange} ref={currentRef} />
                     ))}
                  <button
                     className={dropdownTriggerIconClass(classNameOptions)}
                     disabled={disabled}
                     type='button'
                     onClick={() => {
                        setType(!type);
                        if (
                           currentRef &&
                           typeof currentRef !== 'function' &&
                           currentRef.current
                        ) {
                           currentRef.current.focus();
                        }
                     }}
                  >
                     {type ? <Close /> : <Open />}
                  </button>
               </div>
            </div>
            <ErrorMessage size={size} id={errorId} error={error} />
         </div>
      );
   },
);
export default PasswordInput;
