import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { FC, useState } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { FormRegister } from './form-register';
import { FormLogin } from './form-login';

interface Props {
  className?: string;
}

export const Home: FC<Props> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);

  const handleToggleModalRegister = () => setOpenModalRegister(!openModalRegister);
  const handleToggleModalLogin = () => setOpenModalLogin(!openModalLogin);

  return (
    <div>
      <div className="text-center">
        <Typography variant="h5" marginBottom={2} component="h1">
          {t('title')}
        </Typography>
        <Button variant="outlined" size="medium" onClick={handleToggleModalLogin}>
          {t('buttonOpenModalLogin')}
        </Button>
        <Button variant="outlined" size="medium" onClick={handleToggleModalRegister}>
          {t('buttonOpenModalRegister')}
        </Button>
      </div>

      <Modal
        open={openModalRegister}
        onClose={handleToggleModalRegister}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-[400px] border-solid border-2 p-4  bg-white shadow-sm rounded-lg">
          <Typography variant="h5" marginBottom={2} textAlign={'center'} component="h1">
            {t('registerTitle')}
          </Typography>
          <FormRegister />
        </div>
      </Modal>

      <Modal
        open={openModalLogin}
        onClose={handleToggleModalLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-[400px] border-solid border-2 p-4  bg-white shadow-sm rounded-lg">
          <Typography variant="h5" marginBottom={2} textAlign={'center'} component="h1">
            {t('loginTitle')}
          </Typography>
          <FormLogin />
        </div>
      </Modal>
    </div>
  );
};
