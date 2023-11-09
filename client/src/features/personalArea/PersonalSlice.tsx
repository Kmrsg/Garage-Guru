import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AuthState, OrderItem, Service } from '../LogReg/type';
import {
  fetchLoadOrder,
  fetchLoadOrderItems,
  // fetchUpdateItemStatus,
  fetchUpdatePhoto,
} from './api';
import type { OrderItemID } from './type';

export const updatePhoto = createAsyncThunk('update/photo', (obj: Service) =>
  fetchUpdatePhoto(obj),
);
// export const updateStatusOrderItem = createAsyncThunk('update/status', (id: OrderItemID) =>
//   fetchUpdateItemStatus(id),
// );
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
      })
      // .addCase(updateStatusOrderItem.fulfilled, (state, action) => {
      //   state.uslugas = state.uslugas.map((usluga) =>
      //     usluga.id === action.payload.uslugaPrice_id
      //       ? {
      //           ...usluga,
      //           OrderItems: usluga.OrderItems.map((el) =>
      //             el.id === action.payload.orderItem.id
      //               ? { ...el, isClosed: action.payload.orderItem.isClosed }
      //               : el,
      //           ),
      //         }
      //       : usluga,
      //   );
      //   console.log(action.payload);
      // });
    // .addCase(upStatusService.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   console.log(state.service);

    //   if (action.payload.message === 'success') {
    //     state.service = action.payload.service;
    //   }
    // })

    // .addCase(upStatusService.rejected, (state, action) => {
    //   state.error = action.error.message ? action.error.message : null;
    // });
  },
});

export default personSlice.reducer;
