import { useCallback, useEffect, useRef } from 'react';
interface UseAutoLogoutOptions {
   timeout?: number;
   onLogout: () => void;
   enabled?: boolean;
}
const useAutoLogout = ({
   enabled = true,
   onLogout,
   timeout,
}: UseAutoLogoutOptions) => {
   const isLoggedOutRef = useRef(false);
   const onLogoutRef = useRef(onLogout);
   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
   useEffect(() => {
      onLogoutRef.current = onLogout;
   }, [onLogout]);
   const logout = useCallback(() => {
      if (isLoggedOutRef.current) return;
      isLoggedOutRef.current = true;
      if (timerRef.current) {
         clearTimeout(timerRef.current);
         timerRef.current = null;
      }
      onLogoutRef.current();
   }, []);
   const resetTimer = useCallback(() => {
      if (isLoggedOutRef.current) return;
      if (timerRef.current) {
         clearTimeout(timerRef.current);
      }
      const newTimeoutInMinutes =
         typeof timeout === 'number'
            ? timeout
            : Number(import.meta.env.VITE_AUTOMATIC_LOGOUT_TIME);
      const newTimeout = newTimeoutInMinutes * 60 * 1000;
      timerRef.current = setTimeout(logout, newTimeout);
   }, [logout, timeout]);
   useEffect(() => {
      if (!enabled) return;
      const events: (keyof WindowEventMap)[] = [
         'mousemove',
         'mousedown',
         'keydown',
         'scroll',
         'touchstart',
         'click',
      ];
      events.forEach(event => {
         window.addEventListener(event, resetTimer, {
            passive: true,
         });
      });
      resetTimer();
      return () => {
         events.forEach(event => {
            window.removeEventListener(event, resetTimer);
         });
         if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
         }
      };
   }, [enabled, resetTimer]);
   return {
      resetTimer,
      logout,
   };
};
export default useAutoLogout;
