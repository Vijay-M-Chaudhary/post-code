import { Post } from './../../model/posts.model';
import { createAction, props } from '@ngrx/store';
export const ADD_POST_ACTION = '[posts page] add post';
export const ADD_POST_SUCCESS = '[posts page] add post success';
export const LOAD_POSTS = '[posts page] load posts';
export const LOAD_POSTS_SUCCESS = '[posts page] load posts success';
export const FILTER_BY = '[posts page] filter by';

export const addPost = createAction(
  ADD_POST_ACTION,
  props<{ post: Post }>()
);
export const addPostSuccess = createAction(
  ADD_POST_SUCCESS,
  props<{ post: Post }>()
);

export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(
  LOAD_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);
export const filterBy = createAction(
  FILTER_BY,
  props<{param:string}>()  
)

export const nullAction = createAction('[null action]');
