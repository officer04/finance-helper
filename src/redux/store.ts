import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import notificationSlice from './notification/notificationSlice';
import { notificationMiddleware } from '../middlewares/notification-middleware';
import supportedLanguagesSlice from './supported-languages/supportedLanguagesSlice';
import expenseItemSlice from './expense-item/expenseItemSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
    supportedLanguages: supportedLanguagesSlice,
    expenseItem: expenseItemSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notificationMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
