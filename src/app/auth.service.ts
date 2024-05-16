import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggesIn$$ = new BehaviorSubject(false);
  islogedIn$ = this.isLoggesIn$$.pipe();

  constructor() {
    setTimeout(() => {
      console.log('true');
      this.isLoggesIn$$.next(true);
    }, 5000);
  }
}
