/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import AuthSlice from '../features/LogReg/AuthSlice';
import servicesSlice from '../features/service/servicesSlice';
import newsSlice from '../features/news/newsSlice';
import uslugaSlice from '../features/usluga/uslugaSlice';
import uslugaPriceSlice from '../features/usluga/uslugaPriceSlice';
import salesSlice from '../features/sales/salesSlice';
import PersonalSlice from '../features/personalArea/PersonalSlice';

const store = configureStore({
  reducer: {
    servicesSlice,
    news: newsSlice,
    auth: AuthSlice,
    uslugas: uslugaSlice,
    prices: uslugaPriceSlice,
    sales: salesSlice,
    adminArea: PersonalSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
