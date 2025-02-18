import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { BookNa } from '../models';


@Component({
    selector: 'ws-book-new',
    templateUrl: './book-new.component.html',
    imports: [FormsModule, ReactiveFormsModule]
})
export class BookNewComponent implements OnDestroy {
  sink = new Subscription();
  form: FormGroup;
  saved = false;

  constructor(private router: Router, private fb: FormBuilder, private bookService: BookApiService) {
    this.form = this.buildForm();
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  create() {
    const book = { ...new BookNa(), ...this.form.value };
    this.sink.add(
      this.bookService
        .create(book)
        .pipe(tap(() => (this.saved = true)))
        .subscribe({
          complete: () => this.router.navigateByUrl('/')
        })
    );
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', Validators.required],
      author: ['', Validators.required],
      abstract: [''],
      cover: ['']
    });
  }
}
