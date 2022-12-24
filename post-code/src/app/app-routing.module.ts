import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './post-components/add-post/add-post.component';
import { PostsListComponent } from './post-components/posts-list/posts-list.component';
import { SinglePostComponent } from './post-components/single-post/single-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
  },
  {
    path: 'add',
    component: AddPostComponent
  },
  {
    path: 'details/:id',
    component: SinglePostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
