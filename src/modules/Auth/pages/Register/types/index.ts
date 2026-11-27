import { rolesList } from '@shared/constants/roles';
const roleValues = [...rolesList] as const;
export type RegisterFormType = {
   password: string;
   password_confirm: string;
   role: (typeof roleValues)[number] | '';
   username: string;
};
export type RegisterFormErrorsType = {
   password: string | '';
   password_confirm: string | '';
   role: string | '';
   username: string | '';
};
