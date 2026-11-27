import {
   autoUpdate,
   flip,
   FloatingFocusManager,
   FloatingPortal,
   offset,
   shift,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useTransitionStyles,
} from '@floating-ui/react';
import { languages } from '@shared/constants/languages';
import { Fragment, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
const GlobeIcon = () => (
   <svg
      fill='none'
      height='16'
      stroke='currentColor'
      strokeWidth='2'
      viewBox='0 0 24 24'
      width='16'
   >
      <circle cx='12' cy='12' r='10' />
      <path d='M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
   </svg>
);
const ChevronDownIcon = () => (
   <svg
      fill='none'
      height='15'
      stroke='currentColor'
      strokeWidth='2.5'
      viewBox='0 0 24 24'
      width='15'
   >
      <path d='m6 9 6 6 6-6' />
   </svg>
);
const Language = () => {
   const { t, i18n } = useTranslation('layout');
   const language = i18n?.language;
   const [isOpen, setIsOpen] = useState(false);
   const languageName = useMemo(() => {
      const languageName = languages.find(
         lang => lang?.value === language,
      )?.label;
      return languageName;
   }, [language]);
   const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'bottom',
      middleware: [offset(2), flip(), shift({ padding: 8 })],
      whileElementsMounted: autoUpdate,
   });
   const { isMounted, styles: transitionStyles } = useTransitionStyles(
      context,
      {
         duration: { open: 140, close: 100 },
         initial: { opacity: 0 },
         close: { opacity: 0 },
      },
   );
   const click = useClick(context);
   const dismiss = useDismiss(context);
   const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
   ]);
   return (
      <Fragment>
         <button
            aria-controls='language-options'
            aria-expanded={isOpen}
            aria-haspopup='true'
            aria-label={t('language')}
            className='focusable flex items-center gap-1.5 rounded-full p-2.5 text-[13px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            ref={refs.setReference}
            tabIndex={0}
            type='button'
            {...getReferenceProps({
               onKeyDown(event) {
                  if (event.key === 'ArrowDown') {
                     event.preventDefault();
                     setIsOpen(true);
                  }
               },
            })}
         >
            <GlobeIcon />
            {languageName}
            <ChevronDownIcon />
         </button>
         {isMounted && (
            <FloatingPortal id={import.meta.env.VITE_FLOATING_UI_PORTAL_ID}>
               <FloatingFocusManager
                  context={context}
                  initialFocus={0}
                  modal={false}
               >
                  <div
                     ref={refs.setFloating}
                     style={{ ...floatingStyles, ...transitionStyles }}
                     className='z-50 min-w-36 rounded-2xl border border-slate-200 bg-white dark:bg-[#111722] p-1.5 shadow-lg dark:border-slate-700'
                     id='language-options'
                     {...getFloatingProps()}
                  >
                     {languages.map(lang => (
                        <button
                           aria-pressed={language === lang?.value}
                           key={lang?.value}
                           type='button'
                           className={`focusable outline-offset-0! block w-full rounded-xl px-3 py-2.5 text-left text-sm ${
                              language === lang?.value
                                 ? 'bg-slate-100 dark:bg-white/5 font-medium text-slate-900 dark:text-slate-100'
                                 : 'text-slate-600 dark:text-slate-300'
                           }`}
                           onClick={() => {
                              i18n.changeLanguage(lang?.value);
                              setIsOpen(false);
                           }}
                        >
                           {lang?.label}
                        </button>
                     ))}
                  </div>
               </FloatingFocusManager>
            </FloatingPortal>
         )}
      </Fragment>
   );
};
export default Language;
