import React, { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { Post } from './types/Post';
import './style/style.css';
import { deleteNews } from './newsSlice';
import ChangeNewsForm from './ChangeNewsForm';
import { RootState, useAppDispatch } from '../../redux/store';

function PostItem({ post }: { post: Post }): JSX.Element {
  const [modalActive, setModalActive] = useState(false);
  const user = useSelector((store: RootState) => store.auth.user);
  const dispatch = useAppDispatch();

  const onHandleRemove = (): void => {
    dispatch(deleteNews(post.id));
  };
  const onHandleSetModal = useCallback(() => setModalActive((prev) => !prev), []);
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
          {modalActive && <ChangeNewsForm post={post} onHandleSetModal={onHandleSetModal} />}
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
