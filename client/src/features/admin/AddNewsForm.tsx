import React, { useState } from 'react';
import './style/style.css';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { addNews } from '../news/newsSlice';

function AddNewsForm(): JSX.Element {
  const [img, setImg] = useState('');
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const admin = useSelector((store: RootState) => store.auth.user);
  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addNews({ id: 1, img, text }));
    setImg('');
    setText('');
  };

  return (
    <div className="form__container">
      {admin?.id === 1 && (
        <form className="form__add-post" onSubmit={(e) => onHandleSubmit(e)}>
          <label className="form__label">
            Фото
            <input value={img} onChange={(e) => setImg(e.target.value)} type="text" />
          </label>
          <label className="form__label ">
            Текст статьи
            <textarea
              minLength={20}
              className="biginput"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>

          <button className="btn" type="submit">
            Добавить статью
          </button>
        </form>
      )}
    </div>
  );
}

export default AddNewsForm;
