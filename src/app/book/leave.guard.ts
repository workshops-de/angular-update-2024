import { ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { BookNewComponent } from './book-new/book-new.component';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LeaveGuard implements CanDeactivate<BookNewComponent> {
  canDeactivate(
    component: BookNewComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (component.form.dirty && !component.saved) {
      return confirm('Sure?');
    }
    return true;
  }
}
