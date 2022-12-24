import { AppState } from './../../store/app.state';
import { getPosts } from './posts.selector';
import { Store } from '@ngrx/store';
import {
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  addPost,
  addPostSuccess,
  loadPosts,
  loadPostsSuccess,
  nullAction,
} from './posts.actions';
import { PostsService } from './../../service/posts.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<AppState>,
    private route: Router
  ) { }

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, posts]) => {
        if (!posts.length || posts.length === 1) {
          return this.postsService.getPosts().pipe(
            map((posts) => {
              return loadPostsSuccess({ posts });
            })
          );
        }
        return of(nullAction());
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.id };
            this.route.navigate(['']);
            return addPostSuccess({ post });
          })
        );
      })
    );
  });
}
