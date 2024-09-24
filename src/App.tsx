import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { FC, useEffect, useRef, useState } from 'react';
import { Modal } from './components/modal';
import { useClickAway } from 'react-use';

const App: FC = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };
  const time: Date = new Date();
  const currentDate = time.toLocaleTimeString();
  const currentYear = time.getFullYear();

  useClickAway(ref, () => {
    setIsVisible(false);
  });


  useEffect(() => {
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
      i18n.changeLanguage(storedLang, (err, t) => {
        if (err) return console.log('Ошибка загрузки языка:', err);
      });
    } else {
      const defaultLang = 'ru';
      i18n.changeLanguage(defaultLang);
    }
  }, [])
  return (
    <div className="text-center">
      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('ru')}>RU</button>
      <hr />
      <div>
        <h1>{t('title')}</h1>
      </div>
      <Button variant="outlined" onClick={() => setIsVisible(!isVisible)}>
        {t('button')}
      </Button>
      <p>
        {`${currentYear}`} || {t('footerText')}
      </p>
      {isVisible && (
        <Modal>
          <div className="flex justify-center items-center">
            <div ref={ref} className="w-52 h-52 bg-white p-5">
              <h1 className="text-center">{t('modalText')}</h1>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
