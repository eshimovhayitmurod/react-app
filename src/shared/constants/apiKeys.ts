export interface SignApiKeysConfig {
   '127.0.0.1': string | undefined;
   'app.domain.com': string | undefined;
   localhost: string | undefined;
   null: string | undefined;
}
const env = import.meta.env;
const signAPIKeys: SignApiKeysConfig = {
   '127.0.0.1': env.VITE_SIGN_PORT,
   'app.domain.com': env.VITE_SIGN_PRODUCTION,
   localhost: env.VITE_SIGN_LOCALHOST,
   null: env.VITE_SIGN_NULL,
};
export const SIGN_API_KEYS: string[] = Object.entries(signAPIKeys)
   .flat()
   .filter((item): item is string => Boolean(item));
