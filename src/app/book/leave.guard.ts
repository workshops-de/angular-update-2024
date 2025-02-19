import { CanDeactivateFn, GuardResult, MaybeAsync } from '@angular/router';
import { BookNewComponent } from './book-new/book-new.component';

export const leaveGuard: CanDeactivateFn<BookNewComponent> = (component: BookNewComponent): MaybeAsync<GuardResult> => {
  if (component.form.dirty && !component.saved) {
    return confirm('Sure?');
  }
  return true;
};
export function leaveGuardFn(component: BookNewComponent): MaybeAsync<GuardResult> {
  if (component.form.dirty && !component.saved) {
    return confirm('Sure?');
  }
  return true;
}
