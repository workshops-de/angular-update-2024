import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { exhaustMap, switchMap, tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ws-book-detail',
  templateUrl: 'book-detail.component.html',
  standalone: true,
  imports: [RouterLink, AsyncPipe]
})
export class BookDetailComponent {
  public book$: Observable<Book>;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private bookService = inject(BookApiService);

  constructor() {
    this.book$ = this.route.params.pipe(switchMap(params => this.bookService.getByIsbn(params['isbn'])));
  }

  remove() {
    this.route.params
      .pipe(
        exhaustMap(params => this.bookService.delete(params['isbn'])),
        tap(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }
}
