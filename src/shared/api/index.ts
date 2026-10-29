import { SUPPORTED_LANGUAGES } from '@shared/constants/system/languages';
import notification from '@shared/helpers/notification';
import removeAuthDataFromStorage from '@shared/helpers/removeAuthDataFromStorage';
import sendErrorMessage from '@shared/helpers/sendErrorMessage';
import store from '@shared/store';
import { authorization } from '@shared/store/user';
import { BaseApiOptions } from '@shared/types/api/base-api-options';
import {
   APIStatusType,
   ErrorPayload,
   ErrorPriorityType,
} from '@shared/types/system/app-error.types';
import { SupportedLanguageType } from '@shared/types/system/language.types';
import axios, {
   AxiosInstance,
   AxiosRequestConfig,
   AxiosResponse,
   ResponseType,
} from 'axios';
declare module 'axios' {
   export interface AxiosRequestConfig {
      showError?: boolean;
   }
}
export interface ErrorLoggingPayload {
   Data?: unknown;
   Method: string;
   Response?: unknown;
   Status?: number;
   Url: string;
}
class API {
   private instance: AxiosInstance;
   constructor() {
      this.baseAPI = this.baseAPI.bind(this);
      this.instance = axios.create({ baseURL: import.meta.env.VITE_API_URL });
      this.#setupInterceptors();
   }
   #getLanguage(): SupportedLanguageType {
      const i18Lang = localStorage.getItem('i18nextLng');
      const language: SupportedLanguageType = SUPPORTED_LANGUAGES.includes(
         i18Lang as SupportedLanguageType,
      )
         ? (i18Lang as SupportedLanguageType)
         : 'uz';
      return language;
   }
   #showServerError(): void {
      const language = this.#getLanguage();
      const serverErrorMessages: Record<SupportedLanguageType, string> = {
         en: 'Server error',
         ru: 'Ошибка на сервере',
         uz: 'Server xatoligi',
      };
      const serverErrorMessage = serverErrorMessages[language];
      notification(serverErrorMessage, { type: 'error' });
   }
   #unAuthorization(): void {
      const language = this.#getLanguage();
      const authErrorMessages: Record<SupportedLanguageType, string> = {
         en: 'The token has expired',
         ru: 'Срок действия токена истёк',
         uz: 'Token muddati tugagan',
      };
      const authErrorMessage = authErrorMessages[language];
      notification(authErrorMessage, { type: 'error' });
      removeAuthDataFromStorage();
      store.dispatch(authorization({ STATUS: 'ERROR', user: null }));
   }
   #errorLogging({
      Data = {},
      Method,
      Response = {},
      Status,
      Url = '',
   }: {
      Data: any;
      Method: string;
      Response: any;
      Status: APIStatusType;
      Url: string;
   }): void {
      let ErrorPriority: ErrorPriorityType = 'Medium';
      if (Status === 401) {
         ErrorPriority = 'Critical';
      } else if (
         (Status &&
            typeof Status === 'number' &&
            [408, 409].includes(Status)) ||
         (Status &&
            typeof Status === 'number' &&
            Status >= 500 &&
            Status <= 599)
      ) {
         ErrorPriority = 'High';
      }
      const errorData: ErrorPayload = {
         APIMethod: Method,
         APIStatus: Status,
         APIUrl: Url,
         ErrorMessage: 'API ERROR',
         ErrorPriority,
         ErrorType: 'APIError',
         APIData:
            typeof Data === 'object' ? JSON.stringify(Data) : String(Data),
         APIResponse:
            typeof Response === 'object'
               ? JSON.stringify(Response)
               : String(Response),
      };
      sendErrorMessage(errorData);
   }
   #setupInterceptors(): void {
      this.instance.interceptors.response.use(
         response => response,
         error => {
            const Data = error?.config?.data;
            const Response = error?.response?.data;
            const Method = (
               String(error?.config?.method) || 'UNKNOWN'
            ).toUpperCase();
            const showError = error?.config?.showError ?? true;
            const Status = error?.response?.status;
            const Url = error?.config?.url || '';
            if (Status === 500 && showError) {
               this.#showServerError();
            }
            if (Status === 401 && Url !== '/users/profile') {
               this.#unAuthorization();
            }
            const isError = Status >= 400 && Status <= 599;
            if (isError) {
               this.#errorLogging({
                  Data,
                  Method,
                  Response,
                  Status,
                  Url,
               });
            }
            return Promise.reject(error);
         },
      );
   }
   #getHeaders({
      headers = {},
   }: {
      headers?: Record<string, string>;
   }): Record<string, string> {
      const language = this.#getLanguage();
      return {
         'Accept-Language': language,
         ...headers,
      };
   }
   #parseParams(params: Record<string, unknown> = {}): Record<string, string> {
      const isObject = (value: unknown): value is Record<string, unknown> => {
         return (
            typeof value === 'object' && value !== null && !Array.isArray(value)
         );
      };
      const parsedParams = isObject(params) ? params : {};
      return Object.keys(parsedParams).reduce<Record<string, string>>(
         (total, key) => {
            const value = parsedParams[key];
            if (typeof value === 'string' && value) {
               total[key] = value;
            } else if (typeof value === 'number' && !Number.isNaN(value)) {
               total[key] = String(value);
            } else if (typeof value === 'boolean') {
               total[key] = String(value);
            } else if (Array.isArray(value)) {
               const arrayValue = value
                  .filter(item => {
                     return (
                        (typeof item === 'string' && item) ||
                        (typeof item === 'number' && !Number.isNaN(item)) ||
                        typeof item === 'boolean'
                     );
                  })
                  .map(String);
               if (arrayValue.length) {
                  total[key] = arrayValue.join(',');
               }
            } else if (isObject(value)) {
               total[key] = JSON.stringify(value);
            }
            return total;
         },
         {},
      );
   }
   #parseResponseType(responseType?: ResponseType): ResponseType | undefined {
      const responseTypes: ResponseType[] = [
         'arraybuffer',
         'blob',
         'document',
         'json',
         'stream',
         'text',
      ];
      return responseType && responseTypes.includes(responseType)
         ? responseType
         : undefined;
   }
   async baseAPI<T = unknown>({
      data,
      headers = {},
      method = 'GET',
      params = {},
      responseType,
      showError = true,
      signal,
      url = '',
   }: BaseApiOptions): Promise<AxiosResponse<T>> {
      const newHeaders = this.#getHeaders({ headers });
      const newParams = this.#parseParams(params);
      const newResponseType = this.#parseResponseType(responseType);
      const options: AxiosRequestConfig = {
         data,
         headers: newHeaders,
         method,
         params: newParams,
         responseType: newResponseType,
         showError,
         signal,
         url,
      };
      return this.instance<T>(options);
   }
}
const api = new API();
export const baseAPI = api.baseAPI;
export default API;
