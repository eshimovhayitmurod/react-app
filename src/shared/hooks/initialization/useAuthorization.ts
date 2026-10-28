import ProfileService from '@modules/Profile/services';
import { authorization, AuthorizationPayload } from '@shared/store/user';
import { BaseServiceOptions } from '@shared/types/api/base-service-options.types';
import { UserDataType } from '@shared/types/store/user.types';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
export type AuthStatus =
   | 'LOADING'
   | 'SUCCESS'
   | 'WELCOME'
   | 'ERROR'
   | 'SERVER_ERROR';
interface ProfileResponse {
   status?: number;
   data?: UserDataType;
}
const useAuthorization = (): { getUser: () => void } => {
   const dispatch = useDispatch();
   const getUser = useCallback(() => {
      const token = localStorage.getItem('token') || '';
      const loading = (): void => {
         dispatch(authorization({ STATUS: 'LOADING', user: null }));
      };
      const login = (payload: AuthorizationPayload): void => {
         dispatch(authorization(payload));
      };
      const logout = (): void => {
         dispatch(authorization({ STATUS: 'ERROR', user: null }));
      };
      const serverError = (): void => {
         const data: AuthorizationPayload = {
            STATUS: 'SERVER_ERROR',
            user: null,
         };
         dispatch(authorization(data));
      };
      const ApiError = (error: AxiosError): void => {
         const status =
            (error.toJSON?.() as { status?: number })?.status ||
            error.response?.status;
         const isServerError = status === 500;
         if (isServerError) {
            serverError();
         } else {
            logout();
         }
      };
      if (token) {
         const options: BaseServiceOptions = {
            onStart: loading,
            onError: (error: AxiosError) => ApiError(error),
            onSuccess: (response: ProfileResponse) => {
               const user: UserDataType = response?.data;
               const status = response?.status;
               if (status === 200 && user) {
                  login({ user, STATUS: 'SUCCESS' });
               } else {
                  logout();
               }
            },
         };
         ProfileService.getProfile(options);
      } else {
         logout();
      }
   }, [dispatch]);
   return { getUser };
};
export default useAuthorization;
