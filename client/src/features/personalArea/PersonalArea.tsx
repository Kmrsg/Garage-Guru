import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { Service } from '../LogReg/type';
import { useAppDispatch, type RootState } from '../../redux/store';
import Calendarr from './Calendar';
import { updatePhoto } from '../LogReg/AuthSlice';

function PersonalArea(): JSX.Element {
  const [photo, setPhoto] = useState(true);
  const dispatch = useAppDispatch();
  const service = useSelector((store: RootState) => store.auth.service);
  const user = useSelector((store: RootState) => store.auth.user);
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
    <div className='servicelk'>
      <h1 className='head' >Личный кабинет автосервиса</h1>
      <img style={{ width: '400px' }} src={service?.img} alt="photka" />

      <button className='btn' type="submit" onClick={() => setPhoto(!photo)}>
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
          <button className='btn' type="button" onClick={(e) => handleServicePut(e)}>
            Сохранить
          </button>
        </>
      )}
      <div className='itemrow'>
      <div className='itemName'>Название салона:</div>
      <div className='iteminfo'>{service?.title}</div>
      </div>
      <div className='itemrow'>
      <div className='itemName'>Адрес салона: </div>
      <div className='iteminfo'>{service?.adress}</div>
      </div>
      <div className='itemrow'>
          
      <div className='itemName'>Email:</div>
      <div className='iteminfo'>{service?.email}</div>
      </div>
      <div className='itemrow'>
         
      <div className='itemName'>Номер телефона:</div>
      <div className='iteminfo'>{service?.phone}</div>
      </div>
      <div className='itemrow'>
      <div className='itemName'>Ваш тариф:</div>
      <div className='iteminfo'>{service?.tarif}</div>
      </div>

      
    
      
      
    
    
  
      <button className='btn' type="submit" onClick={() => navigate(`/services/${service.id}`)}>
        Добавить услуги
      </button>
      <Calendarr />
    </div>
  );
}

export default PersonalArea;
