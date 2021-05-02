import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MessagesUsersService} from "../../shared/messages/messages-users.service";
import {UserService} from "../../shared/services/user.service";
import {EmailModel} from "../../shared/models/user.model";

@Component({
  selector: 'app-change-password',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public messages: MessagesUsersService,
  ) { }

  ngOnInit(): void {
    this.createForms();
  }

  public createForms() {
    this.form = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.pattern('^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\\.([a-zA-Z]{2,6})$'),
        Validators.required
      ]))
    })
  }

  public submit(formDirective: FormGroupDirective): void {
    if(this.form.valid) {
      this.userService.forgotPassword(this.form.value)
        .subscribe(data => PasswordChangeComponent.handleSuccess(data, formDirective),
          (error: Error) => PasswordChangeComponent.handleError(error)
        );
    }
  };

  private static handleSuccess(data: EmailModel | null, formDirective: FormGroupDirective) {
    formDirective.resetForm();
  }
  private static handleError(err: Error) {

  }
}
