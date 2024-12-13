import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';

@Component({
    selector: 'ws-book-list',
    templateUrl: 'book-list.component.html',
    standalone: false
})
export class BookListComponent {
  books$: Observable<Book[]>;

  constructor(private bookData: BookApiService) {
    this.books$ = this.bookData.getAll();
  }
}
