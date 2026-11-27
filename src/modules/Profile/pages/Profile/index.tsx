import { PageTitle } from '@shared/components';
import { Label, Select, TextInput } from '@shared/components/forms';
import useRoles from '@shared/hooks/useRoles';
import { RootStateType } from '@shared/store';
import { UserDataType } from '@shared/types/user.types';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const Profile = () => {
   const { t } = useTranslation(['profile', 'common']);
   const user = useSelector(
      (state: RootStateType) => state.user.user,
   ) as UserDataType;
   const first_name = user?.first_name;
   const last_name = user?.last_name;
   const role = user?.role;
   const username = user?.username;
   const { roleOption } = useRoles({ filter: 'all', role });
   const firstName = useMemo(() => {
      const isValid = typeof first_name === 'string' && first_name;
      const firstName = isValid ? first_name : '-';
      return firstName;
   }, [first_name]);
   const lastName = useMemo(() => {
      const isValid = typeof last_name === 'string' && last_name;
      const lastName = isValid ? last_name : '-';
      return lastName;
   }, [last_name]);
   const userName = useMemo(() => {
      const isValid = typeof username === 'string' && username;
      const userName = isValid ? username : '-';
      return userName;
   }, [username]);
   return (
      <Fragment>
         <PageTitle title={t('title')} />
         <div className='main-page-wrapper'>
            <div className='grid grid-cols-1 gap-4'>
               <div>
                  <h1 className='text-4xl font-extrabold tracking-tight'>
                     {t('personal_info')}
                  </h1>
               </div>
               <div className='main-card-wrapper'>
                  <div className='grid grid-cols-3 gap-4 p-5'>
                     <div>
                        <Label>{t('common:first_name')}</Label>
                        <TextInput disabled value={firstName} />
                     </div>
                     <div>
                        <Label>{t('common:last_name')}</Label>
                        <TextInput disabled value={lastName} />
                     </div>
                     <div>
                        <Label>{t('common:username')}</Label>
                        <TextInput disabled value={userName} />
                     </div>
                     <div>
                        <Label>{t('common:role')}</Label>
                        <Select disabled value={roleOption} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};
export default Profile;
