import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import './style/style.css';

function NewsPostPage(): JSX.Element {
  const { postId } = useParams();
  const navigate = useNavigate();

  const posts = useSelector((store: RootState) => store.news.posts);

  const post = posts.find((postt) => postId && postt.id === +postId);

  const error = <h1>Такой статьи нет</h1>;

  const content = (
    <div className="post-page">
      <img className="post-page__img" src={post?.img} alt="post" />
      <h3 className="post-page__text">{post?.text}</h3>

      <button onClick={() => navigate(-1)} type="button">
        Назад к списку статей
      </button>
    </div>
  );

  return <div className="post-page__container">{!post ? error : content}</div>;
}

export default NewsPostPage;
