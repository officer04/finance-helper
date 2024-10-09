import React from 'react';
import { FC, useState } from 'react';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useTranslation } from 'react-i18next';
import { Alert } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';

import { FormRegister } from './form-register';
import { FormLogin } from './form-login';

interface Props {
  className?: string;
}

export const Home: FC<Props> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const { notification } = useAppSelector(({ notification }) => notification);

  const handleToggleModalRegister = () => setOpenModalRegister(!openModalRegister);
  const handleToggleModalLogin = () => setOpenModalLogin(!openModalLogin);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.text}
        </Alert>
      </Snackbar>

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
          <FormRegister setOpen={setOpen} />
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
// function enqueueSnackbar(arg0: string, arg1: { variant: VariantType; }) {
//   throw new Error('Function not implemented.');
// }
