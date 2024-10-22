import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import notificationSlice from './notification/notificationSlice';
import { NotificationMiddleware } from '../middlewares/notification-middleware';
import supportedLanguagesSlice from './supported-languages/supportedLanguagesSlice';
import expenseItemSlice from './expense-item/expenseItemSlice';
import { AuthorizationMiddleware } from '../middlewares/authorization-middleware';

export const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
    supportedLanguages: supportedLanguagesSlice,
    expenseItem: expenseItemSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(NotificationMiddleware, AuthorizationMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
