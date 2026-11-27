import { Fragment, memo, useRef } from 'react';
import type { FormInputProps } from '../types';
import Control from './Control';
import Menu from './Menu';
import useDropdown from './useDropdown';
const ColorInput = memo(
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
      value,
   }: FormInputProps<HTMLInputElement>) => {
      const ref = useRef(null);
      const currentRef = innerRef ? innerRef : ref;
      const {
         context,
         floatingStyles,
         getFloatingProps,
         getReferenceProps,
         open,
         refs,
      } = useDropdown({ disabled });
      return (
         <Fragment>
            <Control
               ariaLabel={ariaLabel}
               autoComplete={autoComplete}
               background={background}
               clearable={clearable}
               dataCY={dataCY}
               disabled={disabled}
               error={error}
               getReferenceProps={getReferenceProps}
               id={id}
               loading={loading}
               name={name}
               onBlur={onBlur}
               onChange={onChange}
               onFocus={onFocus}
               placeholder={placeholder}
               ref={currentRef}
               refs={refs}
               size={size}
               value={value}
            />
            <Menu
               context={context}
               floatingStyles={floatingStyles}
               getFloatingProps={getFloatingProps}
               onChange={onChange}
               open={open}
               refs={refs}
               value={value}
            />
         </Fragment>
      );
   },
);
export default ColorInput;
