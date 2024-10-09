import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import notificationSlice from './user/notificationSlice';
import { notificationMiddleware } from '../middlewares/notification-middleware';

export const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notificationMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
