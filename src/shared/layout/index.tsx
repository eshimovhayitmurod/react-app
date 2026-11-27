import { ErrorBoundary } from '@shared/components';
import useAuthorization from '@shared/hooks/useAuthorization';
import store, { RootStateType } from '@shared/store';
import { toggleSidebar } from '@shared/store/ui';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import useAutoLogout from './useAutoLogout';
import useScrollTop from './useScrollTop';
const Layout = () => {
   const collapsed = useSelector(
      (state: RootStateType) => state.ui?.sidebarCollapsed,
   );
   const containerRef = useRef<HTMLDivElement>(null);
   const { logout } = useAuthorization();
   useAutoLogout({ onLogout: logout });
   useScrollTop({ containerRef });
   useEffect(() => {
      const rootValue = localStorage.getItem('sidebar-collapsed');
      const collapsed = !!JSON.parse(
         typeof rootValue === 'string' && ['true', 'false'].includes(rootValue)
            ? rootValue
            : 'false',
      );
      store.dispatch(toggleSidebar(collapsed));
   }, []);
   return (
      <div className='flex h-full overflow-hidden flex-col bg-[#F3F5F8] dark:bg-[#0A0E14]'>
         <ErrorBoundary className='h-20 flex w-full border-b border-[#E2E7EE] dark:border-[#232D3B] bg-[#FFFFFF] dark:bg-[#121822]'>
            <header className='h-20 flex w-full'>
               <Header />
            </header>
         </ErrorBoundary>
         <div className='h-[calc(100%-80px)] w-full flex'>
            <aside
               className='h-full shrink-0'
               style={{
                  minWidth: collapsed ? '80px' : '280px',
                  transition: 'width 0.3s, min-width 0.3s',
                  width: collapsed ? '80px' : '280px',
               }}
            >
               <ErrorBoundary className='h-full w-70 border-r border-[#E2E7EE] dark:border-[#232D3B] bg-[#FFFFFF] dark:bg-[#121822]'>
                  <Sidebar />
               </ErrorBoundary>
            </aside>
            <main
               className='h-full flex-1 min-w-0'
               style={{
                  minWidth: collapsed ? 'calc(100%-80px)' : 'calc(100%-280px)',
                  transition: 'width 0.3s, min-width 0.3s',
                  width: collapsed ? 'calc(100%-80px)' : 'calc(100%-280px)',
               }}
            >
               <ErrorBoundary className='h-full w-full'>
                  <div
                     className='relative w-full h-full overflow-y-scroll overflow-x-hidden'
                     ref={containerRef}
                  >
                     <Outlet />
                  </div>
               </ErrorBoundary>
            </main>
         </div>
      </div>
   );
};
export default Layout;
