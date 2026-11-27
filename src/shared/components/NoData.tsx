import { Empty } from '@assets/icons';
import { memo, ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
interface NoDataProps {
   backButton?: ReactElement | null;
   description?: string | undefined | null;
   title?: string | undefined | null;
}
const NoData = memo(({ backButton, description, title }: NoDataProps) => {
   const { t } = useTranslation('common');
   const memoizedTitle = useMemo(() => {
      const memoizedTitle =
         title && typeof title === 'string' ? title : t('page_not_found');
      return memoizedTitle;
   }, [title, t]);
   const memoizedDescription = useMemo(() => {
      const memoizedDescription =
         description && typeof description === 'string'
            ? description
            : t('page_not_found_description');
      return memoizedDescription;
   }, [description, t]);
   return (
      <div className='w-full flex flex-col items-center gap-5 py-4'>
         <div className='flex size-16 items-center justify-center rounded-[20px] bg-[#C47A001F] dark:bg-[#F5A52424] text-[#A86400] dark:text-[#F5A524]'>
            <Empty className='size-7.5' strokeWidth={1.8} aria-hidden />
         </div>
         {title !== null && (
            <h1 className='text-4xl font-extrabold tracking-tight'>
               {memoizedTitle}
            </h1>
         )}
         {description !== null && (
            <p className='text-[16px] leading-relaxed text-[#3D4757] dark:text-[#A3AFBF]'>
               {memoizedDescription}
            </p>
         )}
         {backButton === null ? (
            ''
         ) : backButton ? (
            backButton
         ) : (
            <Link className='btn btn-primary' to='/account/dashboard'>
               {t('home')}
            </Link>
         )}
      </div>
   );
});
export default NoData;
