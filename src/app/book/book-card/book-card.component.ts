import { Component, Input } from '@angular/core';
import { Book, BookNa } from '../models';

@Component({
  selector: 'ws-book-card',
  templateUrl: './book-card.component.html'
})
export class BookCardComponent {
  @Input() book: Book = new BookNa();
}
