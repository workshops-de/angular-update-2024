import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './models';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(list: Book[] = [], search: string = ''): Book[] {
    return list.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));
  }
}
