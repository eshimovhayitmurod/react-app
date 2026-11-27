import { RootStateType } from '@shared/store';
import { LayoutDashboardIcon, ShieldCheck, UserCircle } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { SidebarRoute } from './Sidebar/types';
const useSidebar = () => {
   const translation = useTranslation();
   const language = translation?.i18n?.language;
   const collapsed = useSelector(
      (state: RootStateType) => state.ui?.sidebarCollapsed,
   );
   const userRole = useSelector(
      (state: RootStateType) => state?.user?.user?.role,
   );
   const sidebars = useMemo(() => {
      const baseSidebars: SidebarRoute[] = [
         {
            Icon: LayoutDashboardIcon,
            children: [],
            collapsed,
            label: 'Asosiy tahlil',
            label_en: 'Main analytics',
            label_ru: 'Основная аналитика',
            label_uz: 'Asosiy tahlil',
            'label_uz-cyrillic': 'Асосий таҳлил',
            path: '/account/dashboard',
            permission: true,
         },
         {
            Icon: ShieldCheck,
            children: [],
            collapsed,
            label: 'Arizalar',
            label_en: 'Applications',
            label_ru: 'Заявки',
            label_uz: 'Arizalar',
            'label_uz-cyrillic': 'Аризалар',
            path: '/account/applications',
            permission: true,
         },
         {
            Icon: UserCircle,
            children: [],
            collapsed,
            label: 'Profil',
            label_en: 'Profile',
            label_ru: 'Профиль',
            label_uz: 'Profil',
            'label_uz-cyrillic': 'Профил',
            path: '/account/profile',
            permission: true,
         },
      ];
      return baseSidebars.map(sidebar => ({
         ...sidebar,
         label: sidebar[`label_${language}`] || sidebar.label_uz,
      }));
   }, [userRole, collapsed, language]);
   return sidebars;
};
export default useSidebar;
