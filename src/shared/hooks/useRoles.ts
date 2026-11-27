import { SupportedLanguageType } from '@shared/constants/languages';
import { RoleFilterType, roles, UserRoleOption } from '@shared/constants/roles';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
type LocalizedUserRoleOption = Omit<UserRoleOption, 'label'> & {
   label: string;
};
const useRoles = ({
   filter,
   role,
}: {
   filter?: RoleFilterType;
   role?: unknown;
}): {
   roleName: string;
   roleOption: LocalizedUserRoleOption | undefined;
   roles: LocalizedUserRoleOption[];
} => {
   const translation = useTranslation();
   const language = translation?.i18n?.language as SupportedLanguageType;
   const allRoles = useMemo<LocalizedUserRoleOption[]>(() => {
      const allRoles = roles.map(type => {
         const labelKey = `label_${language}` as keyof UserRoleOption;
         const label =
            (type[labelKey] as string) || (type?.label_uz as string) || '';
         return {
            ...type,
            label,
         };
      });
      return allRoles;
   }, [language]);
   const roleOption = useMemo(() => {
      const roleOption = allRoles.find(item => item?.value === role);
      return roleOption;
   }, [allRoles, role]);
   const roleName = useMemo(() => roleOption?.label || '-', [roleOption]);
   const memoizedRoles = useMemo<LocalizedUserRoleOption[]>(() => {
      const filteredRoles =
         typeof filter === 'undefined'
            ? allRoles
            : allRoles.filter(role => {
                 const newAccess = Array.isArray(role.filter)
                    ? role.filter
                    : [];
                 const hasAccess = newAccess.some(
                    roleAccess => roleAccess === filter,
                 );
                 return hasAccess;
              });
      return filteredRoles;
   }, [filter, allRoles]);
   return { roles: memoizedRoles, roleOption, roleName };
};
export default useRoles;
