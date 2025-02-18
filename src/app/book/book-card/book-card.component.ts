import { Component, Input } from '@angular/core';
import { Book, BookNa } from '../models';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'ws-book-card',
    templateUrl: './book-card.component.html',
    imports: [RouterLink]
})
export class BookCardComponent {
  @Input() book: Book = new BookNa();
}
