import { Component, DestroyRef, Input, OnDestroy, OnInit, effect, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, BookNa } from '../models';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface IBookForm {
  title: FormControl<string>;
  subtitle: FormControl<string>;
  abstract: FormControl<string>;
}
@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class BookEditComponent {
  isbn = input.required<string>();
  book: Book = new BookNa();
  form!: FormGroup<IBookForm>;
  eRef = effect(() => {
    this.bookService
      .getByIsbn(this.isbn())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(book => {
        this.book = book;
        this.form = this.fb.group({
          title: [book.title, Validators.required],
          subtitle: [book.author, Validators.required],
          abstract: [book.abstract]
        });
      });
  });

  private bookService = inject(BookApiService);
  private destroyRef = inject(DestroyRef);
  private fb = inject(NonNullableFormBuilder);

  save() {
    this.bookService
      .update(this.book.isbn, { ...this.book, ...this.form.value })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
