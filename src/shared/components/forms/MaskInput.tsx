import { memo, useId, useMemo, useRef } from 'react';
import { IMask, IMaskInput } from 'react-imask';
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
type MaskConfig = {
   mask: string | Array<{ mask: string }>;
   transform: (value: string) => string;
   value: string;
};
const types = [
   {
      mask: '00000000000000000000',
      transform: value => value,
      value: 'account',
   },
   {
      mask: '000000000',
      transform: value => value,
      value: 'tin',
   },
   {
      mask: '00000',
      transform: value => value,
      value: 'mfo',
   },
   {
      mask: 'aa 0000000',
      transform: value => value.replace(' ', '').toUpperCase(),
      value: 'passport',
   },
   {
      mask: '00000000000000',
      transform: value => value,
      value: 'pinfl',
   },
   {
      mask: '00/00',
      transform: value => value,
      value: 'card-expire',
   },
   {
      mask: '0000 0000 0000 0000',
      transform: value => value.replace(/ /g, ''),
      value: 'card',
   },
   {
      mask: [{ mask: '00 a 000 aa' }, { mask: '00 000 aaa' }],
      transform: value => value.toUpperCase(),
      value: 'transport-number',
   },
] as const satisfies readonly MaskConfig[];
const typesList = types.map(type => type?.value);
type MaskInputProps = FormInputProps<HTMLInputElement> & {
   type?: (typeof types)[number]['value'];
};
const MaskInput = memo(
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
      type = 'tin',
      value = '',
   }: MaskInputProps) => {
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
      const inputMode = useMemo(
         () => (type === 'passport' && value?.length < 2 ? 'text' : 'numeric'),
         [type, value],
      );
      const newType = useMemo(
         () => (typesList.includes(type) ? type : 'tin'),
         [type],
      );
      const transform = useMemo(() => {
         const transform = types.find(
            type => type?.value === newType,
         )?.transform;
         return transform;
      }, [newType]);
      const mask = useMemo(() => {
         const maskConfig =
            types.find(type => type?.value === newType)?.mask ?? types[1].mask;
         const masks = Array.isArray(maskConfig)
            ? [...maskConfig]
            : [{ mask: maskConfig }];
         return new IMask.MaskedDynamic({ mask: masks });
      }, [newType]);
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
                  disabled={disabled}
                  id={id}
                  inputMode={inputMode}
                  inputRef={currentRef}
                  mask={mask}
                  name={name}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  type='text'
                  value={value}
                  onAccept={(value, _maskRef, event) => {
                     const inputValue = String(value);
                     onChange?.(
                        transform?.(inputValue) ?? inputValue,
                        event ? { event } : undefined,
                     );
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
export default MaskInput;
