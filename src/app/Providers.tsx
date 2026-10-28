import '@assets/styles/button.css';
import '@assets/styles/components.css';
import '@assets/styles/fonts.css';
import '@assets/styles/style.css';
import '@shared/i18n';
import i18n from 'i18next';
import 'mui-tabs/styles/main.css';
import type { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
const Providers = ({ children }: PropsWithChildren) => (
   <HelmetProvider>
      <Provider store={{}}>
         <I18nextProvider i18n={i18n}>
            <BrowserRouter>{children}</BrowserRouter>
         </I18nextProvider>
      </Provider>
   </HelmetProvider>
);
export default Providers;
