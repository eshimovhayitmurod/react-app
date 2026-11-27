import { memo, ReactElement } from 'react';
import NoData from './NoData';
interface NoDataProps {
   backButton?: ReactElement;
   description?: string;
   title?: string;
}
const NotFound = memo((props: NoDataProps) => (
   <section className='main-card-box'>
      <NoData {...props} />
   </section>
));
export default NotFound;
