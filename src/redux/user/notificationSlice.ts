import { createSlice } from '@reduxjs/toolkit';
import { Notification } from '../../types/redux/notification/notification';

interface notificationState {
  notification: Notification;
}

const initialState: notificationState = {
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
