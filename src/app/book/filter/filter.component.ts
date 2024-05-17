import { Component, model } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  template: `
    <input type="text" [value]="searchString()" #input (input)="searchString.set(input.value)" />
    <hr />
  `
})
export class FilterComponent {
  searchString = model<string>();
}
