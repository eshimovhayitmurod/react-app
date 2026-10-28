import { SupportedLanguageType } from '@shared/types/system/language.types';
export type AppInfo = {
   defaultLanguage: 'uz';
   languages: SupportedLanguageType;
   name: string;
   node: string;
   react: string;
   releaseDate?: string | number;
   version: string;
   vite: string;
};
