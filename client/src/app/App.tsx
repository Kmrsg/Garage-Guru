/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from '../features/LogReg/RegistrUser';
import { checkService, checkUser } from '../features/LogReg/AuthSlice';
import { loadServices } from '../features/service/servicesSlice';
import MainPage from '../features/main/MainPage';
import NavBar from '../features/Navbar/NavBar';
import ServicesPage from '../features/service/ServicesPage';
import type { RootState } from '../redux/store';
import PersonalArea from '../features/personalArea/PersonalArea';
import PersonalAreaAdmin from '../features/personalArea/PersonalAreaAdmin';
import NewsBlock from '../features/news/NewsBlock';
import { loadPosts } from '../features/news/newsSlice';
import ServicePage from '../features/service/ServicePage';
import NewsPostPage from '../features/news/NewsPostPage';
import { useAppDispatch } from '../redux/store';
import { loadMarks, loadOrder, loadUslugas, stopLoading } from '../features/usluga/uslugaSlice';
import { loadPrices } from '../features/usluga/uslugaPriceSlice';
import { loadSales } from '../features/sales/salesSlice';
import SalesPage from '../features/sales/SalesPage';
import PersonalAreaPerson from '../features/personalArea/PersonalAreaPerson';
import ErrorPage from '../features/404/404';
import { loadOrderItems, loadUslugasOrder } from '../features/personalArea/PersonalSlice';
// import spinner from '../assets/Spinner-1s-200px.svg';

function App(): JSX.Element {
  const [isPageClickable, setIsPageClickable] = useState(false);
  const dispatch = useAppDispatch();
  const service = useSelector((store: RootState) => store.auth.service);
  const user = useSelector((store: RootState) => store.auth.user);
  const navigate = useNavigate();
  // useEffect(() => {
  //   // setTimeout(() => dispatch(stopLoading()), 100);
  // }, []);

  useEffect(() => {
    if (user || service) {
      navigate('/');
    }
    dispatch(checkService());
    dispatch(checkUser());
    dispatch(loadServices());
    dispatch(loadPosts());
    dispatch(loadUslugasOrder());
    dispatch(loadUslugas());
    dispatch(loadMarks());
    dispatch(loadPrices());
    dispatch(loadSales());
    dispatch(loadOrder());
    dispatch(loadOrderItems());
    setTimeout(() => dispatch(stopLoading()), 1000);
  }, []);

  useEffect(() => {
    if (service?.isChecked === false) {
      setIsPageClickable(false);
    }
  }, [service?.isChecked]);

  return (
    <div id="huge" className={`App ${isPageClickable ? '' : 'unclickable'}`}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/reg" element={<SignIn />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceId" element={<ServicePage />} />
          <Route path="/news" element={<NewsBlock />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/personalArea" element={<PersonalArea />} />
          <Route path="/personalArea/admin" element={<PersonalAreaAdmin />} />
          <Route path="/personalArea/person" element={<PersonalAreaPerson />} />
          <Route path="/news/:postId" element={<NewsPostPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
