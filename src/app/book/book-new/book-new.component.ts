import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  NonNullableFormBuilder,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, BookNa } from '../models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ws-book-new',
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf]
})
export class BookNewComponent implements OnDestroy {
  sink = new Subscription();
  form: FormGroup;
  saved = false;
  bookForm: FormGroup<{
    isbn: FormControl<string>;
    title: FormControl<string>;
    author: FormControl<string>;
    abstract: FormControl<string>;
    cover: FormControl<string>;
  }>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private bookService: BookApiService,
    private nonNullableFormBuilder: NonNullableFormBuilder
  ) {
    this.form = this.buildForm();

    this.bookForm = this.nonNullableFormBuilder.group({
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', Validators.required],
      author: ['', Validators.required],
      abstract: [''],
      cover: ['']
    });
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  create() {
    const book: Book = { ...new BookNa(), ...this.form.value };
    this.sink.add(
      this.bookService
        .create(book)
        .pipe(tap(() => (this.saved = true)))
        .subscribe({
          complete: () => this.router.navigateByUrl('/')
        })
    );
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', Validators.required],
      author: ['', Validators.required],
      abstract: [''],
      cover: ['']
    });
  }
}
