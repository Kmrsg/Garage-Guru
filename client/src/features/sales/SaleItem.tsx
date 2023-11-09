import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { deleteSale, updateSale } from '../service/servicesSlice';
import type { Sale } from '../service/types/type';
import './style/style.css';

export default function SaleItem({ sale }: { sale: Sale }): JSX.Element {
  const dispatch = useAppDispatch();
  const [flag, setFlag] = useState(false);
  const [text, setText] = useState(sale.text);
  const [img, setImg] = useState(sale.img);

  const onHandleUpd = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateSale({ id: sale.id, text, img, service_id: sale.service_id }));
    setFlag((prev) => !prev);
  };
  const onHandleDelete = (): void => {
    dispatch(deleteSale(sale.id));
  };

  return (
    <div className="sale-card">
      <img className='saleimg' src={sale.img} alt="saleImg" />
      <h3>{sale.text}</h3>
      <button className='btn' onClick={onHandleDelete} type="button" >
        удалить акцию
      </button>
      <button className='btn' onClick={() => setFlag(!flag)} type="button">
        Редактировать
      </button>
      {flag && (
        <form onSubmit={onHandleUpd}>
          <label htmlFor="">
            Текст акции
            <input name="text" defaultValue={text} onChange={(e) => setText(e.target.value)} />
          </label>
          <label htmlFor="">
            Картинка акции
            <input name="img" defaultValue={img} onChange={(e) => setImg(e.target.value)} />
          </label>
          <button className='btn' type="submit">Изменить</button>
        </form>
      )}
    </div>
  );
}
