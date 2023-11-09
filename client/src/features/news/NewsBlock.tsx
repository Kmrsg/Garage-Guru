import React from 'react';
import { useSelector } from 'react-redux';
import NewsItem from './NewsItem';
import './style/style.css';
import AddNewsForm from '../admin/AddNewsForm';
import type { RootState } from '../../redux/store';
// import spinner from '../../assets/Spinner-1s-200px.svg';

function NewsBlock(): JSX.Element {
  const posts = useSelector((store: RootState) => store.news.posts);
  // const error = useSelector((store: RootState) => store.news.error);
  // const loading = useSelector((store: RootState) => store.news.loading);
  // const checkError = <h1 style={{ color: 'red' }}>{error}</h1>;
  // const spin = <img src={spinner} alt="preloader" />;

  return (
    <div className="containerPostForm">
      <AddNewsForm />

      <div className="swiper">
        <div className="posts__container">
          {posts?.map((post) => <NewsItem key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
}

export default NewsBlock;
