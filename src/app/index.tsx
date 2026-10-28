import Notifications from '@shared/layout/Notifications';
import Modules from '../modules';
import AppWrapper from './AppWrapper';
import Providers from './Providers';
const App = () => (
   <Providers>
      <AppWrapper>
         <Modules />
         <Notifications />
      </AppWrapper>
   </Providers>
);
export default App;
