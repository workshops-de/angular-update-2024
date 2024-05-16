import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  FormControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { BookNa } from '../models';

@Component({
  selector: 'ws-book-new',
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule]
})
export class BookNewComponent implements OnDestroy {
  sink = new Subscription();
  form: FormGroup;
  saved = false;
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private bookService = inject(BookApiService);

  constructor() {
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
      title: ['', Validators.required, [nameValidater()]],
      author: ['', Validators.required],
      abstract: [''],
      cover: ['']
    });
  }
}

const nameValidater = (): AsyncValidatorFn => {
  const service = inject(BookApiService);
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    service.getAll();
    return (control.value as string).includes('Kevin') ? of(null) : of({ name: 'muss Kevin enthalten' });
  };
};
