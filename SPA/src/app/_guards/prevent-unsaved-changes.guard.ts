import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> =
  (component) => {
    if (component.editForm?.dirty) {
      return confirm("Se perdarán los cambios si sales de esta página, ¿deseas continuar?");
    }

    return true;
  };
