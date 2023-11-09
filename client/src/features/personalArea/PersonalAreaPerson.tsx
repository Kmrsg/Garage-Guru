/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

function PersonalAreaPerson(): JSX.Element {
  const [widt, setWidt] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const user = useSelector((store: RootState) => store.auth.user);

  const order = useSelector((store: RootState) => store.uslugas.orders).find(
    (el) => el.user_id === user?.id,
  );
  // const orders = order?.OrderItems;
  const filteredOrder = order?.OrderItems.filter((el) => {
    if (selectedOption === 'Активные') {
      return el.isClosed === true;
    }
    if (selectedOption === 'Архивные') {
      return el.isClosed === false;
    }
    return true;
  });

  const handleSelectChange = (event): void => {
    setSelectedOption(event.target.value);
  };

  return (
    <div
      style={{
        color: 'white',
        marginLeft: '-50vw',
        display: 'flex',
        flexDirection: 'row',
        // marginLeft: '-50vw',
        // position: 'absolute',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: 'white', display: 'flex' }}>Личный аккаунт</h1>
        <img
          style={{
            backgroundColor: 'white',
            width: '20vh',
          }}
          src="https://cdn.icon-icons.com/icons2/1993/PNG/512/account_avatar_face_man_people_profile_user_icon_123197.png"
          alt="p"
        />
        <div style={{ fontSize: '2vh' }}>Name: {user?.name}</div>
        <div style={{ fontSize: '2vh' }}>Email: {user?.email}</div>
        <div style={{ fontSize: '2vh' }}>Phone-number: {user?.phone}</div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '40vw',
          position: 'absolute',
        }}
      >
        <button
          style={{ width: '30vw' }}
          type="submit"
          onClick={() => {
            setWidt(!widt);
          }}
        >
          Мои Записи
        </button>

        {widt && (
          <div style={{ color: 'white' }}>
            <div>
              Сортировка:
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
                onChange={(event) => handleSelectChange(event)}
              >
                <option disabled value="">
                  Сортировать заявки
                </option>
                <option>Активные</option>
                <option>Архивные</option>
              </select>
            </div>
            {order &&
              filteredOrder?.map((el) => (
                <div style={{ backgroundColor: 'white', marginBottom: '20px', color: 'black' }}>
                  <div>Дата записи: {el.date.slice(0, 10)}</div>
                  <div>Услуга: {el.UslugaPrice.Usluga.title}</div>
                  <div>
                    Марка авто: {el.UslugaPrice.Mark.title}, модель: {el.UslugaPrice.CarModel.title}
                  </div>
                  <div>Цена: {el.UslugaPrice.cost}р.</div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalAreaPerson;
