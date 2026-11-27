import { languagesList } from '@shared/constants/languages';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
export const namespaces = [
   'common',
   'layout',
   'validation',
   'auth',
   'dashboard',
   'applications',
   'profile',
   'notFound',
];
i18n
   .use(HttpBackend)
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
      debug: false,
      defaultNS: 'common',
      detection: { caches: ['cookie'], order: ['queryString', 'cookie'] },
      fallbackLng: 'uz',
      interpolation: { escapeValue: false },
      lng: 'uz',
      load: 'currentOnly',
      ns: namespaces,
      react: { useSuspense: false },
      supportedLngs: languagesList,
   });
export default i18n;
