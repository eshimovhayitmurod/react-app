import type { ChangeEvent, FocusEvent } from 'react';
import { memo, useCallback, useId, useMemo, useRef } from 'react';
import {
   containerClass,
   inputClass,
   inputContainerClass,
   inputSuffixClass,
} from '../classNames';
import ClearButton from '../components/ClearButton';
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';
import type { FormInputProps } from '../types';
import { normalizeNumberString, parseValue } from './helpers';
const NumberInput = memo(
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
      max,
      min,
      name,
      normalizeOnBlur = true,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref: innerRef,
      scale = 2,
      size = 'md',
      value = '',
   }: FormInputProps<HTMLInputElement> & {
      max?: string | number;
      min?: string | number;
      normalizeOnBlur?: boolean;
      scale?: number;
   }) => {
      const errorId = useId();
      const ref = useRef(null);
      const currentRef = innerRef ? innerRef : ref;
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
      const memoizedValue = useMemo(() => {
         const isValid = typeof value === 'string';
         const memoizedValue = isValid ? value : String(value);
         return memoizedValue;
      }, [value]);
      const onChangeInput = useCallback(
         (event: ChangeEvent<HTMLInputElement>) => {
            const value = String(
               parseValue(event.target.value, { scale, min, max }),
            );
            onChange?.(value, { event });
         },
         [onChange, min, max, scale],
      );
      const onBlurInput = useCallback(
         (event: FocusEvent<HTMLInputElement>) => {
            const value = event.target.value;
            const newValue = normalizeNumberString(value);
            if (value !== newValue && normalizeOnBlur) {
               onChange?.(newValue, { event });
            }
            if (typeof onBlur === 'function') {
               onBlur(event);
            }
         },
         [onBlur, onChange, normalizeOnBlur],
      );
      return (
         <div className={containerClass(classNameOptions)}>
            <div className={inputContainerClass(classNameOptions)}>
               <input
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={!!error}
                  aria-label={ariaLabel}
                  autoComplete={autoComplete}
                  className={inputClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={disabled}
                  id={id}
                  inputMode='numeric'
                  name={name}
                  onBlur={onBlurInput}
                  onChange={onChangeInput}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  ref={currentRef}
                  type='text'
                  value={memoizedValue}
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
export default NumberInput;
