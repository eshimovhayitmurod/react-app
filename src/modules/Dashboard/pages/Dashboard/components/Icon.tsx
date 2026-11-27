import { CSSProperties } from 'react';
const Icon = ({
   className,
   d,
   size = 18,
   stroke = 1.8,
   style,
}: {
   className?: string;
   d: string;
   size?: number;
   stroke?: number;
   style?: CSSProperties;
}) => {
   return (
      <svg
         aria-hidden
         className={className}
         fill='none'
         height={size}
         stroke='currentColor'
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth={stroke}
         style={style}
         viewBox='0 0 24 24'
         width={size}
      >
         <path d={d} />
      </svg>
   );
};
export default Icon;
