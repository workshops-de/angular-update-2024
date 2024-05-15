import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookNewComponent } from './book-new/book-new.component';
import { leaveGuard } from './leave.guard';

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
        title: 'Buch anlegen',
        component: BookNewComponent,
        canActivate: [],
        canDeactivate: [leaveGuard]
      },
      {
        path: ':isbn',
        component: BookDetailComponent
      },
      {
        path: ':isbn/edit',
        title: 'Buch editieren',
        component: BookEditComponent
      }
    ]
  }
];

export default bookRoutes;
