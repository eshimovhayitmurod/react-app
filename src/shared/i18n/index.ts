import { SUPPORTED_LANGUAGES } from '@shared/constants/system/languages';
import getUrlSearchParams from '@shared/helpers/getUrlSearchParams';
import { SupportedLanguageType } from '@shared/types/system/language.types';
import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
const { language } = getUrlSearchParams(window.location.search, ['language']);
const localLanguage = localStorage.getItem('i18nextLng');
const isValidUrlLanguage =
   typeof language === 'string' &&
   SUPPORTED_LANGUAGES.includes(language as SupportedLanguageType);
const isValidLocalLanguage =
   typeof localLanguage === 'string' &&
   SUPPORTED_LANGUAGES.includes(localLanguage as SupportedLanguageType);
const fallbackLng: SupportedLanguageType = isValidUrlLanguage
   ? (language as SupportedLanguageType)
   : isValidLocalLanguage
     ? (localLanguage as SupportedLanguageType)
     : 'ru';
const options: InitOptions = {
   debug: false,
   fallbackLng,
   resources: {},
   detection: {
      caches: ['cookie'],
      order: ['queryString', 'cookie'],
   },
};
i18n.use(LanguageDetector).use(initReactI18next).init(options);
// declare module 'react-i18next' {
//    interface CustomTypeOptions {
//       defaultNS: 'translation';
//       resources: typeof resources.ru;
//    }
// }
export default i18n;
