import { Accordion } from '@shared/components';
import clsx from 'clsx';
import {
   createContext,
   memo,
   useCallback,
   useEffect,
   useMemo,
   type HTMLAttributes,
} from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router';
import {
   getLocalizedLabel,
   type MenuContextValue,
   type NavMenuProps,
} from '../types';
import Menu from './Menu';
import MenuItem from './MenuItem';
interface SubMenuLinkProps extends NavMenuProps {
   isActive?: boolean;
}
const Link = memo(
   ({
      Icon,
      index = 0,
      isActive = false,
      path = '',
      setActiveIndex,
      ...rest
   }: SubMenuLinkProps) => {
      const { pathname } = useLocation();
      const translation = useTranslation('layout');
      const language = translation?.i18n?.language;
      const name = useMemo(
         () => getLocalizedLabel(rest, language),
         [rest, language],
      );
      const dataCY = useMemo(() => `link-sidebar-${path}`, [path]);
      useEffect(() => {
         const isActive =
            path === pathname || pathname.startsWith((path || '') + '/');
         if (isActive) {
            setActiveIndex(index);
         }
      }, [pathname, index, setActiveIndex, path]);
      return (
         <li className='flex w-full h-12 m-0 p-0'>
            <NavLink
               data-cy={dataCY}
               tabIndex={isActive ? 0 : -1}
               to={path}
               className={clsx(
                  'h-full w-full outline-none focus:outline-none! relative',
                  'before:bg-transparent before:rounded-xl before:content-[""] before:h-full before:absolute before:right-0 before:top-0 before:w-[calc(100%-18px)] focus:before:border-2 focus:before:border-[#3a79f3]',
                  'text-[#878787] dark:text-[#e1e1e1] hover:text-[#ffffff] dark:hover:text-[#ffffff] [&.active]:text-[#ffffff]',
                  'hover:before:bg-[#3a79f3] [&.active]:before:bg-[#3a79f3] [&.active]:hover:before:bg-[#3a79f3]',
               )}
            >
               <div className='items-center flex h-full w-full left-0 py-3 pr-3 pl-7 absolute top-0'>
                  <div className='h-6 w-6 mr-2 ml-1'>{Icon && <Icon />}</div>
                  <div className='line-clamp-2 text-left w-[calc(100%-36px)] max-w-[calc(100%-36px)] min-w-[calc(100%-36px)] text-[14px] font-regular leading-[130%]'>
                     {name}
                  </div>
               </div>
            </NavLink>
         </li>
      );
   },
);
const MenuContext = createContext<MenuContextValue>({
   activeIndex: null,
   getItemProps: (props?: HTMLAttributes<HTMLElement>) => props ?? {},
   isOpen: false,
   setActiveIndex: () => {},
   setHasFocusInside: () => {},
});
const SubMenu = memo(
   ({
      activeIndex = 0,
      children = [],
      collapsed = false,
      Icon,
      index = 0,
      path = '',
      setActiveIndex,
      ...rest
   }: NavMenuProps) => {
      const navigate = useNavigate();
      const { pathname } = useLocation();
      const { i18n } = useTranslation('layout');
      const language = i18n?.language;
      const name = useMemo(
         () => getLocalizedLabel(rest, language),
         [rest, language],
      );
      const isActive = useMemo(
         () => activeIndex === index,
         [activeIndex, index],
      );
      const newChildren = useMemo(() => {
         const items = Array.isArray(children) ? children : [];
         return items.filter(route => route?.permission);
      }, [children]);
      const isChildActive = useMemo(() => {
         const isChildActive = newChildren.some(child => {
            const isActive =
               child?.path &&
               (pathname === child?.path ||
                  pathname.startsWith(child?.path + '/'));
            return isActive;
         });
         return isChildActive;
      }, [newChildren, pathname]);
      const openModule = useCallback(() => {
         setActiveIndex(isActive ? -1 : index);
         const firstChildPath = newChildren?.[0]?.path;
         if (!isActive && firstChildPath) {
            navigate(firstChildPath);
         }
      }, [isActive, index, newChildren, setActiveIndex, navigate]);
      if (collapsed) {
         return (
            <Menu
               MenuContext={MenuContext}
               collapsed={collapsed}
               Icon={Icon}
               menuList={newChildren}
            >
               {newChildren.map((route, i) => (
                  <MenuItem {...route} MenuContext={MenuContext} key={i} />
               ))}
            </Menu>
         );
      }
      return (
         <li className='m-0 p-0'>
            <div className={clsx('trigger-item', 'flex h-12 m-0 w-full')}>
               <button
                  data-cy={`button-sidebar-${path}`}
                  data-open={isActive}
                  onClick={openModule}
                  className={clsx(
                     'focusable outline-offset-0! items-center cursor-pointer flex h-full px-3 text-left w-full',
                     collapsed ? 'rounded-3xl justify-center' : 'rounded-xl',

                     'bg-transparent dark:bg-transparent hover:bg-[#fcfaf8] dark:hover:bg-transparent',

                     'hover:text-[#3a79f3] dark:hover:text-[#3a79f3]',
                     isChildActive
                        ? 'text-[#3a79f3] dark:text-[#3a79f3]'
                        : 'text-[#878787] dark:text-[#e1e1e1]',
                  )}
               >
                  <div className={clsx('icon', collapsed ? 'm-0' : 'mr-3')}>
                     {Icon && <Icon />}
                  </div>
                  <div
                     className={clsx(
                        'sidebar-trigger-label text-[16px] font-normal w-[calc(100%-51px)] min-w-[calc(100%-51px)] whitespace-nowrap overflow-hidden leading-6',
                        collapsed ? 'hidden' : '',
                     )}
                  >
                     {name}
                  </div>
                  <div
                     className={clsx(
                        'h-full inline-flex justify-center items-center transition-transform duration-400',
                        isActive ? 'rotate-180' : 'rotate-0',
                        { 'text-[#3a79f3]': isChildActive },
                     )}
                  >
                     <svg height='19' width='19' viewBox='0 0 20 20'>
                        <path
                           fill='currentColor'
                           d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'
                        />
                     </svg>
                  </div>
               </button>
            </div>
            <div className='w-full'>
               <Accordion open={isActive}>
                  <ul className='m-0 max-w-65.75 p-0 relative'>
                     {newChildren.map((route, key) => (
                        <Link
                           {...route}
                           activeIndex={activeIndex}
                           index={index}
                           isActive={isActive}
                           key={key}
                           setActiveIndex={setActiveIndex}
                        />
                     ))}
                  </ul>
               </Accordion>
            </div>
         </li>
      );
   },
);
export default SubMenu;
