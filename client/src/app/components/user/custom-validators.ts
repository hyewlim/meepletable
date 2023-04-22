import { FormGroup} from "@angular/forms";

export function passwordMatchValidator(g: FormGroup) {
  // @ts-ignore
  return g.get('password').value === g.get('confirmPassword').value
    ? null : {'mismatch': true};
}
