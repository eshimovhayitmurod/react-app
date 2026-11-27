import {
   autoUpdate,
   flip,
   offset,
   shift,
   size,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useListNavigation,
   useRole,
} from '@floating-ui/react';
import type { MutableRefObject } from 'react';
import { useState } from 'react';
type TimeDropdownProps = {
   disabled?: boolean;
   listRef: MutableRefObject<(HTMLElement | null)[]>;
};
const useDropdown = ({ disabled = false, listRef }: TimeDropdownProps) => {
   const [open, setOpen] = useState(false);
   const [activeIndex, setActiveIndex] = useState<number | null>(0);
   const { refs, floatingStyles, context } = useFloating({
      open,
      whileElementsMounted: autoUpdate,
      onOpenChange: open => {
         setOpen(open);
         setActiveIndex(0);
      },
      middleware: [
         offset(0),
         flip({ fallbackAxisSideDirection: 'end' }),
         shift(),
         size({
            apply({ rects, elements, availableHeight }) {
               Object.assign(elements.floating.style, {
                  maxHeight: `${availableHeight}px`,
                  minWidth: `${rects.reference.width}px`,
                  width: `${rects.reference.width}px`,
               });
            },
         }),
      ],
   });
   const click = useClick(context, { enabled: !disabled });
   const dismiss = useDismiss(context);
   const role = useRole(context);
   const listNavigation = useListNavigation(context, {
      activeIndex,
      listRef,
      loop: false,
      onNavigate: setActiveIndex,
      selectedIndex: null,
      virtual: true,
   });
   const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([click, dismiss, role, listNavigation]);
   return {
      activeIndex,
      context,
      floatingStyles,
      getFloatingProps,
      getItemProps,
      getReferenceProps,
      open,
      refs,
      setActiveIndex,
      setOpen,
      listRef,
   };
};
export default useDropdown;
