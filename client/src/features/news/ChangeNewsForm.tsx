import React, { useState } from 'react';
import './style/modal.css';
import { RootState, useAppDispatch } from '../../redux/store';
import { addNews, changeNews } from '../news/newsSlice';
import { useSelector } from 'react-redux';
import { Post } from './types/Post';

function ChangeNewsForm({
  post,
  setModalActive,
}: {
  post: Post;
  setModalActive: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const [img, setImg] = useState(post?.img);
  const [text, setText] = useState(post?.text);
  1;
  const dispatch = useAppDispatch();
  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addNews({ img, text }));
    setImg('');
    setText('');
  };
  const onHandleChange = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(changeNews({ id: post.id, img, text }));
    setModalActive(false);
  };

  return (
    <div className='darkened'>
      <div className="modal active">
      <form className="modal-content active" onSubmit={onHandleChange}>
        <label className="form__label">
          Фото статьи
          <input value={img} onChange={(e) => setImg(e.target.value)} type="text" />
        </label>
        <label className="form__label ">
          Текст статьи
          <textarea
            minlength="20"
            className="biginput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
          />
        </label>

        <button className="btn" type="submit">
          Сохранить изменения
        </button>
        <button onClick={() => setModalActive(false)} className="btn" type="button">
          Отмена
        </button>
      </form>
    </div>
    </div>
    
  );
}

export default ChangeNewsForm;
