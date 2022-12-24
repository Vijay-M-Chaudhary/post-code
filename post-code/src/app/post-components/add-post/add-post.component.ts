import { addPost } from './../state/posts.actions';
import { Post } from './../../model/posts.model';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  public postForm: FormGroup | any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required,ValidateTitle]),
      body: new FormControl(null, [Validators.required]),
    });
  }

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }

    const post: Post = {
      title: this.postForm.value.title,
      body: this.postForm.value.body,
      userId:`POSTIT${Math.floor(10 + Math.random() * 90)}`
    };

    this.store.dispatch(addPost({ post }));
  }
}

export function ValidateTitle(control: AbstractControl) {
  if (control.value && control.value.length && !control.value.toLowerCase().startsWith('x')) {
    return { invalidTitle: true };
  }
  return null;
}
