import { memo, useMemo } from 'react';
import type { NavMenuProps } from '../types';
import Link from './Link';
import SubMenu from './SubMenu';
const NavMenu = memo((props: NavMenuProps) => {
   const isSubMenu = useMemo(() => {
      const children = props?.children;
      const items = Array.isArray(children) ? children : [];
      const isSubMenu = items.some(route => route?.permission);
      return isSubMenu;
   }, [props]);
   const isMenu = useMemo(() => props?.permission, [props?.permission]);
   // const isMenu = useMemo(() => true, [props?.permission]);
   return isSubMenu ? (
      <SubMenu {...props} />
   ) : isMenu ? (
      <Link {...props} />
   ) : null;
});
export default NavMenu;
