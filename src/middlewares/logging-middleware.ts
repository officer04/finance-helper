import type { Middleware } from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';

export const LoggingMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejected(action)) console.error(action);
  return next(action);
};
