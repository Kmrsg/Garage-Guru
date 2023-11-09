/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import ServicesItemAdmin from './ServicesItemAdmin';

function PersonalAreaAdmin(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
  const service = useSelector((store: RootState) => store.servicesSlice.services);
  const serviceAuth = useSelector((store: RootState) => store.auth.service);
  const [selectedOption, setSelectedOption] = useState('');
  const [emailPosik, setEmailPoisk] = useState('');

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
    <div>
      <select
        style={{
          height: '40px',
          width: '300px',
          backgroundColor: 'white',
          color: 'black',
          marginBottom: '20px',
          borderRadius: '7px',
        }}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option disabled value="">
          Сортировать аккаунты
        </option>
        <option>Активированные аккаунты</option>
        <option>Неактивированные аккаунты</option>
      </select>
      <input
        style={{
          height: '40px',
          width: '300px',
          backgroundColor: 'white',
          color: 'black',
          marginBottom: '20px',
          borderRadius: '7px',
        }}
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
