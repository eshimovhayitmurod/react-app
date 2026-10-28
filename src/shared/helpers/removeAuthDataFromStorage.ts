const SYSTEM_STORAGE_KEYS = ['lastReleaseDate', 'i18nextLng', 'theme'] as const;
export type SystemStorageKey = (typeof SYSTEM_STORAGE_KEYS)[number];
export const removeAuthDataFromStorage = (): void => {
   const keys = Object.keys(localStorage);
   keys.forEach(key => {
      if (!SYSTEM_STORAGE_KEYS.includes(key as SystemStorageKey)) {
         localStorage.removeItem(key);
      }
   });
};
export default removeAuthDataFromStorage;
