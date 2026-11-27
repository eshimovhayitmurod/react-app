import { Navigate } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
const AuthModule = [
   { index: true, element: <Navigate to='/auth/login' /> },
   { path: 'login', element: <Login /> },
   { path: 'register', element: <Register /> },
];
export default AuthModule;
