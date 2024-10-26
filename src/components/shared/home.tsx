import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { FormRegister } from './form-register';
import { FormAuthorization } from './form-authorization';
import { ModalBox } from './modal-box';

export const Home: FC = () => {
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);

  const { t } = useTranslation();

  const handleToggleModalRegister = () => setOpenModalRegister(!openModalRegister);
  const handleToggleModalLogin = () => setOpenModalLogin(!openModalLogin);

  return (
    <div className="pl-2 pr-2">
      <div className="flex flex-col items-center justify-center">
        <Typography variant="h5" marginBottom={2} component="h1">
          {t('title')}
        </Typography>
        <div className="flex flex-col">
          <Button
            variant="outlined"
            style={{ marginBottom: '10px' }}
            size="medium"
            onClick={handleToggleModalLogin}
          >
            {t('buttonOpenModalLogin')}
          </Button>
          <Button variant="outlined" size="medium" onClick={handleToggleModalRegister}>
            {t('buttonOpenModalRegister')}
          </Button>
        </div>
      </div>

      <ModalBox
        title={t('registerTitle')}
        onClose={handleToggleModalRegister}
        open={openModalRegister}
      >
        <FormRegister />
      </ModalBox>

      <ModalBox title={t('loginTitle')} onClose={handleToggleModalLogin} open={openModalLogin}>
        <FormAuthorization />
      </ModalBox>
    </div>
  );
};
