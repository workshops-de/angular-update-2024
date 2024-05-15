import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/books'
  },
  {
    path: 'books',
    loadChildren: () => import('./book/book.routes')
  },
  {
    path: 'about',
    component: AboutComponent
  }
];
