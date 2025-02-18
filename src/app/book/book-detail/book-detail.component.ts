import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NEVER, Observable } from 'rxjs';
import { exhaustMap, switchMap, tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { AsyncPipe } from '@angular/common';

@Component({ selector: 'ws-book-detail', templateUrl: 'book-detail.component.html', imports: [RouterLink, AsyncPipe] })
export class BookDetailComponent implements OnInit {
  public book$: Observable<Book> = NEVER;
  @Input() isbn: string = '';

  constructor(
    private router: Router,
    private bookService: BookApiService
  ) {}
  ngOnInit(): void {
    this.book$ = this.bookService.getByIsbn(this.isbn);
  }

  remove() {
    this.bookService
      .delete(this.isbn)
      .pipe(tap(() => this.router.navigateByUrl('/')))
      .subscribe();
  }
}
