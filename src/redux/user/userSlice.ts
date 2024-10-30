import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosInstance } from '../index';
import { RegisterUserBody } from '../../types/api/register/body';
import { RegisterUserResponse } from '../../types/api/register/response';
import { AuthorizationUserBody } from '../../types/api/authorization/body';
import { AuthorizationUserResponse } from '../../types/api/authorization/response';
import { UserMeResponse } from '../../types/api/user/get-me/response';
import { UpdateUserMeBody } from '../../types/api/user/update-me/body';
import { UpdateUserMeResponse } from '../../types/api/user/update-me/response';
import { UserState } from '../../types/redux/user/user-state';

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (body: RegisterUserBody, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/register', body);
      return response.data as RegisterUserResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const authorizationUser = createAsyncThunk(
  'users/authorizationUser',
  async (body: AuthorizationUserBody, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/authorization/credentials', body);
      return response.data as AuthorizationUserResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getUserMe = createAsyncThunk('users/getUserMe', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/user/me');
    return response.data as UserMeResponse;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateUserMe = createAsyncThunk(
  'users/updateUserMe',
  async (body: UpdateUserMeBody, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/user/me', body);
      return response.data as UpdateUserMeResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: UserState = {
  isAuth: !!localStorage.getItem('bearerToken'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeAuth: (state, { payload }) => {
      state.isAuth = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authorizationUser.fulfilled, (state) => {
      state.isAuth = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isAuth = true;
    });
  },
});

export const { changeAuth } = userSlice.actions;

export default userSlice.reducer;
