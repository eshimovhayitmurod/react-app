import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSidebar from '../useSidebar';
import NavMenu from './NavMenu';
const Sidebar = () => {
   const { t } = useTranslation('layout');
   const sidebars = useSidebar();
   const [activeIndex, setActiveIndex] = useState(-1);
   return (
      <Fragment>
         <div className='h-full w-full flex flex-col border-r border-[#E2E7EE] dark:border-[#232D3B] bg-[#FFFFFF] dark:bg-[#121822]'>
            <nav
               aria-label={t('main_menu')}
               className='h-[calc(100%-92px)] flex flex-col gap-1 px-4 pt-6'
            >
               {sidebars.map((sidebar, index) => {
                  return (
                     <NavMenu
                        {...sidebar}
                        activeIndex={activeIndex}
                        key={index}
                        index={index}
                        setActiveIndex={setActiveIndex}
                     />
                  );
               })}
            </nav>
         </div>
      </Fragment>
   );
};
export default Sidebar;
