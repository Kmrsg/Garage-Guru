import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

function PersonalAreaPerson(): JSX.Element {
  const [widt, setWidt] = useState(false);
  const user = useSelector((store: RootState) => store.auth.user);
  const order = useSelector((store: RootState) => store.uslugas.orders).find(
    (el) => el.user_id === user?.id,
  );
  const orders = order?.OrderItems;
  console.log(orders);

  return (
    <div>
      <div>Name: {user?.name}</div>
      <div>Email: {user?.email}</div>
      <div>Phone-number: {user?.phone}</div>
      <button
        type="submit"
        onClick={() => {
          setWidt(!widt);
        }}
      >
        Мои Записи
      </button>
      <div>
        Сортировка:{' '}
        <select>
          <option>Активные</option>
          <option>Неактивные</option>
        </select>
      </div>
      {widt && (
        <div style={{ color: 'white' }}>
          {order &&
            orders?.map((el) => (
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
  );
}

export default PersonalAreaPerson;
