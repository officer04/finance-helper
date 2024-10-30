import { configureStore } from '@reduxjs/toolkit';

import userSlice from './user/userSlice';
import notificationSlice from './notification/notificationSlice';
import supportedLanguagesSlice from './supported-languages/supportedLanguagesSlice';
import expenseItemSlice from './expense-item/expenseItemSlice';
import  expenseItemTypeSlice  from './expense-item-type/expenseItemTypeSlice';

import { NotificationMiddleware } from '../middlewares/notification-middleware';
import { AuthorizationMiddleware } from '../middlewares/authorization-middleware';
import { LoggingMiddleware } from '../middlewares/logging-middleware';

export const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
    supportedLanguages: supportedLanguagesSlice,
    expenseItem: expenseItemSlice,
    expenseItemType: expenseItemTypeSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(NotificationMiddleware, AuthorizationMiddleware, LoggingMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
