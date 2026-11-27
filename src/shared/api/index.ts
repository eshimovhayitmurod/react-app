import {
   SUPPORTED_LANGUAGES,
   SupportedLanguageType,
} from '@shared/constants/languages';
import notification from '@shared/helpers/notification';
import removeAuthDataFromStorage from '@shared/helpers/removeAuthDataFromStorage';
import store from '@shared/store';
import { authorization } from '@shared/store/user';
import type { AxiosError } from 'axios';
import axios, {
   AxiosInstance,
   AxiosRequestConfig,
   AxiosResponse,
   Method,
   ResponseType,
} from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
export interface ApiEventsType<T = unknown> {
   onEnd?: VoidFunction;
   onError?: (error: AxiosError) => void;
   onStart?: VoidFunction;
   onSuccess?: (response: T) => void;
}
export interface BaseServiceOptions<T = any> extends ApiEventsType<T> {
   data?: unknown;
}
export type BaseApiOptions = {
   data?: unknown;
   headers?: Record<string, string>;
   method?: Method | string;
   params?: Record<string, unknown>;
   responseType?: ResponseType;
   showError?: boolean;
   signal?: AbortSignal;
   url: string;
   withCredentials?: boolean;
};
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
      const baseURL = import.meta.env.PROD
         ? import.meta.env.VITE_BASE_API_URL
         : '/api/v1';
      this.instance = axios.create({ baseURL });
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
         'uz-cyrillic': 'Сервер хатолиги',
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
         'uz-cyrillic': 'Токен муддати тугаган',
         en: 'The token has expired',
         ru: 'Срок действия токена истёк',
         uz: 'Token muddati tugagan',
      };
      const authErrorMessage = authErrorMessages[language];
      notification(authErrorMessage, { type: 'error' });
      removeAuthDataFromStorage();
      store.dispatch(authorization({ STATUS: 'ERROR', user: null }));
   }
   #setupInterceptors(): void {
      this.instance.interceptors.response.use(
         response => response,
         error => {
            const showError = error?.config?.showError ?? true;
            const Status = error?.response?.status;
            const Url = error?.config?.url || '';
            if (Status === 500 && showError) {
               this.#showServerError();
            }
            if (
               Status === 401 &&
               !['/auth/me/', '/auth/logout/'].includes(Url)
            ) {
               this.#unAuthorization();
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
         'Content-Language': language,
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
      withCredentials = true,
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
         withCredentials,
         xsrfCookieName: 'csrftoken',
         xsrfHeaderName: 'X-CSRFToken',
      };
      return this.instance<T>(options);
   }
   async request<T = unknown>(
      apiOptions: BaseApiOptions,
      {
         onEnd = () => {},
         onError = (_error: AxiosError) => {},
         onStart = () => {},
         onSuccess = (_response: AxiosResponse<T>) => {},
      }: ApiEventsType<AxiosResponse<T>> = {},
   ): Promise<void> {
      onStart();
      try {
         const response = await this.baseAPI<T>(apiOptions);
         onSuccess(response);
      } catch (e) {
         onError(e as AxiosError);
      } finally {
         onEnd();
      }
   }
}
const api = new API();
export const baseAPI = api.baseAPI;
export default API;
