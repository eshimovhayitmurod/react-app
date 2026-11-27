import { StringRequiredSchema, zod } from '@shared/validations';
import type { infer as zodInfer } from 'zod';
export const loginValidationSchema = zod
   .object({
      password: StringRequiredSchema.min(8, { message: 'invalid_password' }),
      username: StringRequiredSchema,
   })
   .transform(data => {
      const { username, password } = data || {};
      return { password, username };
   });

export type LoginFormType = zodInfer<typeof loginValidationSchema>;
