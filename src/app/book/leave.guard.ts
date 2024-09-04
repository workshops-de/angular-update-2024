import { ActivatedRouteSnapshot, CanDeactivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { BookNewComponent } from './book-new/book-new.component';

export const leaveGuard:CanDeactivateFn<BookNewComponent> =(
    component: BookNewComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): MaybeAsync<GuardResult> =>{
    if (component.form.dirty && !component.saved) {
      return confirm('Sure?');
    }
    return true;
  }
