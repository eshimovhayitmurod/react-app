import useAuthorization from '@shared/hooks/useAuthorization';
import useCheckForUpdates from '@shared/hooks/useCheckForUpdates';
import useTheme from '@shared/hooks/useTheme';
import { ReactNode, useEffect } from 'react';
interface AppWrapperProps {
   children?: ReactNode;
}
const AppWrapper = ({ children = null }: AppWrapperProps) => {
   const { checkAuthorization } = useAuthorization();
   useCheckForUpdates();
   useTheme();
   useEffect(() => {
      checkAuthorization();
   }, [checkAuthorization]);
   return children;
};
export default AppWrapper;
