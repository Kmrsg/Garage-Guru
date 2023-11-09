import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { Post } from './types/Post';
import './style/style.css';
import { deleteNews } from './newsSlice';
import ChangeNewsForm from './ChangeNewsForm';
import { RootState } from '../../redux/store';

function PostItem({ post }: { post: Post }): JSX.Element {
  const [modalActive, setModalActive] = useState(false);
  const user = useSelector((store: RootState) => store.auth.user);
  const dispatch = useDispatch();

  const onHandleRemove = (): void => {
    dispatch(deleteNews(post.id));
  };

  return (
    <div className="post__container">
      <img className="post__img" src={post.img} alt="post" />
      <h2>{post.text}</h2>
      {user && user.isAdmin && (
        <>
          {' '}
          <button onClick={() => onHandleRemove()} type="button">
            Удалить статью
          </button>
          {modalActive && <ChangeNewsForm post={post} setModalActive={setModalActive} />}
          <button onClick={() => setModalActive(!modalActive)} type="button">
            Изменить статью
          </button>
        </>
      )}
      <button className='btn' type="button">
        <Link to={`/news/${post.id}`}>Посмотреть статью</Link>
      </button>
    </div>
  );
}

export default memo(PostItem);
