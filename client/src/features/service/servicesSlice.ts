import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { CommentData, Sale, SaleId, ServicesState } from './types/type';
import * as api from './api/api';
import { fetchDeleteOne, fetchUpdateItemStatus, fetchUpdateStatus } from '../personalArea/api';
import type { UpdateStatus } from '../personalArea/type';

const initialState: ServicesState = {
  services: [],
  error: null,
  loading: true,
  city: 'Санкт-Петербург',
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

export const upStatusService = createAsyncThunk('update/status/service', (id: number) =>
  fetchUpdateStatus(id),
);
export const deleteOneService = createAsyncThunk('service/delete', (id: number) =>
  fetchDeleteOne(id),
);
export const addComments = createAsyncThunk('comments/add', (comment: CommentData) =>
  api.fetchAddComments(comment),
);
export const deleteComment = createAsyncThunk('comments/delete', (id: number) =>
  api.fetchDeleteComments(id),
);
export const updateStatusOrderItem = createAsyncThunk('update/status', (obj: UpdateStatus) =>
  fetchUpdateItemStatus(obj),
);

const servicesSlice = createSlice({
  name: 'services',
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
      })
      .addCase(upStatusService.fulfilled, (state, action) => {
        if (action.payload.message === 'success') {
          state.services = state.services.map((el) =>
            el.id === action.payload.service.id
              ? { ...el, isChecked: action.payload.service.isChecked }
              : el,
          );
        }
      })
      .addCase(upStatusService.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(deleteOneService.fulfilled, (state, action) => {
        state.services = state.services.filter((el) => el.id !== action.payload.id);
      })
      .addCase(addComments.fulfilled, (state, action) => {
        console.log(action.payload);

        if (!action.payload.rate) {
          state.services.forEach((service) =>
            service.id === action.payload.comment.service_id
              ? (service.Comments = [...service.Comments, action.payload.comment])
              : service,
          );
        } else {
          state.services = state.services.map((service) =>
            service.id === action.payload.comment.service_id
              ? { ...service, Comments: [...service.Comments, action.payload.comment] }
              : service,
          );
          state.services = state.services.map((service) =>
            service.id === action.payload.comment.service_id
              ? { ...service, Rates: [...service.Rates, action.payload.rate] }
              : service,
          );
        }
      })
      .addCase(addComments.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(addComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.services = state.services.map((service) =>
          service.id === action.payload.service_id
            ? {
                ...service,
                Comments: service.Comments.filter(
                  (comment) => comment.id !== action.payload.comment_id,
                ),
              }
            : service,
        );
        state.services = state.services.map((service) =>
          service.id === action.payload.service_id
            ? {
                ...service,
                Rates: service.Rates.filter((rate) => rate.id !== action.payload.rate_id),
              }
            : service,
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateStatusOrderItem.fulfilled, (state, action) => {
        state.services = state.services.map((service) =>
          service.UslugaPrices.filter(
            (uslugaPrice) => uslugaPrice.id === action.payload.uslugaPrice_id,
          ).length > 0
            ? {
                ...service,
                UslugaPrices: service.UslugaPrices.map((usluga) => ({
                  ...usluga,
                  OrderItems: usluga.OrderItems.map((order) =>
                    order.id === action.payload.orderItem.id
                      ? { ...order, isClosed: action.payload.orderItem.isClosed }
                      : order,
                  ),
                })),
              }
            : service,
        );
      });
  },
});
export const { stopLoading, chooseCity } = servicesSlice.actions;
export default servicesSlice.reducer;
