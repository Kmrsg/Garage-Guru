import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { UslugasState } from './types/types';
import * as api from './api';

const initialState: UslugasState = {
  uslugas: [],
  marks: [],
  orders: [],
  error: null,
  loading: true,
};

export const loadUslugas = createAsyncThunk('/uslugas/load', () => api.fetchUslugas());
export const loadMarks = createAsyncThunk('/marks/load', () => api.fetchMarks());
export const addOrder = createAsyncThunk(
  '/api/order',
  (obj: { user_id: number; service_id: number; data: string; uslugaPrice_id: number }) =>
    api.fetchOrderAdd(obj),
);
export const loadOrder = createAsyncThunk('/order/load', () => api.fetchOrdersLoad());
// export const loadOrders = createAsyncThunk('/orders/load', () => api.fetchOrdersLoad());

const uslugasSlice = createSlice({
  name: 'uslugas',
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(loadOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        if (!state.orders.find((order) => order.id === action.payload.id)) {
          state.orders.push(action.payload);
        } else {
          state.orders = state.orders.map((order) =>
            order.id === action.payload.id ? (order = action.payload) : order,
          );
        }
      })
      .addCase(loadUslugas.fulfilled, (state, action) => {
        state.uslugas = action.payload;
      })
      .addCase(loadUslugas.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(loadUslugas.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMarks.fulfilled, (state, action) => {
        state.marks = action.payload;
      })
      .addCase(loadMarks.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(loadMarks.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { stopLoading } = uslugasSlice.actions;
export default uslugasSlice.reducer;
