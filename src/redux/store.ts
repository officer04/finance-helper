import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import notificationSlice from './user/notificationSlice';
import { rtkQueryErrorLogger } from '../middlewares/error-middleware';

export const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
