import { cardClass } from '@modules/Dashboard/pages/Dashboard/constants';
import { NoData, PageTitle } from '@shared/components';
import useSpotlight from '@shared/hooks/useSpotlight';
import clsx from 'clsx';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
const NotFound = () => {
   const { t } = useTranslation('notFound');
   useSpotlight();
   return (
      <Fragment>
         <PageTitle title={t('title')} />
         <div className='w-full h-full flex items-center justify-center'>
            <div className='min-w-150'>
               <div className={clsx(cardClass, 'rounded-3xl px-6 py-10')}>
                  <NoData
                     backButton={
                        <Link className='btn btn-primary' to='/auth/login'>
                           {t('home')}
                        </Link>
                     }
                  />
               </div>
            </div>
         </div>
      </Fragment>
   );
};
export default NotFound;
