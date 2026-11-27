import type { FocusEvent } from 'react';
import { memo, useId, useMemo, useRef, useState } from 'react';
import { IMaskInput } from 'react-imask';
import {
   containerClass,
   inputClass,
   inputContainerClass,
   inputSuffixClass,
} from './classNames';
import ClearButton from './components/ClearButton';
import ErrorMessage from './components/ErrorMessage';
import Spinner from './components/Spinner';
import type { FormInputProps } from './types';
const PhoneInput = memo(
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
      const ref = useRef(null);
      const currentRef = innerRef ? innerRef : ref;
      const [lazy, setLazy] = useState(true);
      const hasSuffix = useMemo(
         () => !!loading || (!!clearable && !disabled && value),
         [loading, clearable, disabled, value],
      );
      const classNameOptions = {
         background,
         clearable: !!clearable,
         disabled: !!disabled,
         error: !!error,
         loading: !!loading,
         size,
      };
      return (
         <div className={containerClass(classNameOptions)}>
            <div className={inputContainerClass(classNameOptions)}>
               <IMaskInput
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={!!error}
                  aria-label={ariaLabel}
                  autoComplete={autoComplete}
                  className={inputClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={!!disabled}
                  id={id}
                  inputMode='numeric'
                  inputRef={currentRef}
                  lazy={lazy}
                  mask='+998 (00) 000 00 00'
                  name={name}
                  placeholder={placeholder}
                  placeholderChar=' '
                  type='text'
                  value={value}
                  onAccept={(value, _maskRef, event) => {
                     const inputValue = String(value);
                     const cleaned = inputValue.replace(/\D/g, '');
                     const newValue =
                        cleaned === '998'
                           ? ''
                           : inputValue.replace(/\)|\(| /g, '');
                     onChange?.(newValue, event ? { event } : undefined);
                  }}
                  onBlur={(e: FocusEvent<HTMLInputElement>) => {
                     setLazy(true);
                     if (typeof onBlur === 'function') {
                        onBlur(e);
                     }
                  }}
                  onFocus={(e: FocusEvent<HTMLInputElement>) => {
                     setLazy(false);
                     if (typeof onFocus === 'function') {
                        onFocus(e);
                     }
                  }}
               />
               {hasSuffix && (
                  <div className={inputSuffixClass(classNameOptions)}>
                     {loading ? (
                        <Spinner />
                     ) : (
                        <ClearButton onChange={onChange} ref={currentRef} />
                     )}
                  </div>
               )}
            </div>
            <ErrorMessage size={size} id={errorId} error={error} />
         </div>
      );
   },
);
export default PhoneInput;
