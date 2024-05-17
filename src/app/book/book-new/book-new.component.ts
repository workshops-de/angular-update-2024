import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
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
import { Book, BookNa } from '../models';

// export type IForm<T> = {
//   [K in keyof T]: FormControl<T[K]>;
//   }

//   const f: IForm<Book> = new FormGroup({
//     id: new FormControl<string>(""),
//   title: new FormControl<string>(""),
//   subtitle: new FormControl<string>(""),
//   isbn: new FormControl<string>(""),
//   cover: new FormControl<string>(""),
//   abstract: new FormControl<string>(""),
//   numPages: new FormControl<number>(0),
//   author: new FormControl<string>(""),
//   publisher: new FormControl<string>(""),
//   price: new FormControl<number>(0)
//   })

export interface IBookForm {
  isbn: FormControl<string>;
  title: FormControl<string>;
  author: FormControl<string>;
  abstract: FormControl<string>;
  cover: FormControl<string>;
}
@Component({
  selector: 'ws-book-new',
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule]
})
export class BookNewComponent implements OnDestroy {
  sink = new Subscription();
  form: FormGroup<IBookForm> = this.buildForm();
  saved = false;
  private router = inject(Router);
  private fb = inject(NonNullableFormBuilder);
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

  private buildForm() {
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
