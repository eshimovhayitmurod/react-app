export type ErrorPriorityType = 'Critical' | 'High' | 'Medium' | 'Low' | string;
export type APIStatusType = number | string;
export type ErrorPayload = {
   APIData: unknown;
   APIMethod: string;
   APIResponse: unknown;
   APIStatus: APIStatusType;
   APIUrl: string;
   ErrorMessage: string;
   ErrorPriority: ErrorPriorityType;
   ErrorType: string;
};
export interface AppErrorPayload extends ErrorPayload {
   AppLanguage: string;
   AppReleaseDate: string | null;
   AppVersion: string;
   ErrorUrl: string;
   UserAgent: string;
   UserBrowserLanguage: string;
   UserDateTime: string;
   UserDevice: 'Mobile' | 'Desktop';
   UserDeviceViewport: string;
   UserOS: 'Android' | 'iOS' | 'Windows' | 'macOS' | 'Linux' | 'Other';
   UserPlatform: string;
   UserTimezoneOffset: number;
   UserTimezoneRegion: string;
}
