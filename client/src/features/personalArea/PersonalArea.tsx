/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, type RootState } from '../../redux/store';
import Calendarr from './Calendar';
import { updatePhoto } from '../LogReg/AuthSlice';
import type { UpdateStatus } from './type';
import { updateStatusOrderItem } from '../service/servicesSlice';

function PersonalArea(): JSX.Element {
  const [photo, setPhoto] = useState(true);
  const [widt, setWidt] = useState(false);
  const dispatch = useAppDispatch();
  const service = useSelector((store: RootState) => store.auth.service);
  const [img, setImg] = useState(service?.img);
  const [selectedOption, setSelectedOption] = useState(false);
  const asd = useSelector((store: RootState) => store.servicesSlice.services).find(
    (servs) => servs.id === service?.id,
  );
  const uslugaPrice = asd?.UslugaPrices;

  const navigate = useNavigate();

  useEffect(() => {
    if (!service) {
      navigate('/');
    }
  }, [service]);

  function handleServicePut(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault();
    dispatch(updatePhoto({ img, id: service?.id }));
    throw new Error('Function not implemented.');
  }
  const uslovie = uslugaPrice?.filter(
    (el) => el.OrderItems.filter((elem) => elem.isClosed === selectedOption).length > 0,
  );

  const OnHandleUpdateStatusOrder = (obj: UpdateStatus): void => {
    if (service?.id) {
      dispatch(updateStatusOrderItem(obj));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '10vw' }}>
      <div className="servicelk">
        <div className='leftpart'>
        <h1 className="head">Личный кабинет автосервиса</h1>
        <img style={{ width: '400px' }} src={service?.img} alt="photka" />

        <button className="btn" type="submit" onClick={() => setPhoto(!photo)}>
          Изменить фото аккаунта
        </button>
        {!photo && (
          <>
            <input placeholder="url image" value={img} onChange={(e) => setImg(e.target.value)} />
            <button className="btn" type="button" onClick={(e) => handleServicePut(e)}>
              Сохранить
            </button>
          </>
        )}
        <div className='rowwrapper'>
        <div className="itemrow">
          <div className="itemName">Название салона:</div>
          <div className="iteminfo">{service?.title}</div>
        </div>
        <div className="itemrow">
          <div className="itemName">Адрес салона: </div>
          <div className="iteminfo">{service?.adress}</div>
        </div>
        <div className="itemrow">
          <div className="itemName">Email:</div>
          <div className="iteminfo">{service?.email}</div>
        </div>
        <div className="itemrow">
          <div className="itemName">Номер телефона:</div>
          <div className="iteminfo">{service?.phone}</div>
        </div>
        <div className="itemrow">
          <div className="itemName">Ваш тариф:</div>
          <div className="iteminfo">{service?.tarif}</div>
        </div>
        </div>

        <button className="btn" type="submit" onClick={() => navigate(`/services/${service?.id}`)}>
          Добавить услуги
        </button>
</div>
<div className='rightpart'>
        <Calendarr />
        <div className='calendarstyle'>
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
            <div className="containerPay">
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
                  onChange={() => setSelectedOption(!selectedOption)}
                >
                  <option disabled value="Сортировать заявки">
                    Сортировать заявки
                  </option>
                  <option value="Активные" style={{ fontSize: '13px' }}>
                    Активные
                  </option>
                  <option value="Архивные" style={{ fontSize: '13px' }}>
                    Архивные
                  </option>
                </select>
              </div>
              <div style={{ color: 'black', fontSize: '2vh' }}>
                {uslugaPrice &&
                  uslovie?.map((el) => (
                    <div style={{ display: 'flex', flexDirection: 'row', width: '50vw' }}>
                      <div
                        style={{
                          color: 'white',
                          // marginBottom: '20px',
                          paddingBottom: '20px',

                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div>Марка авто: {el.Mark.title}</div>
                        <div>Модель авто: {el.CarModel.title}</div>
                        <div>Цена услуги: {el.cost} </div>
                        <div>Usluga {el.Usluga.title}</div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          Услуги:
                          {el.OrderItems.map(
                            (elem) =>
                              elem.isClosed === selectedOption && (
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                  <div>
                                    <div>Дата записи: {elem.date.slice(0, 10)}</div>
                                    <div>Имя клиента: {elem.Order.User.name}</div>
                                    <div>Email: {elem.Order.User.email}</div>
                                    <div>
                                      Статус заказа:{' '}
                                      {elem.isClosed ? <div>Архивный</div> : <div>Активный</div>}
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    style={{ width: '20vw', height: '10vh', fontSize: '15px' }}
                                    onClick={() =>
                                      OnHandleUpdateStatusOrder({
                                        orderItem_id: elem.id,
                                        uslugaPrice_id: el.id,
                                      })
                                    }
                                  >
                                    Изменить статус Заказа
                                  </button>
                                </div>
                              ),
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default PersonalArea;
