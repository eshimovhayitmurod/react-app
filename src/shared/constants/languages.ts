export const languages = [
   {
      label: 'O‘zbekcha',
      value: 'uz',
   },
   {
      label: 'Ўзбекча',
      value: 'uz-cyrillic',
   },
   {
      label: 'Русский',
      value: 'ru',
   },
   {
      label: 'English',
      value: 'en',
   },
] as const;
export type SupportedLanguageType = (typeof languages)[number]['value'];
export const SUPPORTED_LANGUAGES = languages.map(({ value }) => value);
export const languagesList = languages.map(({ value }) => value);
