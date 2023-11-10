/* eslint-disable @typescript-eslint/default-param-last */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchCheckUser,
  fetchLogOut,
  fetchSignIn,
  fetchSignUp,
  fetchCheckService,
  fetchSignInService,
  fetchSignUpService,
} from './api/api';
import type { Auth2, Service, User } from './type';
import { fetchUpdatePhoto } from '../personalArea/api';
import { ServiceCard } from '../service/types/type';

const initialState: Auth2 = {
  user: undefined,
  service: undefined,
  error: null,
  loading: true,
};

// export const loadUsers = createAsyncThunk('users/load', () => api.fetchAnimals());

export const checkUser = createAsyncThunk('auth/check', () => fetchCheckUser());

export const checkService = createAsyncThunk('auth/check/service', () => fetchCheckService());

export const signUp = createAsyncThunk('auth/signup', (user: User) => fetchSignUp(user));

export const signIn = createAsyncThunk('auth/signin', (user: User) => fetchSignIn(user));
export const signInService = createAsyncThunk('auth/signin/service', (service: ServiceCard) =>
  fetchSignInService(service),
);
export const registrService = createAsyncThunk('auth/signup/service', (service: Service) =>
  fetchSignUpService(service),
);
export const updatePhoto = createAsyncThunk('update/photo', (obj: Service) =>
  fetchUpdatePhoto(obj),
);
export const logOut = createAsyncThunk('auth/logout', () => fetchLogOut());

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.user = action.payload.user;
      })
      .addCase(checkUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(checkService.fulfilled, (state, action) => {
        state.service = action.payload.service;
      })
      .addCase(checkService.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(checkService.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(registrService.fulfilled, (state, action) => {
        state.service = action.payload;
      })
      .addCase(registrService.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(registrService.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload.message === 'succes') {
          state.user = action.payload.user;
        } else {
          console.log(action.payload.message);
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInService.fulfilled, (state, action) => {
        if (action.payload.message === 'succes') {
          state.service = action.payload.service;
        } else {
          console.log(action.payload.message);
        }
      })
      .addCase(signInService.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(signInService.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.service = undefined;
        state.user = undefined;
        state.error = '';
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        if (state.service && state.service.img && state.service?.id === action.payload.service.id) {
          state.service.img = action.payload.service.img;
        } else {
          console.log(console.error);
        }
      });
  },
});

export const { stopLoading } = authSlice.actions;
export default authSlice.reducer;
