import React from 'react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

import { useAppSelector } from '../../redux/hooks';
import { FormRegister } from './form-register';
import { FormAuthorization } from './form-authorization';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormData {
  firstName: string;
  lastName: string;
}

export const Home: FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);

  const { t, i18n } = useTranslation();
  const { notification } = useAppSelector(({ notification }) => notification);

  const handleToggleModalRegister = () => setOpenModalRegister(!openModalRegister);
  const handleToggleModalLogin = () => setOpenModalLogin(!openModalLogin);
  const { control, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <div className="pl-2 pr-2">
      <div className="text-center">
        <Typography variant="h5" marginBottom={2} component="h1">
          {t('title')}
        </Typography>
        <div className='flex flex-col w-50'>
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

      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
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
          <FormRegister setOpenSnackbar={setOpenSnackbar} />
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
          <FormAuthorization setOpenSnackbar={setOpenSnackbar} />
        </div>
      </Modal>
    </div>
  );
};
