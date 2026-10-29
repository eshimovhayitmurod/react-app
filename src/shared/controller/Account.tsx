import ErrorBoundary from '@shared/components/ErrorBoundary';
import { UserDataType } from '@shared/types/store/user.types';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import InternalServerError from './InternalServerError';
import Loading from './Loading';
const Account = ({ children }: { children: ReactElement }) => {
   const status = useSelector(
      (state: { user: UserDataType }) => state?.user?.STATUS,
   );
   return status === 'LOADING' ? (
      <Loading />
   ) : status === 'SERVER_ERROR' ? (
      <InternalServerError />
   ) : status === 'SUCCESS' ? (
      <ErrorBoundary className='h-dvh max-h-dvh'>{children}</ErrorBoundary>
   ) : (
      <Navigate to='/auth?tab=0' />
   );
};
export default Account;
