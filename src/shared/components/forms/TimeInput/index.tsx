import { Fragment, memo, useEffect, useRef } from 'react';
import type { FormInputProps } from '../types';
import { options } from './constants';
import Control from './Control';
import Menu from './Menu';
import useDropdown from './useDropdown';
const TimeInput = memo(
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
      seconds = true,
      size = 'md',
      value,
   }: Omit<FormInputProps<HTMLInputElement>, 'value' | 'onChange'> & {
      onChange?: FormInputProps<HTMLInputElement>['onChange'];
      seconds?: boolean;
      value?: string;
   }) => {
      const ref = useRef(null);
      const currentRef = innerRef ? innerRef : ref;
      const listRef = useRef<(HTMLElement | null)[]>([]);
      const optionsCount = options?.length;
      const {
         activeIndex,
         context,
         floatingStyles,
         getFloatingProps,
         getItemProps,
         getReferenceProps,
         open,
         refs,
         setActiveIndex,
         setOpen,
      } = useDropdown({ disabled, listRef });
      useEffect(() => {
         listRef.current = [];
         for (let i = 0; i < optionsCount; i++) {
            listRef.current[i] = null;
         }
      }, [optionsCount, listRef]);
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
               seconds={seconds}
               size={size}
               value={value}
            />
            <Menu
               activeIndex={activeIndex}
               context={context}
               floatingStyles={floatingStyles}
               getFloatingProps={getFloatingProps}
               getItemProps={getItemProps}
               listRef={listRef}
               onChange={onChange}
               open={open}
               options={options}
               refs={refs}
               setActiveIndex={setActiveIndex}
               setOpen={setOpen}
               value={value}
            />
         </Fragment>
      );
   },
);
export default TimeInput;
