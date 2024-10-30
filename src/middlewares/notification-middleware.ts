import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { MiddlewareActionError } from '../types/shared/middleware-action-error';
import { changeNotification } from '../redux/notification/notificationSlice';
import { MiddlewareActionErrorType } from '../types/shared/middleware-action-error-type';
import { NotificationType } from '../types/ui/snackbar/notification-type';
import { ApplicationLanguage } from '../lib/constants';

const language = localStorage.getItem('selectedLanguage');

export const NotificationMiddleware: Middleware = (store) => (next) => (action) => {
  if (!isRejectedWithValue(action)) return next(action);
  const payload = action.payload as MiddlewareActionError;

  if (payload.type !== MiddlewareActionErrorType.AxiosError || payload.statusCode === 401)
    return next(action);

  if (
    (payload.statusCode === 409 || payload.statusCode === 403 || payload.statusCode === 400) &&
    payload.detail
  ) {
    store.dispatch(
      changeNotification({
        infoNotification: NotificationType.InfoError,
        text: payload.detail,
      }),
    );

    return next(action);
  }

  if (language === ApplicationLanguage.RUSSIAN) {
    store.dispatch(
      changeNotification({
        infoNotification: NotificationType.InfoError,
        text: 'Сервис находится на техническом обслуживании',
      }),
    );
  } else if (language === ApplicationLanguage.ENGLISH) {
    store.dispatch(
      changeNotification({
        infoNotification: NotificationType.InfoError,
        text: 'The service is under maintenance',
      }),
    );
  } else {
    throw new Error('Unsupported language');
  }

  return next(action);
};
