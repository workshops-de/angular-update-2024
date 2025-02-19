import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'ws-book-list',
  templateUrl: 'book-list.component.html',
  imports: [RouterLink, BookCardComponent]
})
export class BookListComponent {
  books = toSignal(inject(BookApiService).getAll(), { initialValue: [] });
  count = computed(() => this.books().length);
}
