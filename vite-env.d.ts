/// <reference types="vite/client" />

interface ImportMetaEnv {
   readonly VITE_SIGN_NULL: string;
   readonly VITE_SIGN_LOCALHOST: string;
   readonly VITE_SIGN_PORT: string;
   readonly VITE_SIGN_PRODUCTION: string;
   readonly VITE_YANDEX_MAP_API_KEY: string;
   readonly VITE_API_URL: string;
}

interface ImportMeta {
   readonly env: ImportMetaEnv;
}
