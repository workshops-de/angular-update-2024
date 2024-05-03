import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLogedIn$$ = new BehaviorSubject(false);
  isLogedIn$ = this.isLogedIn$$.asObservable();

  constructor() {
    setTimeout(() => {
      this.isLogedIn$$.next(true);
    }, 5000);
  }
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthService).isLogedIn$;
};
