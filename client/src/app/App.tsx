/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
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
import { loadMarks, loadUslugas } from '../features/usluga/uslugaSlice';
import { loadPrices } from '../features/usluga/uslugaPriceSlice';
import { loadSales } from '../features/sales/salesSlice';
import SalesPage from '../features/sales/SalesPage';
import Footer from '../features/footer/Footer';
import PersonalAreaPerson from '../features/personalArea/PersonalAreaPerson';

function App(): JSX.Element {
  const [isPageClickable, setIsPageClickable] = useState(false);
  const dispatch = useAppDispatch();
  const service = useSelector((store: RootState) => store.auth.service);

  useEffect(() => {
    dispatch(loadServices());
    dispatch(loadPosts());
    dispatch(checkService());
  }, []);

  useEffect(() => {
    dispatch(checkUser());
    dispatch(loadUslugas());
    dispatch(loadMarks());
    dispatch(loadPrices());
    dispatch(loadSales());
  }, []);

  useEffect(() => {
    if (service?.isChecked === false) {
      setIsPageClickable(false);
    }
  }, [service?.isChecked]);

  return (
    <div id='huge' className={`App ${isPageClickable ? '' : 'unclickable'}`}>
      {/* {isPageClickable == false && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '0vh', // Задайте желаемую высоту, чтобы текст был посередине
          }}
        >
          <h1>Pдравствуйте, {service?.title}, ваша учетная пока не активна</h1>
        </div>
      )} */}
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/reg" element={<SignIn />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceId" element={<ServicePage />} />
          <Route path="/news" element={<NewsBlock />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/personalArea" element={<PersonalArea />} />
          <Route path="/personalArea/admin" element={<PersonalAreaAdmin />} />
          <Route path="/personalArea/person" element={<PersonalAreaPerson />} />
          <Route path="/news/:postId" element={<NewsPostPage />} />
       
        </Route>
       

      </Routes>
      <Footer />
    </div>
    
  );
}

export default App;
