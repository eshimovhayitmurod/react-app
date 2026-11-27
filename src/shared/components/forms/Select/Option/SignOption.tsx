import { useMemo } from 'react';
import type { SelectOptionDisplayProps } from '../types';
const SignOption = ({
   innerRef = {},
   isFocused = false,
   isSelected = false,
   option = {},
}: SelectOptionDisplayProps) => {
   const PINFL = option?.apiData?.PINFL;
   const TIN = option?.apiData?.TIN;
   const CN = option?.apiData?.CN;
   const O = option?.apiData?.O;
   const isBusiness = useMemo(() => {
      const TIN = !!option?.apiData?.TIN;
      const O = !!option?.apiData?.O;
      const isBusiness = O && TIN;
      return isBusiness;
   }, [option]);
   const validDate = useMemo(() => {
      const validTo = option?.apiData?.validTo;
      if (typeof validTo !== 'string' || !validTo) return '';
      const date = new Date(validTo);
      if (Number.isNaN(date.getTime())) return '';
      return date.toISOString().slice(0, 10).split('-').reverse().join('.');
   }, [option]);
   return (
      <div
         data-focused={isFocused}
         data-selected={isSelected}
         style={{
            background: isFocused
               ? 'var(--sign-option-focus-bg-color)'
               : 'none',
         }}
         className='min-h-11 w-full rounded-[10px] border-none bg-transparent p-2 pl-3 text-base font-medium text-(--option-color) cursor-pointer outline-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
         {...innerRef}
      >
         <div className='pb-1 text-[17px] overflow-hidden text-ellipsis whitespace-nowrap'>
            {O ? O : CN}
         </div>
         <div className='flex items-center gap-2.5'>
            <div className='rounded-[10px] border border-(--sign-option-badge-border-color) bg-(--sign-option-badge-bg-color) px-2.5 py-0.5 text-[15px] font-medium text-(--sign-option-badge-color)'>
               {isBusiness ? TIN : PINFL}
            </div>
            <div className='rounded-[10px] border border-(--sign-option-badge-border-color) bg-(--sign-option-badge-bg-color) px-2.5 py-0.5 text-[15px] font-medium text-(--sign-option-badge-color)'>
               to
               <span className='ms-1'>{validDate}</span>
            </div>
            {option?.disabled ? (
               <div className='rounded-[10px] bg-(--sign-option-danger-bg-color) px-2.5 py-0.5 text-[15px] font-medium text-white'>
                  Expired
               </div>
            ) : null}
         </div>
      </div>
   );
};
export default SignOption;
