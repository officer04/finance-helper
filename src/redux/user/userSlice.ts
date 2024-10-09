import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosInstance } from '../index';
import { UserRegisterProps } from '../../types/api/user/register/user-register-props';
import { UserRegisterResponse } from '../../types/api/user/register/user-register-response';
import { UserLoginProps } from '../../types/api/user/login/user-login-props';
import { UserLoginResponse } from '../../types/api/user/login/user-login-response';

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (body: UserRegisterProps, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/register', body);
      return response.data as UserRegisterResponse;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'users/registerUser',
  async (body: UserLoginProps, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/authorization/credentials', body);
      return response.data as UserLoginResponse;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

const initialState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
