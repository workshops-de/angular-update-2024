import { Component, DestroyRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, BookNa } from '../models';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class BookEditComponent implements OnInit {
  @Input() isbn = '';
  book: Book = new BookNa();

  constructor(
    private bookService: BookApiService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.bookService
      .getByIsbn(this.isbn)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(book => (this.book = book));
  }

  save() {
    this.bookService.update(this.book.isbn, this.book).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
