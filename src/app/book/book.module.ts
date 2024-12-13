import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookNewComponent } from './book-new/book-new.component';
import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { BookCardComponent } from './book-card/book-card.component';

@NgModule({
  declarations: [
    BookComponent,
    BookListComponent,
    BookDetailComponent,
    BookEditComponent,
    BookNewComponent,
    BookCardComponent
  ],
  imports: [BookRoutingModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class BookModule {}
