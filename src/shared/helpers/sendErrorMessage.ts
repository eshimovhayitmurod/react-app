import {
   AppErrorPayload,
   ErrorPayload,
} from '@shared/types/system/app-error.types';
export const sendErrorMessage = ({
   APIData = '',
   APIMethod = '',
   APIResponse = '',
   APIStatus = '',
   APIUrl = '',
   ErrorMessage = '',
   ErrorPriority = '',
   ErrorType = '',
}: ErrorPayload): void => {
   const AppVersion = import.meta.env.VITE_APP_VERSION || '';
   const AppLanguage = localStorage.getItem('i18nextLng') || 'uz';
   const AppReleaseDate = localStorage.getItem('lastReleaseDate');
   const UserDateTime = new Date().toISOString();
   const ErrorUrl = window.location.href;
   const UserAgent = window.navigator.userAgent;
   const UserDeviceViewport = `${window.innerWidth}x${window.innerHeight}`;
   const UserBrowserLanguage = window.navigator.language;
   const UserPlatform = window.navigator.platform;
   const UserTimezoneOffset = new Date().getTimezoneOffset();
   const UserTimezoneRegion = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const UserDevice: 'Mobile' | 'Desktop' = /Mobile|Android|iPhone/.test(
      UserAgent,
   )
      ? 'Mobile'
      : 'Desktop';
   const userAgent = UserAgent.toLowerCase();
   const platform = UserPlatform.toLowerCase();
   const UserOS: 'Android' | 'iOS' | 'Windows' | 'macOS' | 'Linux' | 'Other' =
      userAgent.includes('android')
         ? 'Android'
         : userAgent.includes('iphone') ||
             userAgent.includes('ipad') ||
             userAgent.includes('ipod')
           ? 'iOS'
           : platform.includes('win')
             ? 'Windows'
             : platform.includes('mac')
               ? 'macOS'
               : platform.includes('linux')
                 ? 'Linux'
                 : 'Other';
   const ErrorInfo: AppErrorPayload = {
      // API Error Info
      APIData,
      APIMethod,
      APIResponse,
      APIStatus,
      APIUrl,

      // App Info
      AppLanguage,
      AppReleaseDate,
      AppVersion,

      // Error Info
      ErrorMessage,
      ErrorPriority,
      ErrorType,
      ErrorUrl,
      // ErrorDateTime, // ErrorDateTime ga backend vaqti kiritiladi

      // User Info
      UserAgent,
      UserBrowserLanguage,
      UserDateTime,
      UserDevice,
      UserDeviceViewport,
      UserOS,
      UserPlatform,
      UserTimezoneOffset,
      UserTimezoneRegion,
      // UserIpAddress, // UserIpAddress backend tomonidan olinadi
   };
   console.log(ErrorInfo);
};
export default sendErrorMessage;
