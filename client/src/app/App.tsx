/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import ModalQuest from '../features/modalka/ModalQuest';
// import NavBar from '../features/NavBar';
import MainPage from '../features/main/MainPage';
import { useAppDispatch } from '../redux/store';
import * as api from './api';
import ErrorWindow from '../404/ErrorWindow';
import LogReg from '../features/LogReg/LogReg';
import NavBar from '../features/Navbar/NavBar';
import type { User } from '../redux/type';
import { fetchUser } from '../features/LogReg/api/api';
import type { Data } from '../features/LogReg/types';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user: User = useSelector((store: RootState): User => store.user.user);
  console.log(user);

  useEffect(() => {
    api.fetchThemes().then((data) => dispatch({ type: 'themes/load', payload: data }));
    api.fetchQuestions().then((data) => dispatch({ type: 'question/load', payload: data }));
    fetchUser().then((data: Data) =>
      data.message === 'success'
        ? dispatch({ type: 'user/get', payload: { user: data.user } })
        : console.log(data.message),
    );
  }, []);
  console.log(user);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/game" element={<MainPage />} />
          <Route path="/" element={<LogReg />} />
        </Route>
        <Route path="*" element={<ErrorWindow />} />
      </Routes>
    </div>
  );
}

export default App;
