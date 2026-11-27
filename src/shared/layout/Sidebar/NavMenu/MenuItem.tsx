import { useFloatingTree, useListItem, useMergeRefs } from '@floating-ui/react';
import clsx from 'clsx';
import {
   useContext,
   useMemo,
   type ButtonHTMLAttributes,
   type FocusEvent,
   type MouseEvent,
   type Ref,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import {
   getLocalizedLabel,
   type MenuContextProps,
   type SidebarRoute,
} from '../types';
type MenuItemProps = MenuContextProps &
   Omit<SidebarRoute, 'children'> &
   Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
      ref?: Ref<HTMLButtonElement>;
   };
const MenuItem = ({
   MenuContext,
   path = '',
   ref: forwardedRef,
   ...props
}: MenuItemProps) => {
   const { pathname } = useLocation();
   const navigate = useNavigate();
   const { i18n } = useTranslation('layout');
   const language = i18n?.language;
   const name = useMemo(
      () => getLocalizedLabel(props, language),
      [props, language],
   );
   const item = useListItem({ label: name });
   const menu = useContext(MenuContext);
   const tree = useFloatingTree();
   const ref = useMergeRefs([item.ref, forwardedRef]);
   const isActive = useMemo(() => {
      return (
         path === pathname || String(pathname).startsWith((path || '') + '/')
      );
   }, [path, pathname]);
   const dataCY = useMemo(() => `button-sidebar-${path}`, [path]);
   const tabIndex = useMemo(() => {
      return path === pathname ||
         String(pathname).startsWith((path || '') + '/')
         ? 0
         : -1;
   }, [path, pathname]);
   return (
      <li className='flex h-10 m-0'>
         <button
            {...props}
            {...menu.getItemProps({
               onClick(event: MouseEvent<HTMLButtonElement>) {
                  navigate(path);
                  props.onClick?.(event);
                  tree?.events.emit('click');
               },
               onFocus(event: FocusEvent<HTMLButtonElement>) {
                  props.onFocus?.(event);
                  menu.setHasFocusInside(true);
               },
            })}
            data-cy={dataCY}
            ref={ref}
            tabIndex={tabIndex}
            className={clsx(
               'items-center rounded-[10px] flex text-[14px] font-medium h-full outline-none! focus:outline-none! text-left whitespace-nowrap w-full px-3 py-2',

               'text-[#878787] hover:text-[#ffffff]',
               'dark:text-[#c7c7c7] dark:hover:text-[#ffffff]',
               {
                  'text-[#ffffff] hover:text-[#ffffff]': isActive,
                  'dark:text-[#ffffff] dark:hover:text-[#ffffff]': isActive,
               },

               'hover:bg-[#3a79f3] dark:hover:bg-[#3a79f3]',
               {
                  'bg-[#3a79f3] hover:bg-[#3a79f3]': isActive,
                  'dark:bg-[#3a79f3] dark:hover:bg-[#3a79f3]': isActive,
               },
            )}
         >
            {name}
         </button>
      </li>
   );
};
export default MenuItem;
