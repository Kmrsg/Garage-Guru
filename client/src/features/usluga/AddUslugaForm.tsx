/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import type { RootState } from '../../redux/store';
import type { ServiceCard } from '../service/types/type';
import { addUsluga } from './uslugaPriceSlice';
import './style/style.css';

export default function AddUslugaForm({ service }: { service: ServiceCard }): JSX.Element {
  const dispatch = useAppDispatch();
  const [marka, setMarka] = useState('');
  const [cost, setCost] = useState('');
  const [model, setModel] = useState('');
  const [usluga, setUsluga] = useState('');
  const uslugas = useSelector((store: RootState) => store.uslugas.uslugas);
  const marks = useSelector((store: RootState) => store.uslugas.marks);
  const serviceAuth = useSelector((store: RootState) => store.auth.service);

  const onHandleAdd = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const mark_id = marks.find((el) => el.title === marka)?.id;
    const model_id = marks
      .find((el) => el.title === marka)
      ?.CarModels.find((carModel) => carModel.title === model)?.id;
    const usluga_id = uslugas.find((elem) => elem.title === usluga)?.id;

    dispatch(
      addUsluga({ service_id: service.id, mark_id, carModel_id: model_id, usluga_id, cost: +cost }),
    );
  };

  return (
    <div className='uslugas'>
      <form id="usluga" onSubmit={onHandleAdd}>
        <select name="usluga" onChange={(e) => setUsluga(e.target.value)}>
          <option value="1">Выберите услугу</option>
          {uslugas.map((uslugaa) => (
            <option key={uslugaa.id} value={uslugaa.title}>
              {uslugaa.title}
            </option>
          ))}
        </select>
        <select
          name="mark"
          id="mark"
          onChange={(e) => {
            setMarka(e.target.value);
          }}
        >
          <option value="">Выберите марку авто</option>
          {marks.map((mark) => (
            <option key={mark.id} value={mark.title}>
              {mark.title}
            </option>
          ))}
        </select>
        <select name="model" onChange={(e) => setModel(e.target.value)}>
          <option value="">Выберите модель авто</option>
          {marka !== '' &&
            marks.map(
              (mark) =>
                mark.title === marka &&
                mark.CarModels.map((car) => (
                  <option key={car.id} value={car.title}>
                    {car.title}
                  </option>
                )),
            )}
        </select>
        <input className='costinput' placeholder='Установите цену' type="number" name="cost" value={cost} onChange={(e) => setCost(e.target.value)} />
        {serviceAuth && <button type="submit">Добавить услугу</button>}
      </form>
    </div>
  );
}
