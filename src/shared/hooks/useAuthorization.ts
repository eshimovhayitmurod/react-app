import AuthService from '@modules/Auth/services';
import ProfileService from '@modules/Profile/services';
import { BaseServiceOptions } from '@shared/api';
import { apiErrorParser } from '@shared/api/apiErrorParser';
import notification from '@shared/helpers/notification';
import { authorization, AuthorizationPayload } from '@shared/store/user';
import { UserDataType } from '@shared/types/user.types';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
interface ProfileResponse {
   data?: UserDataType;
   status?: number;
}
const useAuthorization = (): {
   checkAuthorization: () => void;
   logout: () => void;
   logoutLoading: boolean;
} => {
   const dispatch = useDispatch();
   const [logoutLoading, setLogoutLoading] = useState(false);
   const checkAuthorization = useCallback(() => {
      const loading = (): void => {
         dispatch(authorization({ STATUS: 'LOADING', user: null }));
      };
      const login = (payload: AuthorizationPayload): void => {
         console.log(payload);
         // dispatch(authorization(payload));
         dispatch(authorization({ STATUS: 'ERROR', user: null }));
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
      const options: BaseServiceOptions = {
         onStart: loading,
         onError: (error: AxiosError) => ApiError(error),
         onSuccess: (response: ProfileResponse) => {
            const user = response?.data as UserDataType;
            const status = response?.status;
            if (status === 200 && user) {
               login({ user, STATUS: 'SUCCESS' });
            } else {
               logout();
            }
         },
      };
      ProfileService.getProfile(options);
   }, [dispatch]);
   const logout = useCallback(() => {
      const options = {
         onStart: () => setLogoutLoading(true),
         onEnd: () => setLogoutLoading(false),
         onError: (error: unknown) => {
            notification(apiErrorParser(error), { type: 'error' });
         },
         onSuccess: () => {
            dispatch(authorization({ user: null, STATUS: 'ERROR' }));
         },
      };
      AuthService.logout(options);
   }, [dispatch]);
   return { checkAuthorization, logout, logoutLoading };
};
export default useAuthorization;
