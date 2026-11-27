import { LoadingStatus } from '@shared/store/user';
import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import ErrorBoundary from '../components/ErrorBoundary';
import InternalServerError from './InternalServerError';
import Loading from './Loading';
const Account = ({ children }: PropsWithChildren) => {
   const status = useSelector(
      (state: { user: { STATUS: LoadingStatus } }) => state?.user?.STATUS,
   );
   return status === 'LOADING' ? (
      <Loading />
   ) : status === 'SERVER_ERROR' ? (
      <InternalServerError />
   ) : status === 'SUCCESS' ? (
      <ErrorBoundary className='h-dvh max-h-dvh'>{children}</ErrorBoundary>
   ) : (
      <Navigate to='/auth' />
   );
};
export default Account;
