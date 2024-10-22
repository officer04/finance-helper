import { FC } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeNotification } from '../../redux/notification/notificationSlice';

interface Props {
}

export const SnackbarAll: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector(({ notification }) => notification);
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(
      changeNotification({ infoNotification: notification.infoNotification, text: '' }),
    );
  };
  return (
    <Snackbar open={!!notification.text} autoHideDuration={2000} onClose={handleCloseSnackbar}>
      <Alert
        onClose={handleCloseSnackbar}
        severity={notification.infoNotification}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {notification.text}
      </Alert>
    </Snackbar>
  );
};
