import { Component, Input, OnChanges, OnInit, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NEVER, Observable } from 'rxjs';
import { exhaustMap, switchMap, tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({ selector: 'ws-book-detail', templateUrl: 'book-detail.component.html', imports: [RouterLink, AsyncPipe] })
export class BookDetailComponent implements OnChanges {
  private router = inject(Router);
  private bookService = inject(BookApiService);

  public book$: Observable<Book> = NEVER;
  isbn = input.required<string>();
  // book = computed(() => {
  //   const isbn = this.isbn();
  //   return toSignal<Book>(this.bookService.getByIsbn(isbn));
  // });

  ngOnChanges(): void {
    this.book$ = this.bookService.getByIsbn(this.isbn());
  }

  remove() {
    this.bookService
      .delete(this.isbn())
      .pipe(tap(() => this.router.navigateByUrl('/')))
      .subscribe();
  }
}
