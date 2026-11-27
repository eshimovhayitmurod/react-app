import {
   arrow,
   autoUpdate,
   flip,
   FloatingPortal,
   offset,
   shift,
   useClick,
   useDismiss,
   useFloating,
   useFocus,
   useHover,
   useInteractions,
   useRole,
   type Placement,
} from '@floating-ui/react';
import { Fragment, useRef, useState, type ReactNode } from 'react';
type TooltipProps = {
   arrow?: boolean;
   children: ReactNode;
   events?: TooltipEvent[];
   isDisabled?: boolean;
   offset?: number;
   placement?: Placement;
   title?: string;
};
type TooltipEvent = 'hover' | 'click' | 'focus';
type Side = 'top' | 'bottom' | 'left' | 'right';
const Tooltip = ({
   arrow: hasArrow = false,
   children,
   events = ['hover', 'click', 'focus'],
   isDisabled = false,
   offset: tooltipOffset = 6,
   placement: tooltipPlacement = 'top',
   title = '',
}: TooltipProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const arrowRef = useRef<HTMLDivElement | null>(null);
   const { refs, floatingStyles, context, placement, middlewareData } =
      useFloating({
         open: isOpen,
         onOpenChange: setIsOpen,
         placement: tooltipPlacement,
         whileElementsMounted: autoUpdate,
         middleware: [
            offset(tooltipOffset + 8),
            flip(),
            shift(),
            arrow({ element: arrowRef }),
         ],
      });
   const click = useClick(context, {
      enabled: !isDisabled && events.includes('click'),
      toggle: true,
   });
   const dismiss = useDismiss(context, { enabled: !isDisabled });
   const focus = useFocus(context, {
      enabled: !isDisabled && events.includes('focus'),
   });
   const hover = useHover(context, {
      move: true,
      enabled: !isDisabled && events.includes('hover'),
   });
   const role = useRole(context, { role: 'tooltip' });
   const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
      focus,
      hover,
      role,
   ]);
   const staticSideMap: Record<Side, Side> = {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
   };
   const staticSide = staticSideMap[placement.split('-')[0] as Side];
   return (
      <Fragment>
         <div
            ref={refs.setReference}
            {...getReferenceProps({
               onClick: (event: React.MouseEvent<HTMLDivElement>) => {
                  event.stopPropagation();
               },
            })}
         >
            {children}
         </div>
         {isOpen && (
            <FloatingPortal id={import.meta.env.VITE_FLOATING_UI_PORTAL_ID}>
               <div
                  {...getFloatingProps({
                     onClick: (event: React.MouseEvent<HTMLDivElement>) => {
                        event.preventDefault();
                        event.stopPropagation();
                     },
                  })}
                  className='modal-bg-color text-[#272727] dark:text-[#f2f2f2] rounded-[10px] text-[14px] font-regular py-1.5 px-3 whitespace-pre-line w-max max-w-75 z-50 shadow-[0_0_20px_2px_rgba(0,0,0,0.12)]'
                  ref={refs.setFloating}
                  style={floatingStyles}
               >
                  {title}
                  {hasArrow && (
                     <div
                        ref={arrowRef}
                        className='absolute w-3 h-3 modal-bg-color rotate-45 z-1'
                        style={{
                           left:
                              middlewareData.arrow?.x != null
                                 ? `${middlewareData.arrow.x}px`
                                 : '',
                           top:
                              middlewareData.arrow?.y != null
                                 ? `${middlewareData.arrow.y}px`
                                 : '',
                           right: '',
                           bottom: '',
                           [staticSide]: '-6px',
                        }}
                     />
                  )}
               </div>
            </FloatingPortal>
         )}
      </Fragment>
   );
};

export default Tooltip;
