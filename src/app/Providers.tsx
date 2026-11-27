import '@shared/i18n';
import store from '@shared/store';
import i18n from 'i18next';
import type { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import '../assets/styles/animations.css';
import '../assets/styles/buttons.css';
import '../assets/styles/fonts.css';
import '../assets/styles/forms.css';
import '../assets/styles/style.css';
import '../assets/styles/table.css';
import '../assets/styles/utilities.css';
const Providers = ({ children }: PropsWithChildren) => (
   <HelmetProvider>
      <Provider store={store}>
         <I18nextProvider i18n={i18n}>
            <BrowserRouter>{children}</BrowserRouter>
         </I18nextProvider>
      </Provider>
   </HelmetProvider>
);
export default Providers;
