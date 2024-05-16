import { Component, DestroyRef, Input, OnInit, effect, inject, signal } from '@angular/core';
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

  resize = signal(true);

  private router = inject(Router);
  private bookService = inject(BookApiService);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    const e = effect(() => {
      if (this.resize()) {
      }
    });

    this.book$ = this.bookService.getByIsbn(this.isbn);
    e.destroy();
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
