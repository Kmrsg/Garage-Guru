/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, type RootState } from '../../redux/store';
// import Calendarr from './Calendar';
import { checkService, updatePhoto } from '../LogReg/AuthSlice';
import type { OrderItemID, UpdateStatus } from './type';
import { loadOrderItems } from './PersonalSlice';
import { updateStatusOrderItem } from '../service/servicesSlice';

function PersonalArea(): JSX.Element {
  const [photo, setPhoto] = useState(true);
  const [widt, setWidt] = useState(true);
  const dispatch = useAppDispatch();
  const service = useSelector((store: RootState) => store.auth.service);
  const [img, setImg] = useState(service?.img);
  const [selectedOption, setSelectedOption] = useState(false);
  console.log(service?.UslugaPrices);
  const asd = useSelector((store: RootState) => store.servicesSlice.services).find(
    (servs) => servs.id === service?.id,
  );
  const uslugaPrice = asd?.UslugaPrices;
  console.log(uslugaPrice);

  // console.log(uslugaPrice);

  // const handleServicePut = (e: React.MouseEvent<HTMLButtonElement>): void => {
  //   e.preventDefault();
  //   dispatch(updatePhoto({ img, id: service?.id }));
  // };

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

  // state.services = state.services.map((service) =>
  //         service.UslugaPrices.filter(
  //           (uslugaPrice) => uslugaPrice.id === action.payload.uslugaPrice_id,
  //         ).length > 0
  //           ? {
  //               ...service,
  //               UslugaPrices: service.UslugaPrices.map((usluga) => ({
  //                 ...usluga,
  //                 OrderItems: usluga.OrderItems.map((order) =>
  //                   order.id === action.payload.orderItem.id
  //                     ? { ...order, isClosed: action.payload.orderItem.isClosed }
  //                     : order,
  //                 ),
  //               })),
  //             }
  //           : service,
  //       );
  console.log(asd);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-20vw' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img style={{ width: '300px' }} src={service?.img} alt="photka" />

        <button type="submit" onClick={() => setPhoto(!photo)}>
          Изменить фото аккаунта
        </button>
        {!photo && (
          <>
            <input placeholder="url image" value={img} onChange={(e) => setImg(e.target.value)} />
            <div>или</div>
            <input
              style={{ width: '300px' }}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
            />
            <button type="button" onClick={(e) => handleServicePut(e)}>
              save
            </button>
          </>
        )}
        <div style={{ color: 'white', fontSize: '13px' }}>
          <div>Название салона: {service?.title}</div>
          <div>Адрес салона: {service?.adress}</div>
          <div>Email: {service?.email}</div>
          <div>Номер телефона: {service?.phone}</div>
          <div>Ваш тариф: {service?.tarif}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button type="submit" onClick={() => navigate(`/services/${service.id}`)}>
          Добавить услуги
        </button>
        <div style={{ color: 'white', fontSize: '13px' }}>
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
              <div style={{ backgroundColor: 'white', color: 'black', fontSize: '2vh' }}>
                {uslugaPrice &&
                  uslovie.map((el) => (
                    <div style={{ display: 'flex', flexDirection: 'row', width: '50vw' }}>
                      <div
                        style={{
                          backgroundColor: 'white',
                          // marginBottom: '20px',
                          paddingBottom: '20px',
                          color: 'black',
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
                                    <div>Дата записи: {elem.date}</div>
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
        {/* <Calendarr /> */}
      </div>
    </div>
  );
}

export default PersonalArea;
