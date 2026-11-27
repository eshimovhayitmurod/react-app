import { rolesList } from '@shared/constants/roles';
import { StringRequiredSchema, zod } from '@shared/validations';
const roleValues = [...rolesList] as const;
export const registerValidationSchema = zod
   .object({
      role: zod.enum(roleValues, { message: 'required_error' }),
      password: StringRequiredSchema.min(8, { message: 'invalid_password' }),
      password_confirm: StringRequiredSchema,
      username: StringRequiredSchema.trim().min(2, {
         message: 'invalid_username',
      }),
   })
   .superRefine((data, ctx) => {
      if (data.password !== data.password_confirm) {
         ctx.addIssue({
            code: 'custom',
            message: 'invalid_password_confirm',
            path: ['password_confirm'],
         });
      }
   })
   .transform(data => {
      const { username, password, role, password_confirm } = data || {};
      return {
         password,
         password_confirm,
         role,
         username,
      };
   });
