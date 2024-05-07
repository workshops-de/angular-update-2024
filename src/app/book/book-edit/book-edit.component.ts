import { Component, Input, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { Book, BookNa } from '../models';
import { FormControl, FormGroup, ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class BookEditComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private bookService = inject(BookApiService);
  private book!: Book;

  form!: FormGroup<{
    isbn: FormControl<string>;
    title: FormControl<string>;
    author: FormControl<string>;
    abstract: FormControl<string>;
    cover: FormControl<string>;
  }>;

  @Input() set isbn(value: string) {
    this.bookService
      .getByIsbn(value)
      .pipe(
        tap(book => (this.book = book)),
        map(book =>
          this.formBuilder.group({
            isbn: [book.isbn, [Validators.required, Validators.minLength(3)]],
            title: [book.title, Validators.required],
            author: [book.author, Validators.required],
            abstract: [book.abstract],
            cover: [book.cover]
          })
        )
      )
      .subscribe({
        next: bookForm => (this.form = bookForm)
      });
  }

  save() {
    const book: Book = {
      ...this.book,
      ...this.form.getRawValue()
    };
    this.bookService.update(this.isbn, book).subscribe();
  }

  reset() {
    this.form.reset();
  }
}
