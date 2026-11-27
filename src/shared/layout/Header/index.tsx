import { Menu } from '@assets/icons';
import { RootStateType } from '@shared/store';
import { toggleSidebar } from '@shared/store/ui';
import { useDispatch, useSelector } from 'react-redux';
import Language from './Language';
import Profile from './Profile';
import Theme from './Theme';
const Header = () => {
   const collapsed = useSelector(
      (state: RootStateType) => state.ui?.sidebarCollapsed,
   );
   const dispatch = useDispatch();
   return (
      <div className='w-full h-full flex justify-between items-center px-6 border-b border-[#E2E7EE] dark:border-[#232D3B] bg-[#FFFFFF] dark:bg-[#121822]'>
         <div className='flex items-center justify-center gap-3'>
            <button
               className='focusable w-11 h-11 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5'
               onClick={() => {
                  dispatch(toggleSidebar(!collapsed));
               }}
            >
               <Menu />
            </button>
            <div className='flex items-center gap-3'>
               <span>Logo</span>
            </div>
         </div>
         <div className='flex items-center gap-3'>
            <Language />
            <Theme />
            <Profile />
         </div>
      </div>
   );
};
export default Header;
