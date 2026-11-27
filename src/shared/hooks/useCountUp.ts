import { useEffect, useState } from 'react';
const useCountUp = (trigger: number, duration = 1500) => {
   const [p, setP] = useState(0);
   useEffect(() => {
      let raf = 0;
      const start = performance.now();
      const step = (now: number) => {
         const k = Math.min(1, (now - start) / duration);
         setP(1 - Math.pow(1 - k, 3));
         if (k < 1) raf = requestAnimationFrame(step);
      };
      setP(0);
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
   }, [trigger, duration]);
   return p;
};
export default useCountUp;
