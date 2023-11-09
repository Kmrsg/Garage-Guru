import React, { useState } from 'react';
import './style/style.css';
import { useSelector } from 'react-redux';
import type { UslugaPrice } from './types/types';
import type { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';
import { addOrder } from './uslugaSlice';

function AddOrderWindow({
  onClose,
  price,
}: {
  onClose: (falue: boolean) => void;
  price: UslugaPrice;
}): JSX.Element {
  const [dateTimeValue, setDateTimeValue] = useState('');
  const authUser = useSelector((store: RootState) => store.auth.user);
  // console.log(authUser);

  const dispatch = useAppDispatch();
  // console.log(console.log(authUser));

  const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDateTimeValue(event.target.value);
  };
  // console.log(authUser?.id, price.service_id, dateTimeValue, price.id);

  const handlePaymentClick = (): void => {
    if (authUser) {
      // console.log(authUser.id);

      dispatch(
        addOrder({
          user_id: authUser.id,
          service_id: price.service_id,
          data: dateTimeValue,
          uslugaPrice_id: price.id,
        }),
      );
      onClose(true);
    }
  };
  //   { price }: { price: UslugaPrice })
  return (
    <div id="zPlan">
      <div className="containerPay" style={{ color: 'black', fontSize: '20px' }}>
        <div>Вид Услуги: {price.Usluga.title} </div>
        <div>Марка Автомобиля: {price.Mark.title} </div>
        <div>Модель Автомобиля: {price.CarModel.title} </div>
        <div>Цена: {price.cost} руб.</div>
        <div>Услуга: </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          Выберите дату:
          <input
            style={{ width: '100%', fontSize: '1rem' }}
            type="datetime-local"
            id="myDateTime"
            value={dateTimeValue}
            onChange={(event) => handleDateTimeChange(event)}
          />
        </div>
        <h5>Сервис ответит или перезвонит вам в течение дня</h5>{' '}
        <button type="submit" onClick={handlePaymentClick}>
          Отправить запрос
        </button>
      </div>
    </div>
  );
}

export default AddOrderWindow;
