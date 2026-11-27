import { memo, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
const PageTitle = memo(
   ({ title }: { title: string | number | null | undefined }) => {
      const memoizedTitle = useMemo(() => {
         const isValid = ['string', 'number'].includes(typeof title);
         const newTitle = isValid ? title : '';
         const memoizedTitle = `IIV — ${newTitle}`;
         return memoizedTitle;
      }, [title]);
      return (
         <Helmet>
            <title>{memoizedTitle}</title>
         </Helmet>
      );
   },
);
export default PageTitle;
