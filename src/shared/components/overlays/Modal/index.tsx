import {
   FloatingFocusManager,
   FloatingOverlay,
   FloatingPortal,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useRole,
   useTransitionStyles,
} from '@floating-ui/react';
import { useMemo, type ReactNode } from 'react';
import CloseButton from './CloseButton';
interface ModalProps {
   autoFocus?: boolean;
   children: ReactNode;
   closeOnClickEscape?: boolean;
   closeOnOverlayClick?: boolean;
   disabled?: boolean;
   hasCloseButton?: boolean;
   lockScroll?: boolean;
   maxWidth?: number | string;
   onClose: (open: boolean) => void;
   onOpen: (open: boolean) => void;
   open?: boolean;
}
const Modal = ({
   autoFocus = true,
   children,
   closeOnClickEscape = true,
   closeOnOverlayClick = true,
   disabled = false,
   hasCloseButton = true,
   lockScroll = true,
   maxWidth = 450,
   onClose,
   onOpen,
   open = false,
}: ModalProps) => {
   const { refs, context } = useFloating({
      open,
      onOpenChange: (isOpen: boolean) => {
         if (isOpen) {
            onOpen(isOpen);
         } else {
            onClose(isOpen);
         }
      },
   });
   const closable = useMemo(
      () => !!hasCloseButton && !disabled,
      [hasCloseButton, disabled],
   );
   const { styles, isMounted } = useTransitionStyles(context, {
      common: { transformOrigin: 'center' },
      duration: 300,
      initial: {
         opacity: 0,
         transform: 'translateY(-100px)',
      },
      open: {
         opacity: 1,
         transform: 'translateY(0)',
      },
   });
   const click = useClick(context);
   const role = useRole(context);
   const dismiss = useDismiss(context, {
      enabled: !disabled,
      escapeKey: !!closeOnClickEscape,
      outsidePress: !!closeOnOverlayClick,
      outsidePressEvent: 'pointerdown',
   });
   const { getFloatingProps } = useInteractions([click, dismiss, role]);
   return (
      isMounted && (
         <FloatingPortal id={import.meta.env.VITE_FLOATING_UI_PORTAL_ID}>
            <FloatingOverlay
               className='bg-[#00000066] items-center flex h-dvh justify-center p-5 w-full [@media(max-width:414px)]:p-3'
               lockScroll={lockScroll}
            >
               <FloatingFocusManager
                  context={context}
                  initialFocus={autoFocus ? 0 : -1}
               >
                  <div
                     {...getFloatingProps()}
                     className='bg-[#ffffff] dark:bg-[#121822] rounded-[20px]! m-auto p-0 relative'
                     ref={refs.setFloating}
                     style={{
                        ...styles,
                        width: maxWidth,
                        maxWidth: '100%',
                     }}
                  >
                     {children}
                     {closable && (
                        <button
                           type='button'
                           className='text-[#000000] dark:text-[#ffffff] rounded-full items-center border-none cursor-pointer flex h-7 justify-center outline-none p-0 absolute right-4 top-4 w-7 [@media(max-width:414px)]:right-3 [@media(max-width:414px)]:top-3'
                           onClick={() => onClose(false)}
                        >
                           <CloseButton />
                        </button>
                     )}
                  </div>
               </FloatingFocusManager>
            </FloatingOverlay>
         </FloatingPortal>
      )
   );
};

export default Modal;
