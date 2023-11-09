import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import type { ServiceCard } from './types/type';
import './style/style.css';

export default function ServiceItem({ service }: { service: ServiceCard }): JSX.Element {
  let rating = 0;
  const rate = service.Rates.reduce((acc, el) => (acc += el.score), 0) / service.Rates.length;
  const comments = service.Comments.length;
  if (rate) {
    rating = rate;
  }
  return (
    <div className="service-card">
      <h3 className='servicename'>{service.title}</h3>
      <br />
      <img className="serviceimg" src={service.img} alt="servicePhoto" />
      <h4 className='itemrow'>
      <p className='itemName'>Адрес: </p>
      <p className='iteminfo'>{service.adress}</p>
      </h4>
      {/* <button className="btn" type="button">
        x
      </button> */}
      <h4 className='itemrow'>
      <p className='itemName'>Рейтинг:</p>
      <p className='iteminfo'> <ReactStars
          isHalf={true}
          value={rate}
          edit={false}
          count={5}
          size={15}
          activeColor="#ffd700"
        /></p>
        
       
      </h4>
      <h4 className='itemrow'>
      <p className='itemName'>Отзывы:</p>
      <p className='iteminfo'>{comments}</p></h4>

      <button  className='btn' type="button">
        <Link to={`/services/${service.id}`}>Подробнее</Link>
      </button>
    </div>
  );
}
