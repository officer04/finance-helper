import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosInstance } from '../index';
import { RegisterUserProps } from '../../types/api/user/register/register-user-props';
import { RegisterUserResponse } from '../../types/api/user/register/register-user-response';
import { LoginUserProps } from '../../types/api/user/login/login-user-props';
import { LoginUserResponse } from '../../types/api/user/login/login-user-response';

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (body: RegisterUserProps, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/register', body);
      return response.data as RegisterUserResponse;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'users/registerUser',
  async (body: LoginUserProps, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/authorization/credentials', body);
      return response.data as LoginUserResponse;
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
