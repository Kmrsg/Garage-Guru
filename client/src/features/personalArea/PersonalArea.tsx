import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, type RootState } from '../../redux/store';
import Calendarr from './Calendar';
import { updatePhoto } from '../LogReg/AuthSlice';

function PersonalArea(): JSX.Element {
  const [photo, setPhoto] = useState(true);
  const dispatch = useAppDispatch();
  const service = useSelector((store: RootState) => store.auth.service);
  const [img, setImg] = useState(service?.img);

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

  return (
    <div>
      <img style={{ width: '300px' }} src={service?.img} alt="photka" />

      <button type="submit" onClick={() => setPhoto(!photo)}>
        Изменить фото аккаунта
      </button>
      {!photo && (
        <>
          <input placeholder="url image" value={img} onChange={(e) => setImg(e.target.value)} />
          <div>или</div>

          <button type="button" onClick={(e) => handleServicePut(e)}>
            save
          </button>
        </>
      )}
      <div>Название салона: {service?.title}</div>
      <div>Адрес салона: {service?.adress}</div>
      <div>Email: {service?.email}</div>
      <div>Номер телефона: {service?.phone}</div>
      <div>Ваш тариф: {service?.tarif}</div>
      <button type="submit" onClick={() => navigate(`/services/${service!.id!}`)}>
        Добавить услуги
      </button>
      <Calendarr />
    </div>
  );
}

export default PersonalArea;
