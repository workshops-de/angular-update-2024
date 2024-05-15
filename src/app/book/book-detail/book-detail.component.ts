import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NEVER, Observable } from 'rxjs';
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
export class BookDetailComponent implements OnInit {
  @Input() isbn = '';
  public book$: Observable<Book> = NEVER;

  constructor(
    private router: Router,
    private bookService: BookApiService,
    private destroyRef: DestroyRef
  ) {}
  ngOnInit(): void {
    this.book$ = this.bookService.getByIsbn(this.isbn);
  }

  remove() {
    this.bookService
      .delete(this.isbn)
      .pipe(
        tap(() => this.router.navigateByUrl('/')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
