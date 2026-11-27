import { Spinner } from '@shared/components';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
type HeaderProps = {
   isExporting?: boolean;
   onExport?: () => void;
   title: string;
};
const Header = ({ isExporting = false, onExport, title }: HeaderProps) => {
   const { t } = useTranslation('applications');
   return (
      <Fragment>
         <header className='flex items-center justify-between gap-2'>
            <h1 className='text-4xl font-extrabold tracking-tight'>{title}</h1>
            <div className='flex items-center gap-2'>
               <Link className='btn btn-primary' to='/account/applications'>
                  {t('title')}
               </Link>
               {onExport &&
                  (isExporting ? (
                     <div className='flex items-center justify-center h-11'>
                        <Spinner />
                     </div>
                  ) : (
                     <Fragment>
                        <button
                           className='btn btn-success'
                           onClick={onExport}
                           type='button'
                        >
                           {t('export_pdf')}
                        </button>
                     </Fragment>
                  ))}
            </div>
         </header>
      </Fragment>
   );
};
export default Header;
