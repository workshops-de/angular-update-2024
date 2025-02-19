import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({ selector: 'ws-book', templateUrl: './book.component.html', imports: [RouterOutlet] })
export class BookComponent {
  // isLogedin$ = inject(AuthService).isLogedIn$.pipe()
}
