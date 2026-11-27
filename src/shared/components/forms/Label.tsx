import type { ReactNode } from 'react';
import { memo } from 'react';
type LabelProps = {
   children?: ReactNode;
   htmlFor?: string;
   isRequired?: boolean;
   size?: 'lg' | 'md' | 'sm';
};
const sizeClasses = {
   lg: 'text-[16px] pb-[4px]',
   md: 'text-[14px] pb-[3px]',
   sm: 'text-[12px] pb-[2px]',
};
const Label = memo(
   ({ children, isRequired = false, htmlFor, size = 'md' }: LabelProps) => (
      <label
         className={`inline-flex items-center font-medium text-(--input-label-color) ${sizeClasses[size]}`}
         htmlFor={htmlFor}
      >
         {children}
         {isRequired && (
            <strong className='text-(--input-required-color) font-bold ml-1'>*</strong>
         )}
      </label>
   ),
);
export default Label;
