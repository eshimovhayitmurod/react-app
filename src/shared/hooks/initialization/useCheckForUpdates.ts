import { AppInfo } from '@shared/types/system/app-info.types';
import { useEffect } from 'react';
const useCheckForUpdates = (): void => {
   useEffect(() => {
      const isProduction = import.meta.env?.PROD;
      if (isProduction) {
         const checkVersion = async (): Promise<void> => {
            try {
               const lastReleaseDate = localStorage.getItem('lastReleaseDate');
               const url = `/app-info.json?cache=${Date.now()}`;
               const response = await fetch(url);
               const appInfo: AppInfo = await response.json();
               if (appInfo?.releaseDate) {
                  const releaseDate = String(appInfo.releaseDate);
                  localStorage.setItem('lastReleaseDate', releaseDate);
                  if (lastReleaseDate && lastReleaseDate !== releaseDate) {
                     window.location.reload();
                  }
               }
            } catch (error) {
               console.error('Version check failed:', error);
            }
         };
         checkVersion();
      }
   }, []);
};
export default useCheckForUpdates;
