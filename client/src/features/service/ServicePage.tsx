/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import SaleItem from '../sales/SaleItem';
import UslugaContainter from '../usluga/UslugaContainter';
import AddSaleForm from './AddSaleForm';
import CommentsContainer from './CommentsContainer';
import './style/style.css';
import picservis from '../../images/4.png';

export default function ServicePage(): JSX.Element {
  const { serviceId } = useParams();
  const [flag, setFlag] = useState('usluga');
  const service = useSelector((store: RootState) =>
    store.servicesSlice.services.find((servicee) => serviceId && servicee.id === +serviceId),
  );
  console.log(service);

  return (
    <div className="services-page">
      <div className="post-page">
        <h2 className="servicename">{service?.title}</h2>
        <img className="photo" src={service?.img} alt="" />
        <h3 className="serviceadres">Адрес: {service?.adress}</h3>
      </div>
      <div className="content">
        <div className="selector">
          <img className="picservis" src={picservis} alt="pic" />
          <button className="btn" type="button" onClick={() => setFlag('sale')}>
            Акции и скидки
          </button>
          <button className="btn" type="button" onClick={() => setFlag('usluga')}>
            Услуги
          </button>
          <button className="btn" type="button" onClick={() => setFlag('comments')}>
            Отзывы
          </button>
        </div>
        {flag === 'sale' ? (
          <div className="sales-container">
            <AddSaleForm service={service!} />
            {service?.Sales.map((sale) => <SaleItem sale={sale} key={sale.id} />)}
          </div>
        ) : flag === 'usluga' ? (
          <UslugaContainter service={service!} />
        ) : (
          <CommentsContainer service={service!} />
        )}
      </div>
    </div>
  );
}
