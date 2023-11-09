/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';
import type { UslugaPrice } from './types/types';
import './style/style.css';
import { deletePrice } from './uslugaPriceSlice';
import UpdateUslugaForm from './UpdateUslugaForm';
import AddOrderWindow from './AddOrderWindow';

export default function PriceItem({ price }: { price: UslugaPrice }): JSX.Element {
  const dispatch = useAppDispatch();
  const [flag, setFlag] = useState(false);
  const [window, setWindow] = useState(0);
  const [rega, setRega] = useState(false);
  const serviceAuth = useSelector((store: RootState) => store.auth.service);
  const userAuth = useSelector((store: RootState) => store.auth.user);
  const [plan, setPlan] = useState(false);

  const handleButtonClick = (): void => {
    setPlan(!plan);
  };

  const onHandleDelete = (): void => {
    dispatch(deletePrice(price.id));
  };
  const onHandleFlag = (): void => {
    setFlag((prev) => !prev);
  };

  const handleWindowChange = (newWindow: number): void => {
    setWindow(newWindow);
  };
  const handleButtonClickRega = (): void => {
    setRega(true);
  };

  const navigate = useNavigate();

  return (
    <div className="price-item">
      <h4 className="itemrow">
        <p className='itemName'> Вид услуги:</p>
        <p className='iteminfo'>{price.Usluga.title}</p>
        </h4>
      <h4 className="itemrow">
      <p className='itemName'> Марка: </p>
        <p className='iteminfo'>  {price.Mark.title}</p>
      </h4>
      <h4 className="itemrow">
      <p className='itemName'>Модель: </p>
        <p className='iteminfo'>{price.CarModel.title}</p>
         </h4>
      <h4 className="itemrow">
      <p className='itemName'> Цена:</p>
        <p className='iteminfo'> {price.cost} рублей</p>
       </h4>
      {serviceAuth && (
        <>
          <button
            className="btn"
            type="button"
            style={{ background: 'red' }}
            onClick={onHandleDelete}
          >
            Удалить услугу
          </button>
          <button className="btn" type="button" onClick={() => setFlag(!flag)}>
            Изменить услугу
          </button>
        </>
      )}
      {!serviceAuth && (
        <>
          {userAuth ? (
            <button className="btn" type="submit" onClick={handleButtonClick}>
              Записаться на услугу
            </button>
          ) : (
            <button className="btn" type="submit" onClick={handleButtonClickRega}>
              Записаться на услугу
            </button>
          )}
        </>
      )}
      {/* {userAuth ? (
      
      ) : (
     
      )} */}
      {rega === true && (
        <div className="zPlan">
          <div className="containerPay" style={{ color: 'black' }}>
            <button className='btn' onClick={() => navigate('/reg')} type="submit">
              Нажмите чтобы зарегистрироваться
            </button>
          </div>
        </div>
      )}
      {plan && <AddOrderWindow price={price} onClose={() => setPlan(false)} />}
      {flag && <UpdateUslugaForm price={price} onHandleFlag={onHandleFlag} />}
    </div>
  );
}
