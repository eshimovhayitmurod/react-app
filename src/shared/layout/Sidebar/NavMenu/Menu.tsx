import {
   flip,
   FloatingFocusManager,
   FloatingList,
   FloatingNode,
   FloatingPortal,
   offset,
   safePolygon,
   shift,
   useDismiss,
   useFloating,
   useFloatingNodeId,
   useHover,
   useInteractions,
   useListItem,
   useListNavigation,
   useMergeRefs,
   useRole,
   useTypeahead as useTypeAhead,
} from '@floating-ui/react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import {
   useContext,
   useMemo,
   useRef,
   useState,
   type FocusEvent,
   type HTMLAttributes,
   type ReactNode,
   type Ref,
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import type { MenuContextProps, SidebarRoute } from '../types';
interface MenuProps extends MenuContextProps, HTMLAttributes<HTMLLIElement> {
   children?: ReactNode;
   collapsed?: boolean;
   Icon?: LucideIcon;
   menuList?: SidebarRoute[];
   path?: string;
   ref?: Ref<HTMLButtonElement>;
}
const Menu = ({
   MenuContext,
   children,
   collapsed = false,
   Icon,
   menuList = [],
   path = '',
   ref: forwardedRef,
   ...props
}: MenuProps) => {
   const [activeIndex, setActiveIndex] = useState<number | null>(null);
   const [hasFocusInside, setHasFocusInside] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const elementsRef = useRef<Array<HTMLElement | null>>([]);
   const labelsRef = useRef<string[]>([]);
   const parent = useContext(MenuContext);
   const item = useListItem();
   const nodeId = useFloatingNodeId();
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const isChildActive = useMemo(
      () =>
         menuList.some(
            child =>
               child.path &&
               (pathname === child.path ||
                  pathname.startsWith(child.path + '/')),
         ),
      [menuList, pathname],
   );
   const { floatingStyles, refs, context } = useFloating({
      middleware: [flip(), offset(6), shift()],
      nodeId,
      onOpenChange: setIsOpen,
      open: isOpen,
      placement: 'left',
      strategy: 'fixed',
   });
   const hover = useHover(context, {
      enabled: true,
      delay: { open: 0, close: 0 },
      handleClose: safePolygon({ blockPointerEvents: true }),
   });
   const dismiss = useDismiss(context);
   const role = useRole(context, { role: 'menu' });
   const listNavigation = useListNavigation(context, {
      activeIndex,
      listRef: elementsRef,
      nested: false,
      onNavigate: setActiveIndex,
   });
   const typeAhead = useTypeAhead(context, {
      activeIndex,
      listRef: labelsRef,
      onMatch: isOpen ? setActiveIndex : undefined,
   });
   const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([dismiss, hover, listNavigation, role, typeAhead]);
   return (
      <FloatingNode id={nodeId}>
         <li className='flex h-12 m-0 w-full'>
            <button
               {...getReferenceProps(
                  parent.getItemProps({
                     ...props,
                     onFocus(event: FocusEvent<HTMLLIElement>) {
                        parent.setHasFocusInside(true);
                        props.onFocus?.(event);
                        setHasFocusInside(false);
                     },
                  }),
               )}
               ref={useMergeRefs([forwardedRef, item.ref, refs.setReference])}
               data-cy={`button-sidebar-${path}`}
               data-focus-inside={hasFocusInside ? '' : undefined}
               data-open={isOpen ? '' : undefined}
               role='menuitem'
               tabIndex={0}
               className={clsx(
                  'items-center rounded-3xl flex h-full w-full text-right',
                  'outline-none -outline-offset-2 focus:outline-2 focus:outline-solid focus:outline-[#3a79f3]',
                  collapsed ? 'p-0 justify-center' : 'px-3 py-2',

                  isChildActive
                     ? 'text-[#ffffff] dark:text-[#ffffff] hover:text-[#ffffff] dark:hover:text-[#ffffff]'
                     : 'text-[#878787] hover:text-[#ffffff] dark:text-[#c7c7c7] dark:hover:text-[#ffffff]',

                  isChildActive
                     ? 'bg-[#3a79f3] hover:bg-[#3a79f3] dark:bg-[#3a79f3] dark:hover:bg-[#3a79f3]'
                     : 'bg-transparent hover:bg-[#3a79f3] dark:bg-transparent dark:hover:bg-[#3a79f3]',
               )}
               onClick={() => {
                  const path = menuList?.[0]?.path;
                  if (path) {
                     navigate(path);
                  }
               }}
            >
               <div className={clsx('h-6 w-6', collapsed ? 'm-0' : 'ml-1')}>
                  {Icon && <Icon />}
               </div>
            </button>
         </li>
         <MenuContext.Provider
            value={{
               activeIndex,
               getItemProps,
               isOpen,
               setActiveIndex,
               setHasFocusInside,
            }}
         >
            <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
               {isOpen && (
                  <FloatingPortal
                     id={import.meta.env.VITE_FLOATING_UI_PORTAL_ID}
                  >
                     <FloatingFocusManager
                        context={context}
                        initialFocus={0}
                        modal={false}
                        returnFocus={true}
                     >
                        <div
                           {...getFloatingProps()}
                           ref={refs?.setFloating}
                           style={floatingStyles}
                           className={clsx(
                              'max-h-dvh shadow-[0_1px_20px_rgba(13,46,105,0.2)] dark:shadow-[0_1px_20px_rgba(0,0,0,0.2)] scrollbar-hide',
                              'rounded-xl opacity-100! outline-none p-1.25 overflow-auto',
                              'bg-[#f6f6f6] dark:bg-[#272727]',
                           )}
                        >
                           {children}
                        </div>
                     </FloatingFocusManager>
                  </FloatingPortal>
               )}
            </FloatingList>
         </MenuContext.Provider>
      </FloatingNode>
   );
};
export default Menu;
