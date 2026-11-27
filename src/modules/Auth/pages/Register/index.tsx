import AuthService from '@modules/Auth/services';
import { cardClass } from '@modules/Dashboard/pages/Dashboard/constants';
import { apiErrorParser } from '@shared/api/apiErrorParser';
import { PageTitle, Spinner } from '@shared/components';
import {
   Label,
   PasswordInput,
   Select,
   TextInput,
} from '@shared/components/forms';
import notification from '@shared/helpers/notification';
import useAuthorization from '@shared/hooks/useAuthorization';
import useRoles from '@shared/hooks/useRoles';
import useSpotlight from '@shared/hooks/useSpotlight';
import Language from '@shared/layout/Header/Language';
import Theme from '@shared/layout/Header/Theme';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { defaultErrors, defaultForm } from './constants';
import { parseRegisterErrors } from './helpers';
import { RegisterFormErrorsType, RegisterFormType } from './types';
import { registerValidationSchema } from './validations';
const Register = () => {
   const { t } = useTranslation(['auth', 'common']);
   const { checkAuthorization } = useAuthorization();
   useSpotlight();
   const [errors, setErrors] = useState<RegisterFormErrorsType>(defaultErrors);
   const [form, setForm] = useState<RegisterFormType>(defaultForm);
   const [loading, setLoading] = useState(false);
   const { password_confirm, username, password, role } = form;
   const { roles, roleOption } = useRoles({ filter: 'register', role });
   const register = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const zodResponse = registerValidationSchema.safeParse(form);
      if (zodResponse?.success) {
         const data = zodResponse?.data;
         const options = {
            data,
            onEnd: () => setLoading(false),
            onStart: () => setLoading(true),
            onSuccess: checkAuthorization,
            onError: (error: unknown) => {
               notification(apiErrorParser(error), { type: 'error' });
            },
         };
         AuthService.register(options);
      } else {
         const errors = parseRegisterErrors({ zodResponse });
         setErrors(errors);
      }
   };
   return (
      <Fragment>
         <PageTitle title={t('register')} />
         <main className='min-h-screen flex justify-center items-center gap-8 bg-[#F3F5F8] dark:bg-[#0A0E14] p-4 text-[#0A0E14] dark:text-[#E8EDF4] sm:p-8'>
            <div
               className={clsx(
                  cardClass,
                  'rounded-3xl flex w-130 flex-col justify-start gap-7 px-6 py-10',
               )}
            >
               <div className='flex justify-between items-center'>
                  <h2 className='text-4xl font-extrabold tracking-tight'>
                     {t('register')}
                  </h2>
                  <div className='p-2 flex items-center gap-2 bg-[#FFFFFF] dark:bg-[#121822] rounded-[26px]'>
                     <Theme />
                     <Language />
                  </div>
               </div>
               <form
                  className='flex w-full max-w-130 flex-col gap-4.5 self-center'
                  onSubmit={register}
               >
                  <div>
                     <Label isRequired>{t('common:username')}</Label>
                     <TextInput
                        autoComplete='off'
                        background='transparent'
                        data-cy='username'
                        disabled={loading}
                        error={errors?.username}
                        value={username}
                        onChange={username => {
                           setErrors(errors => ({
                              ...errors,
                              username: '',
                           }));
                           setForm(form => ({ ...form, username }));
                        }}
                     />
                  </div>
                  <div>
                     <Label isRequired>{t('common:role')}</Label>
                     <Select
                        background='transparent'
                        data-cy='role'
                        disabled={loading}
                        error={errors?.role}
                        options={roles}
                        searchable={false}
                        value={roleOption}
                        onChange={selected => {
                           setErrors(errors => ({ ...errors, role: '' }));
                           const option = Array.isArray(selected)
                              ? selected[0]
                              : selected;
                           const selectedRole = roles.find(
                              optionRole => optionRole.value === option?.value,
                           );
                           const newRole: RegisterFormType['role'] =
                              selectedRole?.value ?? '';
                           setForm(form => ({
                              ...form,
                              role: newRole,
                           }));
                        }}
                     />
                  </div>
                  <div>
                     <Label isRequired>{t('common:password')}</Label>
                     <PasswordInput
                        autoComplete='new-password'
                        background='transparent'
                        data-cy='password'
                        disabled={loading}
                        error={errors?.password}
                        value={password}
                        onChange={password => {
                           setErrors(errors => ({
                              ...errors,
                              password: '',
                           }));
                           setForm(form => ({ ...form, password }));
                        }}
                     />
                  </div>
                  <div>
                     <Label isRequired>{t('repeat_password')}</Label>
                     <PasswordInput
                        autoComplete='new-password'
                        background='transparent'
                        data-cy='password_confirm'
                        disabled={loading}
                        error={errors?.password_confirm}
                        value={password_confirm}
                        onChange={password_confirm => {
                           setErrors(errors => ({
                              ...errors,
                              password_confirm: '',
                           }));
                           setForm(form => ({
                              ...form,
                              password_confirm,
                           }));
                        }}
                     />
                  </div>
                  {loading ? (
                     <div className='flex items-center justify-center h-11'>
                        <Spinner />
                     </div>
                  ) : (
                     <button
                        className='btn btn-primary'
                        data-cy='register-button'
                        type='submit'
                     >
                        {t('continue')}
                     </button>
                  )}
                  <p className='text-center text-sm text-[#5E6B7D] dark:text-[#8A97A8]'>
                     {t('have_account')}{' '}
                     <Link
                        className='rounded-sm font-semibold text-[#2F6FEB] dark:text-[#5B9BFF] hover:opacity-85'
                        to='/auth/login'
                     >
                        {t('login')}
                     </Link>
                  </p>
               </form>
            </div>
         </main>
      </Fragment>
   );
};
export default Register;
