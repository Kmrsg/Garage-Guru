import React, { useState } from 'react';
import './style/style.css';
import { useAppDispatch } from '../../redux/store';
import { addNews } from '../news/newsSlice';

function AddNewsForm(): JSX.Element {
  const [img, setImg] = useState('');
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addNews({ id: 1, img, text }));
    setImg('');
    setText('');
  };

  return (
    <div className="form__container">
      <form className="form__add-post" onSubmit={(e) => onHandleSubmit(e)}>
        <label className='itemrow'>
        <p className='itemName'>  Фото статьи</p>
        <p className='iteminfo'>
        <input value={img} onChange={(e) => setImg(e.target.value)} type="text" />
        </p>
         
         
        </label>
        <label className='itemrow'>
        <p className='itemName'>Текст статьи </p>
        <p className='iteminfo'>
        <textarea minlength="20"
            className="biginput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text" />
        </p>
           
        {/* это старый рабочий вариант с кривым инпутом */}
           {/* <input
            className="biginput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
          />  */}
 
        
             </label>
 

        <button className="btn" type="submit">
          Добавить статью
        </button>
      </form>
    </div>
  );
}

export default AddNewsForm;
