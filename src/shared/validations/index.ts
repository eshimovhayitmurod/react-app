import Big from 'big.js';
import zodLib from 'zod';
export const zod = zodLib;
export const defaultError = 'required_error';
export const invalidTypeError = 'invalid_type_error';
export const requiredError = { message: 'required_error' };
export const innError = { message: 'invalid_inn' };
export const pinflError = { message: 'invalid_pinfl' };
export const innOrPinflError = { message: 'invalid_inn_or_pinfl' };
export const typeError = { message: 'invalid_type_error' };
export const unionError = { errorMap: () => typeError };

// Schemas
export const AnySchema = zod.any();
export const BooleanSchema = zod.boolean(defaultError);
export const NumberSchema = zod.number(defaultError);

// String schema
export const StringRequiredSchema = zod
   .string(defaultError)
   .min(1, requiredError);
export const StringOptionalSchema = zod
   .string(defaultError)
   .min(1, requiredError)
   .optional()
   .or(zod.literal(''));

// Phone schema
export const PhoneRequiredSchema = zod
   .string(defaultError)
   .min(1, requiredError)
   .regex(/\+998\d{9}/, { message: 'invalid_phone' });
export const PhoneOptionalSchema = zod
   .string(defaultError)
   .regex(/\+998\d{9}/, { message: 'invalid_phone' })
   .optional()
   .or(zod.literal(''));

// Email schema
export const EmailRequiredSchema = zod
   .string(defaultError)
   .min(1, requiredError)
   .email({ message: 'invalid_email' });
export const EmailOptionalSchema = zod
   .string(defaultError)
   .email({ message: 'invalid_email' })
   .optional()
   .or(zod.literal(''));

// Url schema
export const UrlRequiredSchema = zod
   .string(defaultError)
   .min(1, requiredError)
   .url('invalid_url');
export const UrlOptionalSchema = zod
   .string(defaultError)
   .url('invalid_url')
   .optional()
   .or(zod.literal(''));

// Date schema
export const DateRequiredSchema = zod
   .string(defaultError)
   .min(1, requiredError)
   .date('invalid_date');
export const DateOptionalSchema = zod
   .string(defaultError)
   .date('invalid_date')
   .optional()
   .or(zod.literal(''));
export const DateTimeRequiredSchema = zod
   .string(defaultError)
   .min(1, { message: 'required_error' })
   .datetime({ local: true, message: 'invalid_datetime' });
export const DateTimeOptionalSchema = zod
   .string(defaultError)
   .datetime({ local: true, message: 'invalid_datetime' })
   .optional()
   .or(zod.literal(''));
export const TimeRequiredSchema = zod
   .string(defaultError)
   .min(1, { message: 'required_error' })
   .time({ message: 'invalid_time' });
export const TimeOptionalSchema = zod
   .string(defaultError)
   .time({ message: 'invalid_time' })
   .optional()
   .or(zod.literal(''));
// Passport schema
export const PassportRequiredSchema = zod
   .string(defaultError)
   .min(1, { message: 'required_error' })
   .regex(/[A-Za-z]{2}\d{7}/, { message: 'invalid_passport' });
export const PassportOptionalSchema = zod
   .string(defaultError)
   .regex(/[A-Za-z]{2}\d{7}/, { message: 'invalid_passport' })
   .optional()
   .or(zod.literal(''));

// Mfo schema
export const MfoRequiredSchema = zod
   .string(defaultError)
   .min(1, requiredError)
   .regex(/\d{5}/, innError);
export const MfoOptionalSchema = zod
   .string(defaultError)
   .regex(/\d{5}/, innError)
   .optional()
   .or(zod.literal(''));

// Card number schema
export const CardNumberRequiredSchema = zod
   .string(defaultError)
   .min(1, requiredError)
   .regex(/\d{16}/, innError);
export const CardNumberOptionalSchema = zod
   .string(defaultError)
   .regex(/\d{16}/, innError)
   .optional()
   .or(zod.literal(''));

// Pinfl schema
export const PinflRequiredSchema = zod
   .string(defaultError)
   .min(1, requiredError)
   .regex(/\d{14}/, pinflError);
export const PinflOptionalSchema = zod
   .string(defaultError)
   .regex(/\d{14}/, pinflError)
   .optional()
   .or(zod.literal(''));

// Account number schema
export const AccountNumberRequiredSchema = zod
   .string(defaultError)
   .min(1, requiredError)
   .regex(/\d{20}/, pinflError);
export const AccountNumberOptionalSchema = zod
   .string(defaultError)
   .regex(/\d{20}/, pinflError)
   .optional()
   .or(zod.literal(''));

// Tin or pinfl schema
export const TinOrPinflRequiredSchema = zod
   .string(defaultError)
   .min(1, requiredError)
   .regex(/\d{14}|\d{9}/, innOrPinflError);
export const TinOrPinflOptionalSchema = zod
   .string(defaultError)
   .regex(/\d{14}|\d{9}/, innOrPinflError)
   .optional()
   .or(zod.literal(''));

type StringNumberOptions = {
   required?: boolean;
   scale?: number;
};

// String number schema
export const StringNumberSchema = (options?: StringNumberOptions) => {
   const isRequired =
      typeof options?.required === 'boolean' ? options?.required : true;
   const scale =
      typeof options?.scale === 'number' && options.scale >= 0
         ? options.scale
         : 0;
   const invalidTypeIssue = {
      code: 'custom' as const,
      message: 'invalid_type_error',
   };
   const baseSchema = zod
      .string(defaultError)
      .min(1, requiredError)
      .superRefine((data, ctx) => {
         try {
            const value = Big(data);
            if (value.lt(0)) {
               ctx.addIssue(invalidTypeIssue);
            }
            if (value.toFixed().split('.')?.[1]?.length > scale) {
               ctx.addIssue(invalidTypeIssue);
            }
         } catch {
            ctx.addIssue(invalidTypeIssue);
         }
      });
   const stringNumberSchema = isRequired
      ? baseSchema
      : baseSchema.optional().or(zod.literal(''));
   return stringNumberSchema;
};

// Object required schema

export const ObjectRequiredSchema = zod.object(
   { value: NumberSchema, label: StringRequiredSchema, apiData: zod.any() },
   invalidTypeError,
);
export const ObjectKeysStringSchema = zod.object(
   {
      apiData: zod.any(),
      label: StringRequiredSchema,
      value: StringRequiredSchema,
   },
   invalidTypeError,
);
export const ObjectKeysStringArrayRequiredSchema = zod
   .array(ObjectKeysStringSchema, invalidTypeError)
   .min(1, requiredError);
export const ObjectKeysStringArrayOptionalSchema = zod.array(
   ObjectKeysStringSchema,
   invalidTypeError,
);
export const ObjectOptionalSchema = zod
   .object(
      { value: NumberSchema, label: StringRequiredSchema },
      invalidTypeError,
   )
   .or(zod.literal(undefined))
   .or(zod.literal(''))
   .or(zod.literal(null));
