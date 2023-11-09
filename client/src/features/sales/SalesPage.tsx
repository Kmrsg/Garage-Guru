/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { useSelector } from 'react-redux';
import SaleItem from './SaleItem';
import './style/style.css';
import type { RootState } from '../../redux/store';
// import spinner from '../../assets/Spinner-1s-200px.svg';

function SalesPage(): JSX.Element {
  const sales = useSelector((store: RootState) => store.sales.sales);
  const admin = useSelector((store: RootState) => store.auth.user);
  const services = useSelector((store: RootState) => store.servicesSlice.services);
  // const error = useSelector((store: RootState) => store.sales.error);
  // const loading = useSelector((store: RootState) => store.sales.loading);

  // const checkError = <h1 style={{ color: 'red' }}>{error}</h1>;
  // const spin = <img src={spinner} alt="preloader" />;
  const city = useSelector((store: RootState) => store.sales.city);

  return (
    <div className="containerSaleForm">
      {/* <img src={pic} alt='img'/> */}
      <div className="sales">
        <div className="sales__container">
          {services.map((service) =>
            service.adress.split(',').includes(city)
              ? service.Sales.map((sale) => <SaleItem key={sale.id} sale={sale} />)
              : null,
          )}
        </div>
      </div>
    </div>
  );
}

export default SalesPage;
