import { memo, useId } from 'react';
import type { ChangeEvent } from 'react';
type SwitchInputProps = {
   'data-cy'?: string;
   id?: string;
   isDisabled?: boolean;
   name?: string;
   onChange?: (
      value: boolean,
      options: { event: ChangeEvent<HTMLInputElement> },
   ) => void;
   size?: 'large' | 'medium' | 'small';
   value?: boolean;
};
const sizeClasses = {
   large: {
      wrapper: 'h-8 w-14 min-w-14 rounded-[18px]',
      label: 'rounded-[18px]',
      thumb: 'size-6 rounded-xl',
   },
   medium: {
      wrapper: 'h-7 w-12 min-w-12 rounded-[14px]',
      label: 'rounded-[14px]',
      thumb: 'size-5 rounded-[10px]',
   },
   small: {
      wrapper: 'h-6 w-10 min-w-10 rounded-xl',
      label: 'rounded-xl',
      thumb: 'size-4 rounded-lg',
   },
};
const SwitchInput = memo(
   ({
      'data-cy': dataCY,
      id: innerId,
      isDisabled = false,
      name,
      onChange,
      size = 'medium',
      value = false,
   }: SwitchInputProps) => {
      const id = useId();
      const classes = sizeClasses[size];
      return (
         <div
            className={`block cursor-pointer overflow-hidden ${classes.wrapper}`}
            data-size={size}
         >
            <input
               checked={value}
               className='peer hidden'
               data-cy={dataCY}
               disabled={isDisabled}
               id={innerId || id}
               name={name}
               onChange={event =>
                  onChange?.(event.target.checked, { event })
               }
               type='checkbox'
            />
            <label
               aria-labelledby={innerId || id}
               className={`switch-input block size-full cursor-pointer bg-(--switch-track-color) p-1 hover:bg-(--switch-track-hover-color) peer-checked:bg-(--switch-track-checked-color) peer-checked:hover:bg-(--switch-track-checked-color) peer-checked:[&>span]:translate-x-full ${classes.label}`}
               htmlFor={innerId || id}
               tabIndex={-1}
            >
               <span
                  className={`block bg-(--switch-thumb-color) transition-[transform,background-color] duration-400 ease-[ease] ${classes.thumb}`}
               ></span>
            </label>
         </div>
      );
   },
);
export default SwitchInput;
