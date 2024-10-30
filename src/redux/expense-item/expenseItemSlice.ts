import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '..';
import { ExpenseItemState } from '../../types/redux/expense-Item/expense-Item-state';
import { GetExpenseItemResponse } from '../../types/api/expense-item/get-all/response';
import { UpdateExpenseItemBody } from '../../types/api/expense-item/update/body';
import { UpdateExpenseItemResponse } from '../../types/api/expense-item/update/response';
import { CreateExpenseItemBody } from '../../types/api/expense-item/create/body';
import { CreateExpenseItemResponse } from '../../types/api/expense-item/create/response';


export const createExpenseItem = createAsyncThunk(
  'expenseItem/createExpenseItem',
  async (body: CreateExpenseItemBody, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/expense-item/create', body);
      return response.data as CreateExpenseItemResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateExpenseItem = createAsyncThunk(
  'expenseItem/updateExpenseItem',
  async (request: UpdateExpenseItemBody, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/expense-item/${request.id}`, request.body);
      return response.data as UpdateExpenseItemResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteExpenseItem = createAsyncThunk(
  'expenseItem/deleteExpenseItem',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/expense-item/${id}`);
      return response.data;
    } catch (error) {
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
  reducers: {
    deleteExpenseItem: (state, action) => {
      state.expenseItems = state.expenseItems.filter((item) => item.id !== action.payload);
    }
  },
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

export const { deleteExpenseItem: changeExpenseItems } = expenseItemSlice.actions;

export default expenseItemSlice.reducer;
