import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { MiddlewareActionError } from '../types/shared/middleware-action-error';
import { changeNotification } from '../redux/notification/notificationSlice';
import { MiddlewareActionErrorType } from '../types/shared/middleware-action-error-type';
import { NotificationType } from '../types/ui/snackbar/notification-type';
import { ApplicationLanguage } from '../lib/constants';

const language = localStorage.getItem('selectedLanguage');

export const notificationMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as MiddlewareActionError;
    if (payload.type === MiddlewareActionErrorType.AxiosError) {
      if (payload.statusCode === 409 && payload.detail)
        store.dispatch(
          changeNotification({
            infoNotification: NotificationType.InfoError,
            text: payload.detail,
          }),
        );
      else if (payload.statusCode === 403 && payload.detail)
        store.dispatch(
          changeNotification({
            infoNotification: NotificationType.InfoError,
            text: payload.detail,
          }),
        );
      else
        store.dispatch(
          language === ApplicationLanguage.RUSSIAN
            ? changeNotification({
                infoNotification: NotificationType.InfoError,
                text: 'Сервис находится на техническом обслуживании',
              })
            : changeNotification({
                infoNotification: NotificationType.InfoError,
                text: 'The service is under maintenance',
              }),
        );
    }
  }

  return next(action);
};
