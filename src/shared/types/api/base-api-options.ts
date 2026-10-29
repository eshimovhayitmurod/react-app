import { Method, ResponseType } from 'axios';
export type BaseApiOptions = {
   data?: unknown;
   headers?: Record<string, string>;
   method?: Method | string;
   params?: Record<string, unknown>;
   responseType?: ResponseType;
   showError?: boolean;
   signal?: AbortSignal;
   url: string;
};
