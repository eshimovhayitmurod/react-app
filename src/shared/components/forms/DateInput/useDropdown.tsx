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
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
type DateDropdownProps = {
   disabled?: boolean;
   setCalendar: Dispatch<SetStateAction<Date>>;
   value?: string;
};
const useDropdown = ({
   disabled = false,
   setCalendar,
   value = '',
}: DateDropdownProps) => {
   const [open, setOpen] = useState(false);
   const { refs, floatingStyles, context } = useFloating({
      open,
      whileElementsMounted: autoUpdate,
      onOpenChange: open => {
         const calendar = value?.length === 10 ? new Date(value) : new Date();
         setCalendar(calendar);
         setOpen(open);
      },
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
