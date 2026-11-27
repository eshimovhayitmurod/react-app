import { ZodResponseType } from '@shared/validations/types';
import zodErrorFinder from '@shared/validations/zodErrorFinder';
export const parseRegisterErrors = ({
   zodResponse,
}: {
   zodResponse: ZodResponseType;
}) => {
   const password_confirm = zodErrorFinder({
      keys: ['password_confirm'],
      zodResponse,
   });
   const password = zodErrorFinder({ keys: ['password'], zodResponse });
   const role = zodErrorFinder({ keys: ['role'], zodResponse });
   const username = zodErrorFinder({ keys: ['username'], zodResponse });
   return {
      password,
      password_confirm,
      role,
      username,
   };
};
