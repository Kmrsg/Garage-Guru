/* eslint-disable import/no-duplicates */
import React, { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { Post, PostId } from './types/Post';
import './style/slider.css';
import { deleteNews } from './newsSlice';
import ChangeNewsForm from './ChangeNewsForm';
import { useAppDispatch } from '../../redux/store';
import { RootState } from '../../redux/store';

function SliderItem({ post }: { post: Post }): JSX.Element {
  const [modalActive, setModalActive] = useState(false);
  const user = useSelector((store: RootState) => store.auth.user);
  const dispatch = useAppDispatch();

  const onHandleRemove = (value: PostId): void => {
    dispatch(deleteNews(value));
  };
  const onHandleSetModal = useCallback(() => setModalActive((prev) => !prev), []);

  return (
    <div className="posts_slide_container">
      <img className="post__img" src={post.img} alt="post" />
      <h2 className="scroll">{post.text}</h2>
      {user && user.isAdmin && (
        <>
          {' '}
          <button onClick={() => onHandleRemove(post.id)} type="button">
            Удалить статью
          </button>
          {modalActive && <ChangeNewsForm post={post} onHandleSetModal={onHandleSetModal} />}
          <button onClick={() => setModalActive(!modalActive)} type="button">
            Изменить статью
          </button>
        </>
      )}
      <button className="btn" type="button">
        <Link to={`/news/${post.id}`}>Посмотреть статью</Link>
      </button>
    </div>
  );
}

export default memo(SliderItem);
