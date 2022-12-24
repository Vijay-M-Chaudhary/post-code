import { getPosts } from './../state/posts.selector';
import { Post } from './../../model/posts.model';
import { debounceTime, map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadPosts } from '../state/posts.actions';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  
  public searchField = new FormControl('');
  posts: Observable<Post[]>;

  constructor(private store: Store<AppState>) {

  }
  
  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
    this.searchField.valueChanges
    .pipe(
      map(searchParam=>searchParam?.toLowerCase()),
      debounceTime(500)
    )
    .subscribe((searchParam = '')=>{
      this.posts = this.store.select(getPosts).pipe(
        map(items=>{
          return items.filter(item=>{
            return item.title.toLocaleLowerCase().includes(searchParam)
          })
        })
      )
    });
  }

  onsearch(){

  }
}
