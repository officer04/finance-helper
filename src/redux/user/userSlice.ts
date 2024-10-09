import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosInstance } from '../index';
import { LoginUserProps } from '../../types/login-user-props';
import { RegisterUserProps } from '../../types/register-user-props';
import { UserResponse } from '../../types/user-response';

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (body: RegisterUserProps, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/register', body);
      return response.data as UserResponse;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'users/registerUser',
  async (body: LoginUserProps, thunkAPI) => {
    const response = await axiosInstance.post('/authorization/credentials', body);
    return response;
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
