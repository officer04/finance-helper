import { FC, useEffect } from 'react';
import { Header } from './shared';
import { AppRoutes } from '../routes/app-routes';
import i18n from '../i18n';
import { Notification } from './shared/notification';
import { DefaultApplicationLanguage } from '../types/shared/default-application-language';

const App: FC = () => {
  useEffect(() => {
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
      i18n.changeLanguage(storedLang, (err, t) => {
        if (err) return console.log('Error loading language:', err);
      });
    } else {
      i18n.changeLanguage(DefaultApplicationLanguage);
    }
  }, []);

  return (
    <>
      <Header />
      <AppRoutes />
      <Notification />
    </>
  );
};

export default App;
