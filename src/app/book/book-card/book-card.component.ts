import { Component, EventEmitter, Input, Output, input, model, output } from '@angular/core';
import { Book, BookNa } from '../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ws-book-card',
  templateUrl: './book-card.component.html',
  standalone: true,
  imports: [RouterLink]
})
export class BookCardComponent {
  @Input() _book: Book = new BookNa();
  @Output() _bookChange = new EventEmitter<Book>();
  book = input.required<Book>();
  bookChange = output<Book>();

  foo = model();

  bar() {
    this.foo.update(() => this.book());
  }
}
