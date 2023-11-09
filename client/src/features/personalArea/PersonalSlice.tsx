import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AuthState, Service } from '../LogReg/type';
import { fetchUpdatePhoto } from './api';

export const updatePhoto = createAsyncThunk('update/photo', (obj: Service) =>
  fetchUpdatePhoto(obj),
);

const initialState: AuthState = {
  user: undefined,
  service: undefined,
  error: null,
};

const personSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updatePhoto.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : null;
    });
  },
});

export default personSlice.reducer;
