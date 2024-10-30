import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '..';
import { ExpenseItemTypeState } from '../../types/redux/expense-item-type/expense-Item-type-state';
import { ExpenseItemTypeResponse } from '../../types/api/expense-item-type/response';

export const getExpenseItemType = createAsyncThunk(
  'expenseItem/getExpenseItemType',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/expense-item-type');
      return response.data as ExpenseItemTypeResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: ExpenseItemTypeState = {
  expenseItemType: []
};

export const expenseItemTypeSlice = createSlice({
  name: 'expenseItemType',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getExpenseItemType.fulfilled, (state, action) => {
      state.expenseItemType = action.payload.items;
    });
  },
});

export const {  } = expenseItemTypeSlice.actions;

export default expenseItemTypeSlice.reducer;
