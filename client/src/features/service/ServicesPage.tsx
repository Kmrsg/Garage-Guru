import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import ServiceItem from './ServiceItem';
import './style/style.css';
import pic from '../../images/6.png';

export default function ServicesPage(): JSX.Element {
  const city = useSelector((store: RootState) => store.sales.city);
  // console.log(city);

  const uslugas = useSelector((store: RootState) => store.uslugas.uslugas);
  const marks = useSelector((store: RootState) => store.uslugas.marks);
  const [usluga, setUsluga] = useState('Все');
  const [mark, setMark] = useState('Все');
  const services = useSelector((store: RootState) => store.servicesSlice.services)
    .filter((service) => service.adress.split(',').includes(city))
    .filter((service) =>
      mark === 'Все'
        ? service
        : service.UslugaPrices.some((elem) => elem.Mark.title === mark) && service,
    )
    .filter((service) =>
      usluga === 'Все'
        ? service
        : service.UslugaPrices.some((elem) => elem.Usluga.title === usluga) && service,
    );

  // const error = useSelector((store: RootState) => store.servicesSlice.error);
  // const loading = useSelector((store: RootState) => store.servicesSlice.loading);

  return (
    <div className="containerServiceForm">
   

      <div className="sortServices">
      <img className='carpic' src={pic} alt='pic' />
        <select className='variant' name="mark" defaultValue={mark} onChange={(e) => setMark(e.target.value)}>
          <option className='choose' value="Все">Выберите марку</option>
          {marks.map((marka) => (
            <option key={marka.id} value={marka.title}>
              {marka.title}
            </option>
          ))}
        </select>
        <select className='variant' name="usluga" defaultValue={usluga} onChange={(e) => setUsluga(e.target.value)}>
          <option value="Все">Выберите услугу</option>
          {uslugas.map((uslugaa) => (
            <option key={uslugaa.id} value={uslugaa.title}>
              {uslugaa.title}
            </option>
          ))}
        </select>
      </div>

      <div className="swiper">
        <div className="services__container">
          {services.length > 0 ? (
            services.map((service) => <ServiceItem key={service.id} service={service} />)
          ) : (
            <h1>По выбранным фильтрам сервисы отсутствуют</h1>
          )}
        </div>
      </div>
    </div>
  );
}
