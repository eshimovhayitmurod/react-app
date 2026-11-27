import type { RegisterFormErrorsType } from '../types';
import { RegisterFormType } from '../types';
export const defaultForm: RegisterFormType = {
   password: '',
   password_confirm: '',
   role: '',
   username: '',
};
export const defaultErrors: RegisterFormErrorsType = {
   password: '',
   password_confirm: '',
   role: '',
   username: '',
};
