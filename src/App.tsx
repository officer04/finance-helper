import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { FC, useEffect, useRef, useState } from 'react';
import { Modal } from './components/modal';
import { useClickAway } from 'react-use';
import { ApplicationLanguage, DefaultApplicationLanguage } from './utils/constans';

const App: FC = () => {
  const { t, i18n } = useTranslation();
  const [isRegisterVisibleModal, setIsRegisterVisibleModal] = useState(false);
  const modalRef = useRef(null);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };
  const time: Date = new Date();
  const currentYear = time.getFullYear();

  useClickAway(modalRef, () => {
    setIsRegisterVisibleModal(false);
  });


  useEffect(() => {
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
      i18n.changeLanguage(storedLang, (err, t) => {
        if (err) return console.log('Ошибка загрузки языка:', err);
      });
    } else {
      i18n.changeLanguage(DefaultApplicationLanguage.default);
    }
  }, [])
  
  return (
    <div className="text-center">
      <button onClick={() => changeLanguage(ApplicationLanguage.ENGLISH)}>EN</button>
      <button onClick={() => changeLanguage(ApplicationLanguage.RUSSIAN)}>RU</button>  
      <hr />
      <div>
        <h1>{t('title')}</h1>
      </div>
      <Button variant="outlined" onClick={() => setIsRegisterVisibleModal(!isRegisterVisibleModal)}>
        {t('button')}
      </Button>
      <p>
        {`${currentYear}`} || {t('footerText')}
      </p>
      {isRegisterVisibleModal && (
        <Modal>
          <div className="flex justify-center items-center">
            <div ref={modalRef} className="w-52 h-52 bg-white p-5">
              <h1 className="text-center">{t('modalText')}</h1>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
