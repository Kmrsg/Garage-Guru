/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import SaleItem from '../sales/SaleItem';
import UslugaContainter from '../usluga/UslugaContainter';
import AddSaleForm from './AddSaleForm';
import CommentsContainer from './CommentsContainer';
import './style/style.css';
import picservis from '../../images/4.png';
import { stopLoading } from './servicesSlice';
import spinner from '../../assets/Spinner-1s-200px.svg';

export default function ServicePage(): JSX.Element {
  const { serviceId } = useParams();
  const [flag, setFlag] = useState('usluga');
  const navigate = useNavigate();
  const service = useSelector((store: RootState) =>
    store.servicesSlice.services.find((servicee) => serviceId && servicee.id === +serviceId),
  );

  const serviceAuth = useSelector((store: RootState) => store.auth.service);
  const dispatch = useAppDispatch;
  const loading = useSelector((store: RootState) => store.uslugas.loading);
  const error = useSelector((store: RootState) => store.uslugas.error);
  const spin = <img src={spinner} alt="preloader" />;
  const checkError = <h1 style={{ color: 'red' }}>{error}</h1>;
  setTimeout(() => dispatch(stopLoading()), 10);
  const content = (

  const user = useSelector((store: RootState) => store.auth.user);

  if (
    (service && !service.isChecked) ||
    (user && !user.isAdmin) ||
    (serviceAuth && service && service.id !== serviceAuth.id)
  ) {
    navigate('/services');
  }

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
            {serviceAuth && serviceAuth.id === service?.id && <AddSaleForm service={service} />}
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
  return <>{loading ? spin : <div>{error ? checkError : content}</div>}</>;
}
