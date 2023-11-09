import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import type { RootState } from '../../redux/store';
import type { UslugaPrice } from './types/types';
import { updPrice } from './uslugaPriceSlice';
import './style/style.css';

export default function UpdateUslugaForm({
  price,
  onHandleFlag,
}: {
  price: UslugaPrice;
  onHandleFlag: () => void;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const [marka, setMarka] = useState(price.Mark.title);
  const [cost, setCost] = useState(price.cost);
  const [model, setModel] = useState(price.CarModel.title);
  const [usluga, setUsluga] = useState(price.Usluga.title);
  const uslugas = useSelector((store: RootState) => store.uslugas.uslugas);
  const marks = useSelector((store: RootState) => store.uslugas.marks);

  const onHandleUpd = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const mark_id = marks.find((el) => el.title === marka)?.id;
    const model_id = marks
      .find((el) => el.title === marka)
      .CarModels.find((carModel) => carModel.title === model)?.id;
    const usluga_id = uslugas.find((elem) => elem.title === usluga)?.id;

    dispatch(
      updPrice({
        id: price.id,
        mark_id: mark_id!,
        carModel_id: model_id!,
        usluga_id: usluga_id!,
        cost: +cost,
        service_id: price.service_id,
      }),
    );
    onHandleFlag();
  };

  return (
    <div className="uslugadiv">
      <form id="usluga" onSubmit={onHandleUpd}>
        <select
          className="uslugaselect"
          name="usluga"
          defaultValue={usluga}
          onChange={(e) => setUsluga(e.target.value)}
        >
          <option value="1">Выберите услугу</option>
          {uslugas.map((uslugaa) => (
            <option key={uslugaa.id} value={uslugaa.title}>
              {uslugaa.title}
            </option>
          ))}
        </select>
        <select
          className="uslugaselect"
          name="mark"
          id="mark"
          defaultValue={marka}
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
        <select
          className="uslugaselect"
          name="model"
          defaultValue={model}
          onChange={(e) => setModel(e.target.value)}
        >
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
        <input
          type="number"
          name="cost"
          defaultValue={cost}
          onChange={(e) => setCost(+e.target.value)}
        />
        <button type="submit">Изменить</button>
      </form>
    </div>
  );
}
