import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { BookCardComponent } from '../book-card/book-card.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ws-book-list',
  templateUrl: 'book-list.component.html',
  standalone: true,
  imports: [RouterLink, BookCardComponent, AsyncPipe]
})
export class BookListComponent {
  books$: Observable<Book[]> = inject(BookApiService).getAll();
}
