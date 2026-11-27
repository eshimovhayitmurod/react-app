import type { BaseApiOptions, BaseServiceOptions } from '@shared/api';
import API from '@shared/api';
class Service extends API {
   async register({
      data,
      onEnd = () => {},
      onError = () => {},
      onStart = () => {},
      onSuccess = () => {},
   }: BaseServiceOptions = {}): Promise<void> {
      onStart();
      try {
         const options: BaseApiOptions = {
            data,
            method: 'POST',
            url: '/auth/register/',
         };
         const response = await this.baseAPI(options);
         onSuccess(response);
      } catch (e: any) {
         onError(e);
      } finally {
         onEnd();
      }
   }
   async login({
      data,
      onEnd = () => {},
      onError = () => {},
      onStart = () => {},
      onSuccess = () => {},
   }: BaseServiceOptions = {}): Promise<void> {
      onStart();
      try {
         const options: BaseApiOptions = {
            data,
            method: 'POST',
            url: '/auth/login/',
         };
         const response = await this.baseAPI(options);
         onSuccess(response);
      } catch (e: any) {
         onError(e);
      } finally {
         onEnd();
      }
   }
   async logout({
      onEnd = () => {},
      onError = () => {},
      onStart = () => {},
      onSuccess = () => {},
   }: BaseServiceOptions = {}): Promise<void> {
      onStart();
      try {
         const options: BaseApiOptions = {
            method: 'POST',
            url: '/auth/logout/',
         };
         const response = await this.baseAPI(options);
         onSuccess(response);
      } catch (e: any) {
         onError(e);
      } finally {
         onEnd();
      }
   }
}
const AuthService = new Service();
export default AuthService;
