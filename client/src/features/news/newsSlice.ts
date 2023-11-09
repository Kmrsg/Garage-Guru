import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PostsState } from './types/State';
import * as api from './api/api';

import type { Post } from './types/Post';
import fetchPostAdd from '../admin/api/api';

const initialState: PostsState = {
  posts: [],
  error: null,
  loading: true,
};

export const loadPosts = createAsyncThunk('posts/load', () => api.fetchPosts());
export const addNews = createAsyncThunk('posts/add', (post: Post) => fetchPostAdd(post));
export const deleteNews = createAsyncThunk('posts/delete', (id: number) => api.fetchPostRemove(id));
export const changeNews = createAsyncThunk('posts/change', (post: Post) =>
  api.fetchPostChange(post),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(loadPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(changeNews.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post.id === action.payload.id ? (post = action.payload) : post,
        );
      });
  },
});

export const { stopLoading } = postsSlice.actions;
export default postsSlice.reducer;
