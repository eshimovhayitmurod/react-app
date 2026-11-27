import { FC } from 'react';
const Eraser: FC = () => (
   <svg fill='none' height='20' viewBox='0 0 20 20' width='20'>
      <mask
         height='20'
         id='mask0_21577_3374'
         maskUnits='userSpaceOnUse'
         style={{ maskType: 'alpha' }}
         width='20'
         x='0'
         y='0'
      >
         <rect width='20' height='20' fill='currentColor' />
      </mask>
      <g mask='url(#mask0_21577_3374)'>
         <path
            d='M14.3751 15H18.3334V16.6667H12.7084L14.3751 15ZM3.95839 16.6667L2.18756 14.8958C1.86811 14.5764 1.70492 14.1806 1.69798 13.7083C1.69103 13.2361 1.84728 12.8333 2.16673 12.5L11.3334 3C11.6528 2.66667 12.0452 2.5 12.5105 2.5C12.9758 2.5 13.3681 2.65972 13.6876 2.97917L17.8334 7.125C18.1528 7.44444 18.3126 7.84028 18.3126 8.3125C18.3126 8.78472 18.1528 9.18056 17.8334 9.5L10.8334 16.6667H3.95839ZM10.1251 15L16.6667 8.29167L12.5417 4.16667L3.33339 13.6667L4.66673 15H10.1251Z'
            fill='currentColor'
         />
      </g>
   </svg>
);
export default Eraser;
