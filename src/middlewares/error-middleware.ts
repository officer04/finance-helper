import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { MiddlewareActionError } from '../types/middleware-action-error';
import { changeNotification } from '../redux/user/notificationSlice';
import { MiddlewareActionErrorType } from '../types/middleware-action-error-type';

export const rtkQueryErrorLogger: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as MiddlewareActionError;
    if (payload.type === MiddlewareActionErrorType.AxiosError) {
      if (payload.statusCode === 409 && payload.detail)
        store.dispatch(changeNotification({ type: 'erorr', text: payload.detail }));
      else store.dispatch(changeNotification({ type: 'erorr', text: 'Ошибка сервера' }));
    }
  }

  return next(action);
};
