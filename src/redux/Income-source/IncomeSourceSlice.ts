import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '..';
import { incomeSourceState } from '../../types/redux/income-source/income-source-state';
import { GetIncomeSourceResponse } from '../../types/api/income-source/get-all/response';
import { CreateIncomeSourceResponse } from '../../types/api/income-source/create/response';
import { CreateIncomeSourceBody } from '../../types/api/income-source/create/body';

export const getIncomeSource = createAsyncThunk(
  'incomeSource/getIncomeSource',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/income-source/my');
      return response.data as GetIncomeSourceResponse;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

export const createIncomeSource = createAsyncThunk(
  'incomeSource/createIncomeSource',
  async (body: CreateIncomeSourceBody, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/income-source/create', body);
      return response.data as CreateIncomeSourceResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: incomeSourceState = {
  incomeSourceItems: [],
  loadStatus: 'loading',
};

export const incomeSourceSlice = createSlice({
  name: 'incomeSource',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIncomeSource.fulfilled, (state, action) => {
      state.incomeSourceItems = action.payload.items;
      state.loadStatus = 'success';
    });
  },
});

export const {} = incomeSourceSlice.actions;

export default incomeSourceSlice.reducer;
