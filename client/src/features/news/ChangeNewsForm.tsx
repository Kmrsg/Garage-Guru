import React, { useState } from 'react';
import './style/modal.css';
import { useAppDispatch } from '../../redux/store';
import { changeNews } from './newsSlice';
import type { Post } from './types/Post';

function ChangeNewsForm({
  post,
  onHandleSetModal,
}: {
  post: Post;
  onHandleSetModal: () => void;
}): JSX.Element {
  const [img, setImg] = useState(post?.img);
  const [text, setText] = useState(post?.text);

  const dispatch = useAppDispatch();

  const onHandleChange = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(changeNews({ id: post.id, img, text }));
    onHandleSetModal();
  };

  return (
    <div className="modal active">
      <form className="modal-content active" onSubmit={onHandleChange}>
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
            type="text"
          />
        </label>

        <button className="btn" type="submit">
          Сохранить изменения
        </button>
        <button onClick={onHandleSetModal} className="btn" type="button">
          Отмена
        </button>
      </form>
    </div>
  );
}

export default ChangeNewsForm;
