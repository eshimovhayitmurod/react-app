import { useTranslation } from 'react-i18next';
const InternalServerError = () => {
   const { t } = useTranslation('components');
   const reloadPage = () => window.location.reload();
   return (
      <main className='w-screen h-dvh flex items-center justify-center'>
         <div className='flex items-center justify-center flex-col'>
            <div className='mb-10'>
               <img
                  alt='internal-server-error'
                  height='300'
                  loading='lazy'
                  src='/images/internal-server-error.svg'
                  width='450'
               />
            </div>
            <h1 className='text-center mb-2 text-2xl font-bold'>
               {t('internal-server-error')}
            </h1>
            <p className='w-95 text-center mb-7 text-base font-medium text-[#949494]'>
               {t('server-error-description')}
            </p>
            <div>
               <button onClick={reloadPage} className='success-btn'>
                  {t('reconnect')}
               </button>
            </div>
         </div>
      </main>
   );
};
export default InternalServerError;
