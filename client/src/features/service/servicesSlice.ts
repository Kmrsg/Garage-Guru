/* eslint-disable no-return-assign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Sale, SaleId, ServicesState } from './types/type';
import * as api from './api/api';

const initialState: ServicesState = {
  services: [],
  error: null,
  loading: true,
};

export const loadServices = createAsyncThunk('services/load', () => api.fetchServices());
export const addSales = createAsyncThunk('services/sales/add', (sale: Sale) =>
  api.fetchAddSale(sale),
);
export const deleteSale = createAsyncThunk('services/sales/delete', (saleId: SaleId) =>
  api.fetchDeleteSale(saleId),
);
export const updateSale = createAsyncThunk('services/sales/upd', (sale: Sale) =>
  api.fetchUpdSale(sale),
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadServices.fulfilled, (state, action) => {
        state.services = action.payload;
      })
      .addCase(loadServices.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(loadServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSales.fulfilled, (state, action) => {
        state.services.forEach((service) =>
          service.id === action.payload.service_id ? service.Sales.push(action.payload) : service,
        );
      })
      .addCase(addSales.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(addSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.services.forEach((service) =>
          service.id === action.payload.service_id
            ? (service.Sales = service.Sales.filter((sale) => sale.id !== action.payload.saleId))
            : service,
        );
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(deleteSale.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSale.fulfilled, (state, action) => {
        state.services.forEach((service) =>
          service.id === action.payload.service_id
            ? (service.Sales = service.Sales.map((sale) =>
                sale.id === action.payload.id ? (sale = action.payload) : sale,
              ))
            : service,
        );
      });
  },
});
export const { stopLoading } = servicesSlice.actions;
export default servicesSlice.reducer;
