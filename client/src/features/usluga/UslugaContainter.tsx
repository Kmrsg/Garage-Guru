import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { type ServiceCard } from '../service/types/type';
import AddUslugaForm from './AddUslugaForm';
import PriceItem from './PriceItem';
import './style/style.css';

export default function UslugaContainter({ service }: { service: ServiceCard }): JSX.Element {
  const prices = useSelector((store: RootState) => store.prices.uslugasPrices).filter(
    (price) => price.service_id === service?.id,
  );

  return (
    <div className="usluga-cont">
      <AddUslugaForm service={service} />
      <div className="prices">
        {prices?.map((price) => <PriceItem price={price} key={price.id} />)}
      </div>
    </div>
  );
}
