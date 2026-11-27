import { ZodResponseType } from '@shared/validations/types';
import zodErrorFinder from '@shared/validations/zodErrorFinder';
export const parseLoginErrors = ({
   zodResponse,
}: {
   zodResponse: ZodResponseType;
}) => {
   const password = zodErrorFinder({ keys: ['password'], zodResponse });
   const username = zodErrorFinder({ keys: ['username'], zodResponse });
   return { password, username };
};
