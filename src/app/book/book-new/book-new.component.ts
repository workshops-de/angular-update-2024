import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  NonNullableFormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { BookNa } from '../models';

@Component({
  selector: 'ws-book-new',
  templateUrl: './book-new.component.html',
  imports: [FormsModule, ReactiveFormsModule]
})
export class BookNewComponent implements OnDestroy {
  private router = inject(Router);
  private fb = inject(NonNullableFormBuilder);
  private bookService = inject(BookApiService);

  sink = new Subscription();
  form: FormGroup;
  saved = false;

  constructor() {
    this.form = this.buildForm();
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  reset() {
    this.form.reset();
  }

  create() {
    const book = { ...new BookNa(), ...this.form.value };
    this.sink.add(
      this.bookService
        .create(book)
        .pipe(tap(() => (this.saved = true)))
        .subscribe({ complete: () => this.router.navigateByUrl('/') })
    );
  }

  private buildForm() {
    return this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      title: ['Hallo', Validators.required],
      author: ['', Validators.required],
      abstract: [''],
      cover: ['']
    });
  }
}
