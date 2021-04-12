/** Error when invalid control is dirty, touched, or submitted. */
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

export class PasswordErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (!(!control?.dirty || !form?.invalid) || !!(control && control.invalid &&  (control.dirty || control.touched || isSubmitted)));
  }
}
