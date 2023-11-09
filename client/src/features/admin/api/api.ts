import type { Post } from '../../news/types/Post';

const fetchPostAdd = async (post: Post): Promise<Post> => {
  const res = await fetch('/api/news', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return res.json();
};
export default fetchPostAdd;
