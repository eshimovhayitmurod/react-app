import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import Icon from './Icon';
const PERIODS = ['today', 'week', 'month', 'year'] as const;
interface LayoutContext {
   containerRef: React.RefObject<HTMLDivElement | null>;
}
const Header = ({ title }: { title: string }) => {
   const { t } = useTranslation('dashboard');
   const context = useOutletContext<LayoutContext>();
   const containerRef = context?.containerRef;
   const [isFullscreen, setIsFullscreen] = useState(false);
   const toggleFullscreen = () => {
      if (document.fullscreenElement === containerRef?.current) {
         void document.exitFullscreen();
      } else {
         void containerRef.current?.requestFullscreen();
      }
   };
   useEffect(() => {
      const handleFullscreenChange = () => {
         setIsFullscreen(document.fullscreenElement === containerRef?.current);
      };
      handleFullscreenChange();
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => {
         document.removeEventListener(
            'fullscreenchange',
            handleFullscreenChange,
         );
      };
   }, [containerRef]);
   return (
      <Fragment>
         <header className='flex flex-wrap items-end justify-between gap-4'>
            <h1 className='text-4xl font-extrabold tracking-tight'>{title}</h1>
            <div className='flex flex-wrap items-center gap-2'>
               <button
                  className='focusable flex h-11 cursor-pointer items-center gap-2 rounded-xl px-4 text-[15px] font-semibold border border-[#E2E7EE] dark:border-[#232D3B] bg-[#FFFFFF] dark:bg-[#121822]'
                  type='button'
               >
                  <Icon
                     d='M12 4v12M7 11l5 5 5-5M4 20h16'
                     size={16}
                     stroke={1.9}
                  />
                  {t('report')}
               </button>
               <div
                  aria-label={t('interval')}
                  className='flex gap-1 rounded-full border border-[#E2E7EE] bg-[#FFFFFF] p-1 dark:border-[#232D3B] dark:bg-[#121822]'
                  role='tablist'
               >
                  {PERIODS.map((label, i) => (
                     <button
                        aria-selected={i === 2}
                        className={`focusable h-9 cursor-pointer rounded-full px-3.5 text-[13px] font-semibold ${i === 1 ? 'bg-[#0A0E14] text-white dark:bg-[#E8EDF4] dark:text-[#0A0E14]' : 'text-[#5E6B7D] dark:text-[#8A97A8]'}`}
                        key={label}
                        role='tab'
                        type='button'
                     >
                        {t(`periods.${label}`)}
                     </button>
                  ))}
               </div>
               <button
                  aria-label={t('update_info')}
                  className='focusable flex size-11 cursor-pointer items-center justify-center rounded-xl border border-[#E2E7EE] dark:border-[#232D3B] bg-[#FFFFFF] dark:bg-[#121822]'
                  type='button'
               >
                  <Icon d='M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6' stroke={1.9} />
               </button>
               <button
                  aria-pressed={isFullscreen}
                  className='focusable flex size-11 cursor-pointer items-center justify-center rounded-xl border border-[#E2E7EE] dark:border-[#232D3B] bg-[#FFFFFF] dark:bg-[#121822]'
                  onClick={toggleFullscreen}
                  type='button'
                  aria-label={
                     isFullscreen ? t('exit_fullscreen') : t('fullscreen')
                  }
               >
                  <Icon
                     stroke={1.9}
                     d={
                        isFullscreen
                           ? 'M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3'
                           : 'M3 8V5a2 2 0 0 1 2-2h3m8 0h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3'
                     }
                  />
               </button>
            </div>
         </header>
      </Fragment>
   );
};
export default Header;
