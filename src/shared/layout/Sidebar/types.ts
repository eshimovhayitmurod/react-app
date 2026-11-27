import { UserRoleType } from '@shared/constants/roles';
import type { LucideIcon } from 'lucide-react';
import type { Context, Ref } from 'react';
export interface SidebarRoute {
   [key: `label_${string}`]: string | undefined;
   access?: UserRoleType[];
   children?: SidebarRoute[];
   Icon?: LucideIcon;
   label?: string;
   label_en?: string;
   label_ru?: string;
   label_uz?: string;
   path?: string;
   permission?: boolean;
   collapsed?: boolean;
}
export interface NavMenuProps extends SidebarRoute {
   collapsed?: boolean;
   activeIndex?: number;
   index?: number;
   setActiveIndex: (index: number) => void;
}
export interface LinkProps extends NavMenuProps {
   ref?: Ref<HTMLAnchorElement>;
}
export interface MenuContextValue {
   activeIndex: number | null;
   getItemProps: (props?: object) => object;
   isOpen: boolean;
   setActiveIndex: (index: number | null) => void;
   setHasFocusInside: (hasFocus: boolean) => void;
}
export interface MenuContextProps {
   MenuContext: Context<MenuContextValue>;
}
export const getLocalizedLabel = (
   route: {
      [key: `label_${string}`]: string | undefined;
      label?: string;
      label_en?: string;
      label_ru?: string;
      label_uz?: string;
   },
   language?: string,
): string | undefined =>
   (language && route[`label_${language}`]) || route.label || route.label_uz;
