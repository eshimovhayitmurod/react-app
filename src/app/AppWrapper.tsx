import useAuthorization from '@shared/hooks/initialization/useAuthorization';
import useCheckForUpdates from '@shared/hooks/initialization/useCheckForUpdates';
import useErrorLogging from '@shared/hooks/initialization/useErrorLogging';
import useInitTheme from '@shared/hooks/initialization/useInitTheme';
import { ReactNode, useEffect } from 'react';
interface AppWrapperProps {
   children?: ReactNode;
}
const AppWrapper = ({ children = null }: AppWrapperProps) => {
   const { getUser } = useAuthorization();
   useCheckForUpdates();
   useErrorLogging();
   useInitTheme();
   useEffect(() => {
      getUser();
   }, [getUser]);
   return children;
};
export default AppWrapper;
