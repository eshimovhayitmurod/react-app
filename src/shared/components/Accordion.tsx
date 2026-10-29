import { memo, ReactElement } from 'react';
const Accordion = memo(
   ({ children, open = false }: { children: ReactElement; open: boolean }) => (
      <div
         className='grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-400 data-[open=true]:grid-rows-[1fr]'
         data-open={open}
      >
         <div className='min-h-0'>{children}</div>
      </div>
   ),
);
export default Accordion;
