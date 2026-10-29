import API from '@shared/api';
import { BaseApiOptions } from '@shared/types/api/base-api-options';
import { BaseServiceOptions } from '@shared/types/api/base-service-options.types';
class Profile extends API {
   async getProfile({
      onEnd = () => {},
      onError = () => {},
      onStart = () => {},
      onSuccess = () => {},
   }: BaseServiceOptions = {}): Promise<void> {
      onStart();
      try {
         const options: BaseApiOptions = { url: '/profile' };
         const response = await this.baseAPI(options);
         onSuccess(response);
      } catch (e: any) {
         onError(e);
      } finally {
         onEnd();
      }
   }
}
const ProfileService = new Profile();
export default ProfileService;
