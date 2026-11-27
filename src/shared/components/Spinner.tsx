import { memo } from 'react';
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const sizeMap: Record<SpinnerSize, { dimension: number; borderWidth: number }> =
   {
      xs: { dimension: 16, borderWidth: 2 },
      sm: { dimension: 20, borderWidth: 3 },
      md: { dimension: 24, borderWidth: 3 },
      lg: { dimension: 32, borderWidth: 4 },
      xl: { dimension: 40, borderWidth: 4 },
   };
type SpinnerProps = {
   size?: SpinnerSize;
};
const Spinner = memo(({ size = 'lg' }: SpinnerProps) => (
   <div
      className='rounded-[50%] cursor-wait relative'
      style={{
         height: sizeMap?.[size]?.dimension,
         width: sizeMap?.[size]?.dimension,
      }}
   >
      <div
         className='rounded-[50%] border-solid border-[#2f6feb] left-0 top-0 relative spinner-animation'
         style={{
            borderWidth: sizeMap?.[size]?.borderWidth,
            height: sizeMap?.[size]?.dimension,
            width: sizeMap?.[size]?.dimension,
         }}
      ></div>
   </div>
));
export default Spinner;
