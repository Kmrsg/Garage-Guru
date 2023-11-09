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
import type { AuthState, Service, User } from './type';
import { fetchUpdatePhoto } from '../personalArea/api';

const initialState: AuthState = {
  user: undefined,
  service: undefined,
  error: null,
};

export const checkUser = createAsyncThunk('auth/check', () => fetchCheckUser());

export const checkService = createAsyncThunk('auth/check/service', () => fetchCheckService());

export const signUp = createAsyncThunk('auth/signup', (user: User) => fetchSignUp(user));

export const signIn = createAsyncThunk('auth/signin', (user: User) => fetchSignIn(user));

export const signInService = createAsyncThunk('auth/signin/service', (service: Service) =>
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.user = action.payload.user;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })

      .addCase(checkService.fulfilled, (state, action) => {
        console.log(action.payload.service);
        state.service = action.payload.service;
      })
      .addCase(checkService.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })

      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })

      .addCase(registrService.fulfilled, (state, action) => {
        state.service = action.payload;
      })
      .addCase(registrService.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
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

      .addCase(signInService.fulfilled, (state, action) => {
        if (action.payload.message === 'succes') {
          console.log(action.payload.service);

          state.service = action.payload.service;
        } else {
          console.log(action.payload.message);
        }
      })
      .addCase(signInService.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })

      // .addCase(logOut.fulfilled, (state) => {
      //   state.service = undefined;
      //   state.user = undefined;
      // })
      // .addCase(logOut.rejected, (state, action) => {
      //   state.error = action.error.message ? action.error.message : null;
      // });
      .addCase(logOut.fulfilled, (state) => {
        state.service = undefined;
        state.user = undefined;
        state.error = '';
      })
      // .addCase(logOut.rejected, (state, action) => {
      //   state.error = action.error.message;
      // });
      .addCase(updatePhoto.fulfilled, (state, action) => {
        if (state.service && state.service?.id === action.payload.service.id) {
          state.service.img = action.payload.service.img;
        } else {
          console.log(console.error);
        }
      });
  },
});

export default authSlice.reducer;
