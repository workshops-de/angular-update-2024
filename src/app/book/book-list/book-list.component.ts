import { Component, Signal, computed, inject } from '@angular/core';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { BookCardComponent } from '../book-card/book-card.component';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FilterComponent } from '../filter/filter.component';
import { BookFilterPipe } from '../book-filter.pipe';

@Component({
  selector: 'ws-book-list',
  templateUrl: 'book-list.component.html',
  standalone: true,
  imports: [RouterLink, BookCardComponent, FilterComponent, BookFilterPipe]
})
export class BookListComponent {
  sString = '';
  s_books: Signal<Book[]> = toSignal(inject(BookApiService).getAll(), {
    initialValue: []
  });

  s_bookCount: Signal<number> = computed(() => {
    console.log('signal');
    return this.s_books().length;
  });

  getBookCount() {
    console.log('methode');
    return this.s_books().length;
  }
}
