import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '..';
import { SupportedLanguageResponse } from '../../types/api/supported-languages/response';
import { SupportedLanguagesState } from '../../types/redux/supported-languages/supported-languages-state';


export const getSupportedLanguages = createAsyncThunk('users/getSupportedLanguages', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/supported-languages');
    return response.data as SupportedLanguageResponse;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error);
  }
});

const initialState: SupportedLanguagesState = {
  supportedLanguages: []
};



export const supportedLanguagesSlice = createSlice({
  name: 'supportedLanguages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSupportedLanguages.fulfilled, (state, action) => {
      state.supportedLanguages = action.payload.items
    });
  },
});

export const { } = supportedLanguagesSlice.actions;

export default supportedLanguagesSlice.reducer;
