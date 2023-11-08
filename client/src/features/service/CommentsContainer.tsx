import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import type { RootState } from '../../redux/store';
import CommentItem from './CommentItem';
import { addComments } from './servicesSlice';
import type { ServiceCard } from './types/type';

export default function CommentsContainer({ service }: { service: ServiceCard }): JSX.Element {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.auth.user);
  const rate = service.Rates.find((ratee) => ratee.user_id === user?.id);
  const onHandleRate = (newRate: number): void => {
    setRating(newRate);
  };
  const onHandleAddComment = (e: React.FormEvent<HTMLFormElement>): void => {
    setErr('');
    e.preventDefault();
    if (user && text.trim() && rating > 0) {
      dispatch(addComments({ service_id: service.id, user_id: user.id, text, rate: rating }));
      setText('');
    } else {
      setErr('Заполните все поля!');
    }
  };
  return (
    <div className="comments-container">
      <div className="comments-content">
        {service.Comments?.length > 0 ? (
          service.Comments?.map((comment) => (
            <CommentItem service={service} comment={comment} key={comment.id} />
          ))
        ) : (
          <h3>Отзывов пока нет</h3>
        )}
      </div>
      {user && !rate && (
        <form onSubmit={onHandleAddComment}>
          <ReactStars
            onChange={onHandleRate}
            value={rating}
            edit={true}
            count={5}
            size={24}
            activeColor="#ffd700"
          />
          <input value={text} type="text" onChange={(e) => setText(e.target.value)} />
          <button type="submit">Оставить отзыв</button>
        </form>
      )}
      {err !== '' && <p>{err}</p>}
    </div>
  );
}