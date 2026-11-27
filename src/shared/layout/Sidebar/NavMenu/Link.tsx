import {
   autoUpdate,
   flip,
   FloatingPortal,
   offset,
   shift,
   useDismiss,
   useFloating,
   useFocus,
   useHover,
   useInteractions,
   useRole,
} from '@floating-ui/react';
import clsx from 'clsx';
import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router';
import { getLocalizedLabel, type NavMenuProps } from '../types';
const Link = memo(
   ({
      collapsed = false,
      Icon,
      path = '',
      setActiveIndex,
      index = 0,
      ...rest
   }: NavMenuProps) => {
      const { pathname } = useLocation();
      const { i18n } = useTranslation('layout');
      const language = i18n?.language;
      const [isOpen, setIsOpen] = useState(false);
      const { refs, floatingStyles, context } = useFloating({
         onOpenChange: setIsOpen,
         open: isOpen,
         placement: 'right',
         whileElementsMounted: autoUpdate,
         middleware: [
            shift(),
            offset(6),
            flip({ fallbackAxisSideDirection: 'start' }),
         ],
      });
      const dismiss = useDismiss(context);
      const focus = useFocus(context, { enabled: collapsed });
      const hover = useHover(context, { enabled: collapsed, move: true });
      const role = useRole(context, { role: 'tooltip' });
      const { getReferenceProps, getFloatingProps } = useInteractions([
         dismiss,
         focus,
         hover,
         role,
      ]);
      const dataCY = useMemo(() => `link-sidebar-${path}`, [path]);
      const name = useMemo(
         () => getLocalizedLabel(rest, language),
         [rest, language],
      );
      useEffect(() => {
         const isActive =
            path === pathname || pathname.startsWith((path || '') + '/');
         if (isActive) {
            setActiveIndex(index);
         }
      }, [pathname, index, setActiveIndex, path]);
      return (
         <li className='flex min-h-12 m-0 h-auto w-full relative items-center'>
            <div className='flex w-full items-center'>
               <NavLink
                  {...getReferenceProps()}
                  data-collapsed={collapsed}
                  data-cy={dataCY}
                  ref={refs.setReference}
                  to={path}
                  className={clsx(
                     'items-center flex min-h-12 h-auto outline-offset-0! p-3 flex-1 min-w-0 no-underline',
                     // color
                     'text-[#878787] dark:text-[#c7c7c7]',
                     'hover:text-[#ffffff] dark:hover:text-[#ffffff]',
                     '[&.active]:text-[#ffffff] [&.active:hover]:text-[#ffffff]',
                     'dark:[&.active]:text-[#ffffff] dark:[&.active:hover]:text-[#ffffff]',
                     // bg
                     'hover:bg-[#3a79f3] dark:hover:bg-[#3a79f3]',
                     '[&.active]:bg-[#3a79f3] [&.active:hover]:bg-[#3a79f3]',
                     'dark:[&.active]:bg-[#3a79f3] ',
                     'dark:[&.active:hover]:bg-[#3a79f3]',
                     {
                        'rounded-xl': !collapsed,
                        'rounded-3xl justify-center': !!collapsed,
                     },
                  )}
               >
                  <div
                     className={clsx('h-6 w-6 shrink-0 text-current', {
                        'm-0': !!collapsed,
                        'mr-3': !collapsed,
                     })}
                  >
                     {Icon && <Icon />}
                  </div>
                  <div
                     className={clsx(
                        'line-clamp-2 flex-1 text-left text-base font-normal whitespace-normal wrap-break-word',
                        { hidden: !!collapsed },
                     )}
                  >
                     {name}
                  </div>
               </NavLink>
            </div>
            {isOpen && (
               <FloatingPortal id={import.meta.env.VITE_FLOATING_UI_PORTAL_ID}>
                  <div
                     className='dark:bg-[#ffffff] bg-[#121822] rounded-2xl! opacity-100! text-sm font-medium whitespace-nowrap dark:text-[#000000] text-[#ffffff] shadow-(--dropdown-menu-shadow) py-2 px-4'
                     ref={refs.setFloating}
                     style={floatingStyles}
                     {...getFloatingProps()}
                  >
                     {name}
                  </div>
               </FloatingPortal>
            )}
         </li>
      );
   },
);
export default Link;
