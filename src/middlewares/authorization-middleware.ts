import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { MiddlewareActionError } from '../types/shared/middleware-action-error';
import { MiddlewareActionErrorType } from '../types/shared/middleware-action-error-type';
import { changeAuth } from '../redux/user/userSlice';
import { HttpStatusCode } from '../types/shared/http-status-code';

export const AuthorizationMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as MiddlewareActionError;
    if (payload.type === MiddlewareActionErrorType.AxiosError) {
      if (payload.statusCode === HttpStatusCode.UNAUTHORIZED) {
        store.dispatch(changeAuth(false));
        localStorage.removeItem('bearerToken');
      }
    }
  }

  return next(action);
};
