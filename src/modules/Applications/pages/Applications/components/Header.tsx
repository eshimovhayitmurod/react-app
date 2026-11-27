import { Fragment } from 'react';
const Header = ({ title }: { title: string }) => {
   return (
      <Fragment>
         <header className='flex items-center justify-between gap-2'>
            <h1 className='text-4xl font-extrabold tracking-tight'>{title}</h1>
         </header>
      </Fragment>
   );
};
export default Header;
