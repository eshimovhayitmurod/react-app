import {
   autoUpdate,
   flip,
   offset,
   shift,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useRole,
} from '@floating-ui/react';
import { useState } from 'react';
type ColorDropdownProps = {
   disabled?: boolean;
};

const useDropdown = ({ disabled = false }: ColorDropdownProps) => {
   const [open, setOpen] = useState(false);
   const { refs, floatingStyles, context } = useFloating({
      open,
      whileElementsMounted: autoUpdate,
      onOpenChange: setOpen,
      middleware: [
         offset(0),
         flip({ fallbackAxisSideDirection: 'end' }),
         shift(),
      ],
   });
   const click = useClick(context, { enabled: !disabled });
   const dismiss = useDismiss(context);
   const role = useRole(context);
   const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
      role,
   ]);
   return {
      context,
      floatingStyles,
      getFloatingProps,
      getReferenceProps,
      open,
      refs,
      setOpen,
   };
};
export default useDropdown;
