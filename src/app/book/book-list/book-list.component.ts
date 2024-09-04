import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookApiService } from '../book-api.service';
import { BookCardComponent } from '../book-card/book-card.component';
import { RouterLink } from '@angular/router';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'ws-book-list',
  templateUrl: 'book-list.component.html',
  standalone: true,
  imports: [RouterLink, BookCardComponent, FilterPipe]
})
export class BookListComponent {
  books = toSignal(inject(BookApiService).getAll());
  totalNumber = computed(() => this.books()?.length);
  searchTerm = '';

  setSearchTerm(value: string) {
    this.searchTerm = value;
  }
}
