import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import pic from '../../images/10.png';

function PersonalAreaPerson(): JSX.Element {
  const [widt, setWidt] = useState(false);
  const user = useSelector((store: RootState) => store.auth.user);
  const order = useSelector((store: RootState) => store.uslugas.orders).find(
    (el) => el.user_id === user?.id,
  );
  //   store.uslugas.orders.find((el) => el.user_id === user?.id),
  // );
  const orders = order?.OrderItems;
  console.log(orders);

  return (
    <div>
      <div>Name: {user?.name}</div>
      <div>Email: {user?.email}</div>
      <div>Phone-number: {user?.phone}</div>
      <button className='btn'
        type="submit"
        onClick={() => {
          setWidt(!widt);
        }}
      >
        Мои записи
      </button>
      <div className='itemName'>
        Сортировка:{' '}
        <select>
          <option>Активные</option>
          <option>Неактивные</option>
        </select>
        
          <img className="carpic" src={pic} alt="pic" />
      </div>
      {widt && (
        <div className='ordercont'>
          {order &&
            orders?.map((el) => (
              <div>
                 <div className='itemrow'>
                <div className='itemName'>Дата записи:</div>
                <div className='iteminfo'> {el.date.slice(0, 10)}</div>
                </div>
                <div className='itemrow'>
                <div className='itemName'>Услуга:</div>
                <div className='iteminfo'>{el.UslugaPrice.Usluga.title}</div>
                </div>
                
                <div className='itemrow'>
                <div className='itemName'>Марка авто:</div>
                <div className='iteminfo'>{el.UslugaPrice.Mark.title}</div>
                </div>
                <div className='itemrow'>
                <div className='itemName'>Модель:</div>
                <div className='iteminfo'>{el.UslugaPrice.CarModel.title}</div>
                   
                </div>
                <div className='itemrow'>
                <div className='itemName'>Цена:</div>
                <div className='iteminfo'>{el.UslugaPrice.cost}р</div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default PersonalAreaPerson;
