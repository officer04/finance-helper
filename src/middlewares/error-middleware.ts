import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { MiddlewareActionError } from '../types/shared/middleware-action-error';
import { changeNotification } from '../redux/user/notificationSlice';
import { MiddlewareActionErrorType } from '../types/shared/middleware-action-error-type';
import { useTranslation } from 'react-i18next';

export const rtkQueryErrorLogger: Middleware = (store) => (next) => (action) => {
  const { t, i18n } = useTranslation();

  if (isRejectedWithValue(action)) {
    const payload = action.payload as MiddlewareActionError;
    if (payload.type === MiddlewareActionErrorType.AxiosError) {
      if (payload.statusCode === 409 && payload.detail)
        store.dispatch(changeNotification({ text: payload.detail }));
      else store.dispatch(changeNotification({ text: 'Ошибка сервера' }));
    }
  }

  return next(action);
};
