import { LoadingStatus } from '@shared/store/user';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import InternalServerError from './InternalServerError';
import Loading from './Loading';
const Login = ({ children }: { children: ReactNode }) => {
   const status = useSelector(
      (state: { user: { STATUS: LoadingStatus } }) => state?.user?.STATUS,
   );
   return status === 'LOADING' ? (
      <Loading />
   ) : status === 'SERVER_ERROR' ? (
      <InternalServerError />
   ) : status === 'ERROR' ? (
      children
   ) : (
      <Navigate to='/account/dashboard' />
   );
};
export default Login;
