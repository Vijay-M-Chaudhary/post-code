import {
  loadPostsSuccess,
  addPostSuccess,
  filterBy,
} from './posts.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { initialState, postsAdapter, PostsState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, {
      ...state,
      count: state.count + 1,
    });
  }),

  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, {
      ...state,
      count: state.count + 1,
    });
  }),
  
  on(filterBy,(state,action)=>{
    return { 
      ...state, 
      filterQuery: action.param, 
    };
  })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return _postsReducer(state, action);
}
