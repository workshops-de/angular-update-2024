import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
    selector: 'ws-book-list',
    templateUrl: 'book-list.component.html',
    imports: [NgFor, NgIf, RouterLink, BookCardComponent, AsyncPipe]
})
export class BookListComponent {
  books$: Observable<Book[]>;

  constructor(private bookData: BookApiService) {
    this.books$ = this.bookData.getAll();
  }
}
