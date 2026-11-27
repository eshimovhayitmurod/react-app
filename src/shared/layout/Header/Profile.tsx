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
import { Spinner } from '@shared/components';
import Modal from '@shared/components/overlays/Modal';
import useAuthorization from '@shared/hooks/useAuthorization';
import { RootStateType } from '@shared/store';
import { Fragment, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const Profile = () => {
   const { t } = useTranslation(['layout', 'common']);
   const navigate = useNavigate();
   const { logout, logoutLoading } = useAuthorization();
   const username = useSelector(
      (state: RootStateType) => state?.user?.user?.username,
   );
   const [isOpen, setIsOpen] = useState(false);
   const [open, setOpen] = useState(false);
   const icon = useMemo(() => {
      const isValid = typeof username === 'string' && username;
      const icon = isValid ? username.slice(0, 1).toLocaleUpperCase() : 'A';
      return icon;
   }, [username]);
   const { refs, floatingStyles, context } = useFloating({
      middleware: [offset(2), flip(), shift({ padding: 8 })],
      onOpenChange: setIsOpen,
      open: isOpen,
      placement: 'bottom-end',
      whileElementsMounted: autoUpdate,
   });
   const { isMounted, styles: transitionStyles } = useTransitionStyles(
      context,
      {
         close: { opacity: 0 },
         duration: { open: 140, close: 100 },
         initial: { opacity: 0 },
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
            className='focusable flex items-center justify-center text-[18px] font-medium cursor-pointer w-10 h-10 border rounded-full border-[#E2E7EE] dark:border-[#232D3B]'
            type='button'
            ref={refs.setReference}
            aria-controls='profile-dropdown'
            aria-expanded={isOpen}
            aria-haspopup='true'
            {...getReferenceProps({
               onKeyDown(event) {
                  if (event.key === 'ArrowDown') {
                     event.preventDefault();
                     setIsOpen(true);
                  }
               },
            })}
         >
            {icon}
         </button>
         {isMounted && (
            <FloatingPortal id={import.meta.env.VITE_FLOATING_UI_PORTAL_ID}>
               <FloatingFocusManager
                  context={context}
                  initialFocus={0}
                  modal={false}
               >
                  <div
                     className='z-50 min-w-36 rounded-2xl border border-slate-200 bg-white dark:bg-[#111722] p-1.5 shadow-lg dark:border-slate-700'
                     id='profile-dropdown'
                     ref={refs.setFloating}
                     style={{ ...floatingStyles, ...transitionStyles }}
                     {...getFloatingProps()}
                  >
                     <button
                        className='focusable outline-offset-0! block w-full rounded-xl px-3 py-2.5 text-left text-sm whitespace-nowrap font-medium text-slate-600 dark:text-slate-300'
                        type='button'
                        onClick={() => {
                           navigate('/account/profile');
                           setIsOpen(false);
                        }}
                     >
                        {t('profile')}
                     </button>
                     <button
                        className='focusable outline-offset-0! block w-full rounded-xl px-3 py-2.5 text-left text-sm whitespace-nowrap font-medium text-[#d23048]'
                        type='button'
                        onClick={() => {
                           setOpen(true);
                           setIsOpen(false);
                        }}
                     >
                        {t('logout')}
                     </button>
                  </div>
               </FloatingFocusManager>
            </FloatingPortal>
         )}
         <Modal
            disabled={logoutLoading}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
         >
            <div className='main-card-box'>
               <div className='flex flex-col items-center gap-3'>
                  <h2 className='main-modal-title'>{t('logout')}</h2>
                  <p className='main-modal-description'>
                     {t('logout_confirm')}
                  </p>
                  <div className='flex justify-center items-center gap-3 h-11'>
                     {logoutLoading ? (
                        <Spinner />
                     ) : (
                        <Fragment>
                           <button
                              className='btn btn-secondary'
                              onClick={() => setOpen(false)}
                              type='button'
                           >
                              {t('common:cancel')}
                           </button>
                           <button
                              className='btn btn-danger'
                              onClick={logout}
                              type='button'
                           >
                              {t('exit')}
                           </button>
                        </Fragment>
                     )}
                  </div>
               </div>
            </div>
         </Modal>
      </Fragment>
   );
};
export default Profile;
