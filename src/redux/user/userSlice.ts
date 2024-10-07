import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { axiosInstance } from '..';

interface CounterState {
  value: number;
}

interface userPropsLogin {
  email: string,
  password: string,
}

interface userPropsRegister extends userPropsLogin {
  firstName: string,
  lastName: string,
  preferredLocalizationCode: string
}

export const registerUser = createAsyncThunk('users/registerUser', async (body: userPropsRegister, thunkAPI) => {
  const response = await axiosInstance.post('/register', body);
  return response;
});

export const loginUser = createAsyncThunk('users/registerUser', async (body: userPropsLogin, thunkAPI) => {
  const response = await axiosInstance.post('/authorization/credentials', body);
  return response;
});

const initialState: CounterState = {
  value: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchUserById.fulfilled, (state, action) => {
    // })
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;
