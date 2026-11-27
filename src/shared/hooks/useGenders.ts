import {
   genders,
   type GenderOption,
   type GenderType,
} from '@shared/constants/genders';
import type { SupportedLanguageType } from '@shared/constants/languages';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
type LocalizedGenderOption = Omit<GenderOption, 'label'> & {
   label: string;
};
const useGenders = ({
   gender,
}: {
   gender?: GenderType;
} = {}): {
   genderName: string;
   genderOption: LocalizedGenderOption | undefined;
   genders: LocalizedGenderOption[];
} => {
   const translation = useTranslation();
   const language = translation?.i18n?.language as SupportedLanguageType;
   const localizedGenders = useMemo<LocalizedGenderOption[]>(
      () =>
         genders.map(item => {
            const labelKey = `label_${language}` as keyof GenderOption;
            const label =
               (item[labelKey] as string) || (item.label_uz as string) || '';
            return {
               ...item,
               label,
            };
         }),
      [language],
   );
   const genderOption = useMemo(
      () => localizedGenders.find(item => item.value === gender),
      [localizedGenders, gender],
   );
   const genderName = useMemo(() => genderOption?.label || '-', [genderOption]);
   return { genders: localizedGenders, genderOption, genderName };
};
export default useGenders;
