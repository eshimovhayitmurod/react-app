import { useEffect } from 'react';
const useSpotlight = () => {
   useEffect(() => {
      let frame = 0;
      let last: PointerEvent | null = null;
      const apply = () => {
         frame = 0;
         const e = last;
         if (!e) return;
         const card = (e.target as Element | null)?.closest?.(
            '.spotlight-card',
         ) as HTMLElement | null;
         if (!card) return;
         const rect = card.getBoundingClientRect();
         const k = card.offsetWidth ? rect.width / card.offsetWidth : 1;
         card.style.setProperty('--spot-x', `${(e.clientX - rect.left) / k}px`);
         card.style.setProperty('--spot-y', `${(e.clientY - rect.top) / k}px`);
      };
      const onMove = (e: PointerEvent) => {
         last = e;
         if (!frame) frame = requestAnimationFrame(apply);
      };
      document.addEventListener('pointermove', onMove, { passive: true });
      return () => {
         document.removeEventListener('pointermove', onMove);
         cancelAnimationFrame(frame);
      };
   }, []);
};
export default useSpotlight;
