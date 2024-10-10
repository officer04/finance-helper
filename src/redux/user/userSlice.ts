import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosInstance } from '../index';
import { RegisterUserBody } from '../../types/api/register/body';
import { RegisterUserResponse } from '../../types/api/register/response';
import { AuthorizationUserBody } from '../../types/api/authorization/body';
import { AuthorizationUserResponse } from '../../types/api/authorization/response';

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (body: RegisterUserBody, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/register', body);
      return response.data as RegisterUserResponse;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

export const authorizationUser = createAsyncThunk(
  'users/registerUser',
  async (body: AuthorizationUserBody, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/authorization/credentials', body);
      return response.data as AuthorizationUserResponse;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  isAuth: !!localStorage.getItem('bearerToken'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
