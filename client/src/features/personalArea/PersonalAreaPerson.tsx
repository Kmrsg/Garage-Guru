/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import pic from '../../images/10.png';

function PersonalAreaPerson(): JSX.Element {
  const [widt, setWidt] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const user = useSelector((store: RootState) => store.auth.user);

  const order = useSelector((store: RootState) => store.uslugas.orders).find(
    (el) => el.user_id === user?.id,
  );
  const orders = order?.OrderItems;
  const filteredOrder = order?.OrderItems.filter((el) => {
    if (selectedOption === 'Активные') {
      return el.isClosed === true;
    }
    if (selectedOption === 'Архивные') {
      return el.isClosed === false;
    }
    return true;
  });

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div
      style={{
        color: 'white',
        marginLeft: '-1vw',
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '-50vw',
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

<!--     <div>
      <div>Name: {user?.name}</div>
      <div>Email: {user?.email}</div>
      <div>Phone-number: {user?.phone}</div>
      <button className='btn'
        type="submit"
        onClick={() => {
          setWidt(!widt);
        }}
      >
        Мои записи
      </button>
      <div className='itemName'>
        Сортировка:{' '}
        <select>
          <option>Активные</option>
          <option>Неактивные</option>
        </select>
        
          <img className="carpic" src={pic} alt="pic" />
      </div> -->
<!--       {widt && (
        <div className='ordercont'> -->
<!--           {order &&
            orders?.map((el) => (
              <div>
                 <div className='itemrow'>
                <div className='itemName'>Дата записи:</div>
                <div className='iteminfo'> {el.date.slice(0, 10)}</div>
                </div>
                <div className='itemrow'>
                <div className='itemName'>Услуга:</div>
                <div className='iteminfo'>{el.UslugaPrice.Usluga.title}</div>
                </div>
                
                <div className='itemrow'>
                <div className='itemName'>Марка авто:</div>
                <div className='iteminfo'>{el.UslugaPrice.Mark.title}</div>
                </div>
                <div className='itemrow'>
                <div className='itemName'>Модель:</div>
                <div className='iteminfo'>{el.UslugaPrice.CarModel.title}</div>
                   
                </div>
                <div className='itemrow'>
                <div className='itemName'>Цена:</div>
                <div className='iteminfo'>{el.UslugaPrice.cost}р</div>
                </div>
              </div>
            ))} -->
<!--         </div>
      )} -->
    </div>
  );
}

export default PersonalAreaPerson;
