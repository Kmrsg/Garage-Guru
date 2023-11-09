/* eslint-disable no-return-assign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { UslugaPrice, UslugaPriceAdd, UslugaPriceState } from './types/types';
import * as api from './api';

const initialState: UslugaPriceState = {
  uslugasPrices: [],
  error: null,
  loading: true,
};

export const addUsluga = createAsyncThunk('usluga/add', (uslugaPrice: UslugaPriceAdd) =>
  api.fetchAddUslugas(uslugaPrice),
);
export const loadPrices = createAsyncThunk('load/uslugaPrice', () => api.fetchUslugasPrice());
export const deletePrice = createAsyncThunk('delete/uslugaPrice', (id: number) =>
  api.fetchUslugaPriceDelete(id),
);
export const updPrice = createAsyncThunk('update/uslugaPrice', (price: UslugaPrice) =>
  api.fetchUpdUslugas(price),
);

const uslugasPriceSlice = createSlice({
  name: 'uslugasPrice',
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUsluga.fulfilled, (state, action) => {
        state.uslugasPrices = [...state.uslugasPrices, action.payload];
      })
      .addCase(addUsluga.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(addUsluga.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPrices.fulfilled, (state, action) => {
        state.uslugasPrices = action.payload;
      })
      .addCase(loadPrices.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(loadPrices.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePrice.fulfilled, (state, action) => {
        state.uslugasPrices = state.uslugasPrices.filter((el) => el.id !== action.payload);
      })
      .addCase(deletePrice.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(deletePrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(updPrice.fulfilled, (state, action) => {
        state.uslugasPrices = state.uslugasPrices.map((el) =>
          el.id === action.payload.id ? (el = action.payload) : el,
        );
      })
      .addCase(updPrice.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(updPrice.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { stopLoading } = uslugasPriceSlice.actions;
export default uslugasPriceSlice.reducer;
