/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import ServicesItemAdmin from './ServicesItemAdmin';
import './style.css';

function PersonalAreaAdmin(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
  const service = useSelector((store: RootState) => store.servicesSlice.services);
  const serviceAuth = useSelector((store: RootState) => store.auth.service);
  const [selectedOption, setSelectedOption] = useState('');
  const [emailPosik, setEmailPoisk] = useState('');

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const filteredServices = service.filter((el) => {
    if (selectedOption === 'Активированные аккаунты') {
      return el.isChecked === true && el.email.startsWith(emailPosik);
    }
    if (selectedOption === 'Неактивированные аккаунты') {
      return el.isChecked === false && el.email.startsWith(emailPosik);
    }
    return true;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id !== 1 && serviceAuth) {
      navigate('/');
    }
  }, []);

  return (
    <div className='adminPage'>
      <h1 className='adminh'>Личный кабинет администратора</h1>
      <select
   
        value={selectedOption}
        onChange={(event) => handleSelectChange(event)}
      >
        <option disabled value="">
          Сортировать аккаунты
        </option>
        <option>Активированные аккаунты</option>
        <option>Неактивированные аккаунты</option>
      </select>
      <input
   
        placeholder="Поиск сервиса по Email"
        value={emailPosik}
        onChange={(e) => setEmailPoisk(e.target.value)}
      />

      <div>
        {filteredServices.map((el) => (
          <ServicesItemAdmin servic={el} key={el.id} />
        ))}
      </div>
    </div>
  );
}

export default PersonalAreaAdmin;
