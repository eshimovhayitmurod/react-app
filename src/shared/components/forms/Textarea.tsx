import { memo, useId, useRef } from 'react';
import {
   containerClass,
   textareaClass,
   textareaContainerClass,
} from './classNames';
import ErrorMessage from './components/ErrorMessage';
import type { FormInputProps } from './types';
const Textarea = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY,
      autoComplete,
      background = '(--color-input-bg-color)',
      disabled = false,
      error = '',
      id,
      maxLength = 1000,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref: innerRef,
      size = 'md',
      value = '',
   }: FormInputProps<HTMLTextAreaElement> & { maxLength?: number }) => {
      const errorId = useId();
      const ref = useRef(null);
      const currentRef = innerRef ? innerRef : ref;
      const classNameOptions = {
         background,
         disabled: !!disabled,
         error: !!error,
         size,
      };
      return (
         <div className={containerClass(classNameOptions)}>
            <div className={textareaContainerClass(classNameOptions)}>
               <textarea
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={!!error}
                  aria-label={ariaLabel}
                  autoComplete={autoComplete}
                  className={textareaClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={!!disabled}
                  id={id}
                  maxLength={maxLength}
                  name={name}
                  onBlur={onBlur}
                  onChange={event => onChange?.(event.target.value, { event })}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  ref={currentRef}
                  value={value}
               />
            </div>
            <ErrorMessage size={size} id={errorId} error={error} />
         </div>
      );
   },
);
export default Textarea;
