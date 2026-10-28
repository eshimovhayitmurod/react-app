import { AxiosError } from 'axios';
export type BaseServiceOptions<T = any> = {
   onEnd?: VoidFunction;
   onError?: (error: AxiosError) => void;
   onStart?: VoidFunction;
   onSuccess?: (response: T) => void;
};
