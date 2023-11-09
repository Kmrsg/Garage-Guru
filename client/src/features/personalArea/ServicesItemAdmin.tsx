import React from 'react';
import type { Service } from '../LogReg/type';
import { useAppDispatch } from '../../redux/store';
import { deleteOneService, upStatusService } from '../service/servicesSlice';

function ServicesItemAdmin({ servic }: { servic: Service }): JSX.Element {
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
    <div
      style={{
        width: '30vw',
        height: '34vh',
        backgroundColor: 'white',
        color: 'black',
        marginBottom: '20px',
        fontSize: '13px',
      }}
    >
      <div>Номер телефона: {servic?.phone}</div>
      <div>Email: {servic?.email}</div>
      <div>Салон: {servic?.title}</div>
      <div>Купленный тариф: {servic?.tarif}$</div>
      <div>Статус подтверждения: {`${servic?.isChecked}`}</div>
      <button
        type="submit"
        style={{ backgroundColor: 'black', color: 'white' }}
        onClick={() => updateStatusService()}
      >
        Изменить статус салона
      </button>
      <button
        style={{ backgroundColor: 'red', color: 'white' }}
        onClick={() => onHandeldeleteService()}
        type="submit"
      >
        Удалить аккаунт салона
      </button>
    </div>
  );
}

export default ServicesItemAdmin;
