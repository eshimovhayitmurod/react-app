import type { BaseApiOptions, BaseServiceOptions } from '@shared/api';
import API from '@shared/api';
class Service extends API {
   async getProfile({
      onEnd = () => {},
      onError = () => {},
      onStart = () => {},
      onSuccess = () => {},
   }: BaseServiceOptions = {}): Promise<void> {
      onStart();
      try {
         const options: BaseApiOptions = { url: '/auth/me/' };
         const response = await this.baseAPI(options);
         onSuccess(response);
      } catch (e: any) {
         onError(e);
      } finally {
         onEnd();
      }
   }
}
const ProfileService = new Service();
export default ProfileService;
