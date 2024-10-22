import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '..';
import { ExpenseItemState } from '../../types/redux/expense-Item/expense-Item-state';
import { CreateExpenseItemResponse } from '../../types/api/expense-item/create/response';
import { CreateExpenseItemBody } from '../../types/api/expense-item/create/body';
import { TypeExpenseItemResponse } from '../../types/api/expense-item/get-type/response';
import { GetExpenseItemResponse } from '../../types/api/expense-item/get-all/response';

export const getExpenseItemType = createAsyncThunk(
  'expenseItem/getExpenseItemType',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/expense-item-type');
      return response.data as TypeExpenseItemResponse;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

export const createExpenseItem = createAsyncThunk(
  'expenseItem/createExpenseItem',
  async (body: CreateExpenseItemBody, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/expense-item/create', body);
      return response.data as CreateExpenseItemResponse;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

export const getExpenseItem = createAsyncThunk(
  'expenseItem/getExpenseItem',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/expense-item/my');
      return response.data as GetExpenseItemResponse;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

const initialState: ExpenseItemState = {
  expenseItems: [],
  loadStatus: 'loading',
};

export const expenseItemSlice = createSlice({
  name: 'expenseItem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpenseItem.fulfilled, (state, action) => {
      state.expenseItems = action.payload.items;
      state.loadStatus = 'success';
    });
    builder.addCase(getExpenseItem.pending, (state) => {
      state.loadStatus = 'loading';
    });
  },
});

export const {} = expenseItemSlice.actions;

export default expenseItemSlice.reducer;
