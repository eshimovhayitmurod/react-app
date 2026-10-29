import { UserDataType } from '@shared/types/store/user.types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import InternalServerError from './InternalServerError';
import Loading from './Loading';
const Login = ({ children = 'No content' }) => {
   const status = useSelector(
      (state: { user: UserDataType }) => state?.user?.STATUS,
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
