import Account from '@shared/controller/Account';
import Login from '@shared/controller/Login';
import Layout from '@shared/layout';
import { Navigate, Outlet, useRoutes } from 'react-router';
import ApplicationsModule from './Applications';
import AuthModule from './Auth';
import DashboardModule from './Dashboard';
import AccountNotFound from './NotFound/pages/AccountNotFound';
import NotFound from './NotFound/pages/NotFound';
import ProfileModule from './Profile';
const Modules = () => {
   const routes = useRoutes([
      { path: '/', element: <Navigate to='/auth' /> },
      {
         children: AuthModule,
         path: 'auth',
         element: (
            <Login>
               <Outlet />
            </Login>
         ),
      },
      {
         path: 'account',
         element: (
            <Account>
               <Layout />
            </Account>
         ),
         children: [
            { index: true, element: <Navigate to='dashboard' replace /> },
            { children: DashboardModule, path: 'dashboard' },
            { children: ApplicationsModule, path: 'applications' },
            { children: ProfileModule, path: 'profile' },
            { path: '*', element: <AccountNotFound /> },
         ],
      },
      { path: '*', element: <NotFound /> },
   ]);
   return routes;
};
export default Modules;
