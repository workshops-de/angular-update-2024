import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookNewComponent } from './book-new/book-new.component';
import { leaveGuard } from './leave.guard';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { authGuard } from './auth.guard';

const bookRoutes: Routes = [
  {
    path: '',
    component: BookComponent,
    children: [
      {
        path: '',
        component: BookListComponent
      },
      {
        path: 'new',
        component: BookNewComponent,
        canDeactivate: [leaveGuard]
      },
      {
        path: ':isbn',
        component: BookDetailComponent,
        canActivate: [authGuard]
      },
      {
        path: ':isbn/edit',
        component: BookEditComponent
      }
    ]
  }
];

export default bookRoutes;
