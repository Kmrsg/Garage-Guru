import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { SalesState } from './types/State';
import * as api from './api/api';

const initialState: SalesState = {
  sales: [],
  error: null,
  loading: true,
  city: 'Санкт-Петербург',
};

export const loadSales = createAsyncThunk('sales/load', () => api.fetchSales());

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.loading = false;
    },
    chooseCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSales.fulfilled, (state, action) => {
        state.sales = action.payload;
      })
      .addCase(loadSales.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(loadSales.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { stopLoading, chooseCity } = salesSlice.actions;
export default salesSlice.reducer;
