import { FC, useEffect } from 'react';
import { Footer, Header } from './shared';
import { AppRoutes } from '../routes/app-routes';
import i18n from '../i18n';
import { DefaultApplicationLanguage } from '../lib/constants';
import { Notification } from './shared/notification';

const App: FC = () => {
  useEffect(() => {
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
      i18n.changeLanguage(storedLang, (err, t) => {
        if (err) return console.log('Error loading language:', err);
      });
    } else {
      i18n.changeLanguage(DefaultApplicationLanguage.DEFAULT);
    }
  }, []);

  return (
    <div className="">
      <Header />
      <AppRoutes />
      <Notification />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
