import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { MiddlewareActionError } from '../types/shared/middleware-action-error';
import { changeNotification } from '../redux/notification/notificationSlice';
import { MiddlewareActionErrorType } from '../types/shared/middleware-action-error-type';
import { NotificationType } from '../types/ui/snackbar/notification-type';
import { ApplicationLanguage } from '../types/shared/application-language';
import { HttpStatusCode } from '../types/shared/http-status-code';

const language = localStorage.getItem('selectedLanguage');

export const NotificationMiddleware: Middleware = (store) => (next) => (action) => {
  if (!isRejectedWithValue(action)) return next(action);
  const payload = action.payload as MiddlewareActionError;

  if (
    payload.type !== MiddlewareActionErrorType.AxiosError ||
    payload.statusCode === HttpStatusCode.UN_AUTHORIZATION
  )
    return next(action);

  if (
    (payload.statusCode === HttpStatusCode.CONFLICT ||
      payload.statusCode === HttpStatusCode.FORBIDDEN ||
      payload.statusCode === HttpStatusCode.BAD_REQUEST) &&
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
