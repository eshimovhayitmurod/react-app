import {
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
} from '@floating-ui/react';
import type { ReactNode } from 'react';
import { Fragment, useState } from 'react';
type TooltipProps = {
   children: ReactNode;
   disabled?: boolean;
   distance?: number;
   title?: string;
};
const Tooltip = ({
   children,
   distance = 6,
   disabled = false,
   title = '',
}: TooltipProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const { refs, floatingStyles, context } = useFloating({
      middleware: [offset(distance), flip(), shift()],
      onOpenChange: setIsOpen,
      open: isOpen,
      placement: 'top',
      whileElementsMounted: autoUpdate,
   });
   const click = useClick(context, { enabled: !disabled });
   const dismiss = useDismiss(context, { enabled: !disabled });
   const focus = useFocus(context, { enabled: !disabled });
   const hover = useHover(context, { move: true, enabled: !disabled });
   const role = useRole(context, { role: 'tooltip' });
   const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
      focus,
      hover,
      role,
   ]);
   return (
      <Fragment>
         <div {...getReferenceProps()} ref={node => refs.setReference(node)}>
            {children}
         </div>
         {isOpen && (
            <FloatingPortal id={import.meta.env.VITE_FLOATING_UI_PORTAL_ID}>
               <div
                  {...getFloatingProps()}
                  className='bg-(--editor-tooltip-bg-color) text-(--editor-tooltip-color) rounded-[10px] text-[13px] font-medium py-1.5 px-3 whitespace-pre-line w-max max-w-75 z-50 shadow-[0_0_20px_2px_rgba(0,0,0,0.12)]'
                  ref={node => refs.setFloating(node)}
                  style={floatingStyles}
               >
                  {title}
               </div>
            </FloatingPortal>
         )}
      </Fragment>
   );
};
export default Tooltip;
