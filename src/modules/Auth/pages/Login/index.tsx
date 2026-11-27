import AuthService from '@modules/Auth/services';
import { cardClass } from '@modules/Dashboard/pages/Dashboard/constants';
import { apiErrorParser } from '@shared/api/apiErrorParser';
import { PageTitle, Spinner } from '@shared/components';
import { Label, PasswordInput, TextInput } from '@shared/components/forms';
import notification from '@shared/helpers/notification';
import useAuthorization from '@shared/hooks/useAuthorization';
import useSpotlight from '@shared/hooks/useSpotlight';
import Language from '@shared/layout/Header/Language';
import Theme from '@shared/layout/Header/Theme';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { defaultErrors, defaultForm } from './constants';
import { parseLoginErrors } from './helpers';
import { LoginFormErrorsType } from './types';
import { LoginFormType, loginValidationSchema } from './validations';
const Login = () => {
   const { t } = useTranslation(['auth', 'common']);
   const { checkAuthorization } = useAuthorization();
   useSpotlight();
   const [errors, setErrors] = useState<LoginFormErrorsType>(defaultErrors);
   const [form, setForm] = useState<LoginFormType>(defaultForm);
   const [loading, setLoading] = useState(false);
   const { username, password } = form;
   const login = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const zodResponse = loginValidationSchema.safeParse(form);
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
         AuthService.login(options);
      } else {
         const errors = parseLoginErrors({ zodResponse });
         setErrors(errors);
      }
   };
   return (
      <Fragment>
         <PageTitle title={t('login_title')} />
         <main className='flex items-center justify-center min-h-screen gap-8 bg-[#F3F5F8] dark:bg-[#0A0E14] p-4 text-[#0A0E14] dark:text-[#E8EDF4] sm:p-8'>
            <div
               className={clsx(
                  cardClass,
                  'rounded-3xl flex w-130 h-full flex-col justify-center gap-8 px-6 py-10',
               )}
            >
               <div className='flex justify-between items-center'>
                  <h2 className='text-4xl font-extrabold tracking-tight'>
                     {t('login_title')}
                  </h2>
                  <div className='p-2 flex items-center gap-2 bg-[#FFFFFF] dark:bg-[#121822] rounded-[26px]'>
                     <Theme />
                     <Language />
                  </div>
               </div>
               <form
                  className='flex w-full h-[calc(100%-56px)] flex-col gap-5 self-center'
                  onSubmit={login}
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
                     <Label>{t('common:password')}</Label>
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
                  {loading ? (
                     <div className='flex items-center justify-center h-11'>
                        <Spinner />
                     </div>
                  ) : (
                     <button
                        className='btn btn-primary'
                        data-cy='login-button'
                        type='submit'
                     >
                        {t('login')}
                     </button>
                  )}
                  <p className='text-center text-sm text-[#5E6B7D] dark:text-[#8A97A8]'>
                     {t('no_account')}{' '}
                     <Link
                        className='rounded-sm font-semibold text-[#2F6FEB] dark:text-[#5B9BFF] hover:opacity-85'
                        to='/auth/register'
                     >
                        {t('register')}
                     </Link>
                  </p>
               </form>
            </div>
         </main>
      </Fragment>
   );
};
export default Login;
