import { createSlice } from '@reduxjs/toolkit';
import { NotificationState } from '../../types/redux/notification/notification-state';

const initialState: NotificationState = {
  notification: { text: '' },
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification: (state, { payload }) => {
      state.notification = payload;
    },
  },
});

export const { changeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
