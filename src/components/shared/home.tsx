import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { FC, useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { Modal } from './modal';
import { ApplicationLanguage, DefaultApplicationLanguage } from '../../lib/constans';

interface Props {
  className?: string;
}

export const Home: FC<Props> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const [isRegisterModalVisible, SetIsRegisterModalVisible] = useState(false);
  const modalRef = useRef(null);

  const time: Date = new Date();
  const currentYear = time.getFullYear();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  useClickAway(modalRef, () => {
    SetIsRegisterModalVisible(false);
  });

  useEffect(() => {
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
      i18n.changeLanguage(storedLang, (err, t) => {
        if (err) return console.log('Ошибка загрузки языка:', err);
      });
    } else {
      i18n.changeLanguage(DefaultApplicationLanguage.DEFAULT);
    }
  }, []);

  return (
    <div className="text-center">
      <button onClick={() => changeLanguage(ApplicationLanguage.ENGLISH)}>EN</button>
      <button onClick={() => changeLanguage(ApplicationLanguage.RUSSIAN)}>RU</button>
      <hr />
      <div>
        <h1>{t('title')}</h1>
      </div>
      <Button variant="outlined" onClick={() => SetIsRegisterModalVisible(!isRegisterModalVisible)}>
        {t('button')}
      </Button>
      <p>
        {`${currentYear}`} || {t('footerText')}
      </p>
      {isRegisterModalVisible && (
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