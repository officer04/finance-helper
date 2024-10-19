import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { MiddlewareActionError } from '../types/shared/middleware-action-error';
import { changeNotification } from '../redux/notification/notificationSlice';
import { MiddlewareActionErrorType } from '../types/shared/middleware-action-error-type';
import { SnackbarInfoNotificationType } from '../types/ui/snackbar/snackbar-info-notification-type';

const language = localStorage.getItem('selectedLanguage');

export const notificationMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as MiddlewareActionError;
    if (payload.type === MiddlewareActionErrorType.AxiosError) {
      if (payload.statusCode === 409 && payload.detail)
        store.dispatch(changeNotification({ infoNotification: SnackbarInfoNotificationType.InfoError, text: payload.detail }));
      else if (payload.statusCode === 403 && payload.detail)
        store.dispatch(changeNotification({ infoNotification: SnackbarInfoNotificationType.InfoError, text: payload.detail }));
      else
        store.dispatch(
          language === 'ru'
            ? changeNotification({
                infoNotification: SnackbarInfoNotificationType.InfoError,
                text: 'Сервис находится на техническом обслуживании',
              })
            : changeNotification({
                infoNotification: SnackbarInfoNotificationType.InfoError,
                text: 'The service is under maintenance',
              }),
        );
    }
  }

  return next(action);
};
