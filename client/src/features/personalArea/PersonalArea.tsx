/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, type RootState } from '../../redux/store';
import Calendarr from './Calendar';
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
    <div className="servicelk">
      <h1 className="head">Личный кабинет автосервиса</h1>
      <img style={{ width: '400px' }} src={service?.img} alt="photka" />

      <button className="btn" type="submit" onClick={() => setPhoto(!photo)}>
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
          <button className="btn" type="button" onClick={(e) => handleServicePut(e)}>
            Сохранить
          </button>
        </>
      )}
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

      <button className="btn" type="submit" onClick={() => navigate(`/services/${service.id}`)}>
        Добавить услуги
      </button>
      <Calendarr />
      <div >
        <button
          style={{ width: '30vw' }}
          type="submit"
          onClick={() => {
            setWidt(!widt);
          }}
        >
          Записи сервиса
        </button>
        {widt && (
          <div className='servicecontainer'>
            <div>
              <h1>Сортировка:</h1>
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
            <div >
              {uslugaPrice &&
                uslovie.map((el) => (
                  <div className="ordercont3">
                    
                      <div className="itemrow">
                        <div className="itemName">Марка авто: </div>
                        <div className="iteminfo">{el.Mark.title}</div>
                      </div>
                      <div className="itemrow">
                        <div className="itemName">Модель авто:</div>
                        <div className="iteminfo">{el.CarModel.title}</div>
                      </div>
                      <div className="itemrow">
                        <div className="itemName">Цена услуги:</div>
                        <div className="iteminfo">{el.cost}</div>
                      </div>
                      <div className="itemrow">
                        <div className="itemName">Номер телефона:</div>
                        <div className="iteminfo">{service?.phone}</div>
                      </div>
                      <div className="itemrow">
                        <div className="itemName">Услуга:</div>
                        <div className="iteminfo">{el.Usluga.title}</div>
                     
</div>
                      <div className="ordercont2">
                        Услуги:
                        {el.OrderItems.map(
                          (elem) =>
                            elem.isClosed === selectedOption && (
                              // <div className="ordercont2">
                                <div className="ordercont">
                                  <div className="itemrow">
                                    <div className="itemName">Дата записи:</div>
                                    <div className="iteminfo">{elem.date}</div>
                                  </div>
                                  <div className="itemrow">
                                    <div className="itemName">Имя клиента:</div>
                                    <div className="iteminfo">{elem.Order.User.name}</div>
                                  </div>
                                  <div className="itemrow">
                                    <div className="itemName">Email:</div>
                                    <div className="iteminfo">{elem.Order.User.email}</div>
                                  </div>
                                  <div className="itemrow">
                                    <div className="itemName">
                                      Статус заказа:{' '}
                                      {elem.isClosed ? (
                                        <div className="iteminfo">Архивный</div>
                                      ) : (
                                        <div className="iteminfo">Активный</div>
                                      )}
                                    </div>
                                  </div>
                                {/* </div> */}
                                <button
                                  className="btn"
                                  type="button"
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
                ))}
            </div>
          </div>
        )}
      </div>
      {/* <Calendarr /> */}
    </div>
  );
}

export default PersonalArea;
