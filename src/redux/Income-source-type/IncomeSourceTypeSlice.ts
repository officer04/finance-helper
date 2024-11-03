import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '..';
import { IncomeSourceTypeResponse } from '../../types/api/income-source-type/response';
import { IncomeSourceTypeState } from '../../types/redux/income-source-type/income-source-type-state';
export const getIncomeSourceType = createAsyncThunk(
  'incomeSourceType/getIncomeSourceType',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/income-source-type');
      return response.data as IncomeSourceTypeResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: IncomeSourceTypeState = {
  incomeSourceType: [],
};

export const incomeSourceTypeSlice = createSlice({
  name: 'incomeSourceType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIncomeSourceType.fulfilled, (state, action) => {
      state.incomeSourceType = action.payload.items;
    });
  },
});

export const {} = incomeSourceTypeSlice.actions;

export default incomeSourceTypeSlice.reducer;
