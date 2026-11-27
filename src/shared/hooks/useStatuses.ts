import type { SupportedLanguageType } from '@shared/constants/languages';
import {
   statuses,
   type ApplicationStatusFilterType,
   type ApplicationStatusOption,
   type ApplicationStatusType,
} from '@shared/constants/statuses';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
type LocalizedApplicationStatusOption = Omit<
   ApplicationStatusOption,
   'label'
> & {
   badge?: string;
   dot?: string;
   label: string;
};
const useStatuses = ({
   filter,
   status,
}: {
   filter: ApplicationStatusFilterType;
   status?: ApplicationStatusType | undefined | null;
}): {
   statusName: string;
   statusOption: LocalizedApplicationStatusOption | undefined;
   statuses: LocalizedApplicationStatusOption[];
} => {
   const translation = useTranslation();
   const language = translation?.i18n?.language as SupportedLanguageType;
   const allStatuses = useMemo<LocalizedApplicationStatusOption[]>(() => {
      const allStatuses = statuses.map(type => {
         const labelKey = `label_${language}` as keyof ApplicationStatusOption;
         const label =
            (type[labelKey] as string) || (type?.label_uz as string) || '';
         return {
            ...type,
            label,
         };
      });
      return allStatuses;
   }, [language]);
   const statusOption = useMemo(
      () => allStatuses.find(option => option.value === status),
      [allStatuses, status],
   );
   const statusName = useMemo(() => statusOption?.label || '-', [statusOption]);
   const memoizedStatuses = useMemo<LocalizedApplicationStatusOption[]>(() => {
      const memoizedStatuses =
         typeof filter === 'undefined'
            ? allStatuses
            : allStatuses.filter(status => {
                 const newFilter = Array.isArray(status.filter)
                    ? status.filter
                    : [];
                 const hasFilter = newFilter.some(status => status === filter);
                 return hasFilter;
              });
      return memoizedStatuses;
   }, [allStatuses, filter]);
   return { statuses: memoizedStatuses, statusOption, statusName };
};
export default useStatuses;
