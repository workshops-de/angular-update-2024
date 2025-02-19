import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authState = new BehaviorSubject(false);

  isLogedIn$ = this.authState.asObservable();

  constructor() {
    setTimeout(() => this.authState.next(true), 3000);
  }
}
