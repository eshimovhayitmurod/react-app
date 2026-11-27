import { SupportedLanguageType } from '@shared/constants/languages';
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
