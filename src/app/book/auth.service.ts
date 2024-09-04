import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$$ = new BehaviorSubject(false);

  constructor() {
    setTimeout(() => this.isLoggedIn$$.next(true), 5000);
  }
}
