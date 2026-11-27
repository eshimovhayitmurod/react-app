import { RefObject, useEffect } from 'react';
import { useLocation } from 'react-router';
type ScrollTopProps = { containerRef: RefObject<HTMLDivElement | null> };
const useScrollTop = ({ containerRef }: ScrollTopProps) => {
   const { pathname } = useLocation();
   useEffect(() => {
      if (containerRef?.current) {
         containerRef.current.scrollTo({
            behavior: 'instant',
            left: 0,
            top: 0,
         });
      }
   }, [pathname, containerRef]);
};
export default useScrollTop;
