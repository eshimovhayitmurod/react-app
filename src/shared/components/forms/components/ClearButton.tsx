import type { MouseEvent, Ref } from 'react';
import { memo, useCallback } from 'react';
import { clearButtonClass } from '../classNames';
import type { FormChangeHandler } from '../types';
type ClearButtonProps = {
   onChange?: FormChangeHandler<string>;
   ref?: Ref<HTMLInputElement>;
};
const ClearButton = memo(({ onChange, ref }: ClearButtonProps) => {
   const onClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
         onChange?.('', { event: event.nativeEvent });
         if (ref && typeof ref !== 'function') {
            ref.current?.focus();
         }
      },
      [onChange, ref],
   );
   return (
      <button onClick={onClick} type='button' className={clearButtonClass()}>
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
      </button>
   );
});
export default ClearButton;
