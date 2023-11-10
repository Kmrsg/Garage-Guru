/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './style/style.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { UslugaPrice } from './types/types';
import type { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';
import { addOrder } from './uslugaSlice';

function AddOrderWindow({
  onClose,
  price,
  tachka,
}: {
  onClose: (falue: boolean) => void;
  price: UslugaPrice;
  tachka: UslugaPrice;
}): JSX.Element {
  const [dateTimeValue, setDateTimeValue] = useState('');
  const authUser = useSelector((store: RootState) => store.auth.user);

  const dispatch = useAppDispatch();

  const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDateTimeValue(event.target.value);
  };
  const uslovie =
    tachka &&
    tachka.filter(
      (el) =>
        el.CarModel.title === price.CarModel?.title &&
        el.Mark?.title === price.Mark?.title &&
        el.Usluga?.title === price.Usluga?.title,
    );

  console.log(tachka);

  const handlePaymentClick = (): void => {
    if (authUser) {
      // console.log(authUser.id);

      dispatch(
        addOrder({
          user_id: authUser.id!,
          service_id: price.service_id,
          data: dateTimeValue,
          uslugaPrice_id: price.id,
        }),
      );
      onClose(true);
    }
  };
  const navigate = useNavigate();
  //   { price }: { price: UslugaPrice })
  return (
    <div id="zPlan">
      <div className="containerPay" style={{ color: 'black', fontSize: '20px' }}>
        <button type="button" onClick={(prev) => onClose(!prev)}>
          X
        </button>
        <div className="itemrow">
          <p className="itemName"> Вид услуги:</p>
          <p className="iteminfo">{price.Usluga.title}</p>
        </div>
        <div className="itemrow">
          <p className="itemName"> Марка Автомобиля:</p>
          <p className="iteminfo"> {price.Mark.title}</p>
        </div>
        <div className="itemrow">
          <p className="itemName"> Модель Автомобиля:</p>
          <p className="iteminfo">{price.CarModel.title}</p>
        </div>
        <div className="itemrow">
          <p className="itemName"> Цена:</p>
          <p className="iteminfo">{price.cost} руб</p>
        </div>
        <div className="itemrow">
          <p className="itemName"> Услуга:</p>
          <p className="iteminfo">{price.Usluga.title}</p>
        </div>
        <div className="itemrow" style={{ display: 'flex', flexDirection: 'row' }}>
          Выберите дату:
          <input
            style={{ width: '100%', fontSize: '1rem' }}
            type="datetime-local"
            id="myDateTime"
            value={dateTimeValue}
            onChange={(event) => handleDateTimeChange(event)}
          />
        </div>
        <h5 style={{ color: 'white' }}>Сервис ответит или перезвонит вам в течение дня</h5>
        <button className="btn" type="submit" onClick={handlePaymentClick}>
          Отправить запрос
        </button>
        <div>
          Сервисы в которых дешевле:
          {uslovie &&
            uslovie.map((el) => (
              <div className="containerPay" style={{ color: 'white', marginBottom: '10px' }}>
                <div>
                  Марка: {el.Mark.title}, модель:{el.CarModel.title}
                </div>
                <div>Услуга: {el.Usluga.title}</div>
                <div>Цена: {el.cost}руб.</div>
                <button type="submit" onClick={() => navigate(`/services/${el.service_id}`)}>
                  Перейти на страницу Сервиса
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AddOrderWindow;
