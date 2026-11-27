import {
   autoUpdate,
   flip,
   offset,
   size,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useListNavigation,
   useRole,
} from '@floating-ui/react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useMemo, useState } from 'react';
import { defaultFilter } from './constants';
import type { SelectFilter, SelectOption } from './types';
export type SelectOptionListRef = (HTMLElement | null)[] & {
   null?: HTMLElement | null;
};
type UseDropdownProps = {
   getData: (filter: SelectFilter) => Promise<void>;
   disabled?: boolean;
   listRef: MutableRefObject<SelectOptionListRef>;
   options?: SelectOption[];
   setFilter: Dispatch<SetStateAction<SelectFilter>>;
   type: 'select' | 'autocomplete';
};
const useDropdown = ({
   getData,
   disabled = false,
   listRef,
   options = [],
   setFilter,
   type,
}: UseDropdownProps) => {
   const [activeIndex, setActiveIndex] = useState<number | null>(0);
   const [open, setOpen] = useState(false);
   const enabled = useMemo(() => !disabled, [disabled]);
   const disabledIndices = useMemo(() => {
      const disabledIndices = options
         .map((option = {}, index = 0) => ({
            ...option,
            index,
         }))
         .filter(option => option?.disabled)
         .map(option => option?.index);
      return disabledIndices;
   }, [options]);
   const { refs, floatingStyles, context } = useFloating({
      open,
      whileElementsMounted: autoUpdate,
      onOpenChange: open => {
         setActiveIndex(0);
         setOpen(open);
         if (!disabled && open && type === 'autocomplete') {
            getData(defaultFilter);
            setFilter(defaultFilter);
         }
      },
      middleware: [
         offset(0),
         flip({ padding: 10 }),
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
   const role = useRole(context, { role: 'listbox' });
   const dismiss = useDismiss(context);
   const click = useClick(context, { enabled });
   const listNavigation = useListNavigation(context, {
      activeIndex,
      disabledIndices,
      listRef,
      loop: false,
      onNavigate: setActiveIndex,
      selectedIndex: null,
      virtual: true,
   });
   const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([click, role, dismiss, listNavigation]);
   return {
      activeIndex,
      context,
      floatingStyles,
      getFloatingProps,
      getItemProps,
      getReferenceProps,
      listRef,
      open,
      refs,
      setActiveIndex,
      setOpen,
   };
};
export default useDropdown;
