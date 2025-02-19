import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookNewComponent } from './book-new/book-new.component';
import { leaveGuard, leaveGuardFn } from './leave.guard';
import { authGuard } from './auth/auth.guard';

const bookRoutes: Routes = [
  {
    path: '',
    component: BookComponent,
    children: [
      { path: '', component: BookListComponent },
      { path: 'new', component: BookNewComponent, canDeactivate: [leaveGuardFn] },
      { path: ':isbn', component: BookDetailComponent, canActivate: [authGuard] },
      { path: ':isbn/edit', component: BookEditComponent }
    ]
  }
];
export default bookRoutes;
