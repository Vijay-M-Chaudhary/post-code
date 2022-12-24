import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsListComponent } from './post-components/posts-list/posts-list.component';
import { AddPostComponent } from './post-components/add-post/add-post.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './post-components/state/posts.reducer';
import { POST_STATE_NAME } from './post-components/state/posts.selector';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './post-components/state/posts.effects';
import { appReducer } from './store/app.state';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-serializer';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SinglePostComponent } from './post-components/single-post/single-post.component';



@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent, 
    AddPostComponent,
    SinglePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    NgbCollapseModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    StoreModule.forRoot(appReducer),
    EffectsModule.forFeature([PostsEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    EffectsModule.forRoot([]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
