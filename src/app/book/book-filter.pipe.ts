import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './models';

@Pipe({
  name: 'bookFilter',
  standalone: true
})
export class BookFilterPipe implements PipeTransform {
  transform(books: Book[], searchStr: string): Book[] {
    return books.filter(book => book.title.toLowerCase().includes(searchStr.toLowerCase()));
  }
}
