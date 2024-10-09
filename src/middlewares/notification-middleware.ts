import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { isMiddlewareActionError, MiddlewareActionError } from '../types/shared/middleware-action-error';
import { changeNotification } from '../redux/user/notificationSlice';
import { MiddlewareActionErrorType } from '../types/shared/middleware-action-error-type';

export const notificationMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action) && isMiddlewareActionError(action)) {
    const payload = action.payload as MiddlewareActionError;
    if (payload.type === MiddlewareActionErrorType.AxiosError) {
      if (payload.statusCode === 409 && payload.detail)
        store.dispatch(changeNotification({ text: payload.detail }));
      else store.dispatch(changeNotification({ text: 'Сервис находится на техническом обслуживании' }));
    }
  }

  return next(action);
};
