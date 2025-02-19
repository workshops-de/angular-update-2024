import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, BookNa } from '../models';
import { FormsModule } from '@angular/forms';

@Component({ selector: 'ws-book-edit', templateUrl: './book-edit.component.html', imports: [FormsModule] })
export class BookEditComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookApiService);

  sink = new Subscription();
  book: Book = new BookNa();

  ngOnInit() {
    this.sink.add(
      this.route.params
        .pipe(switchMap(params => this.bookService.getByIsbn(params['isbn'])))
        .subscribe(book => (this.book = book))
    );
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  save() {
    this.sink.add(this.bookService.update(this.book.isbn, this.book).subscribe());
  }
}
