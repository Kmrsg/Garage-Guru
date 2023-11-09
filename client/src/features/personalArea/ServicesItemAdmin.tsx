/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { deleteOneService, upStatusService } from '../service/servicesSlice';
import { ServiceCard } from '../service/types/type';

function ServicesItemAdmin({ servic }: { servic: ServiceCard }): JSX.Element {
  const dispatch = useAppDispatch();

  const updateStatusService = (): void => {
    if (servic.id) {
      dispatch(upStatusService(servic.id));
    }
  };

  const onHandeldeleteService = (): void => {
    dispatch(deleteOneService(servic.id));
  };

  return (
    <div className='adminItem'
      
    >
      <div className='itemrow'>
        <p className='itemName'>Номер телефона:</p> 
        <p className='iteminfo'>{servic?.phone}</p></div>
      <div className='itemrow'>
      <p className='itemName'>Email:</p> 
      <p className='iteminfo'>{servic?.email}</p> </div>
      <div className='itemrow'>
      <p className='itemName'>Салон:</p>
       <p className='iteminfo'>{servic?.title}</p>  </div>
      <div className='itemrow'>
         <p className='itemName'>Купленный тариф: </p>
         <p className='iteminfo'>{servic?.tarif}$</p> </div>
      <div className='itemrow'>
      <p className='itemName'>Статус подтверждения:</p> 
      <p className='iteminfo'>{`${servic?.isChecked}`}</p> </div>
      <button className='btn'
        type="submit"
        
        onClick={() => updateStatusService()}
      >
        Изменить статус салона
      </button>
      <button className='btn'
       
        onClick={() => onHandeldeleteService()}
        type="submit"
      >
        Удалить аккаунт салона
      </button>
    </div>
  );
}

export default ServicesItemAdmin;
