import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AuthState, Service } from '../LogReg/type';
import {
  fetchLoadOrder,
  fetchLoadOrderItems,
  // fetchUpdateItemStatus,
  fetchUpdatePhoto,
} from './api';

export const updatePhoto = createAsyncThunk('update/photo', (obj: Service) =>
  fetchUpdatePhoto(obj),
);

export const loadUslugasOrder = createAsyncThunk('load/uslugaprice', () => fetchLoadOrder());

export const loadOrderItems = createAsyncThunk('load/orderItems', () => fetchLoadOrderItems());

const initialState: AuthState = {
  user: undefined,
  service: undefined,
  uslugas: [],
  orderItems: [],
  error: null,
};

const personSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePhoto.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(loadUslugasOrder.fulfilled, (state, action) => {
        state.uslugas = action.payload;
      })
      .addCase(loadOrderItems.fulfilled, (state, action) => {
        state.orderItems = action.payload;
      });
  },
});

export default personSlice.reducer;
