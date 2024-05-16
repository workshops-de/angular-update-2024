import { Component, Signal, inject } from '@angular/core';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { BookCardComponent } from '../book-card/book-card.component';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ws-book-list',
  templateUrl: 'book-list.component.html',
  standalone: true,
  imports: [RouterLink, BookCardComponent]
})
export class BookListComponent {
  books: Signal<Book[]> = toSignal(inject(BookApiService).getAll(), {
    initialValue: []
  });
}
