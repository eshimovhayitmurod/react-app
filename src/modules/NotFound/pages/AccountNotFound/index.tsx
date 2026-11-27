import { NoData, PageTitle } from '@shared/components';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
const AccountNotFound = () => {
   const { t } = useTranslation('notFound');
   return (
      <Fragment>
         <PageTitle title={t('title')} />
         <div className='main-page-wrapper'>
            <div className='main-card-box'>
               <NoData />
            </div>
         </div>
      </Fragment>
   );
};
export default AccountNotFound;
