import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MessagesUsersService} from "../../shared/messages/messages-users.service";
import {PasswordErrorMatcher} from "./password-error-matcher";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordModel} from "../../shared/models/user.model";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  public form!: FormGroup;
  public hidePW: boolean = false;
  public hideConfirmPW: boolean = false;
  public matcher = new PasswordErrorMatcher();
  public passwordsDoNotMatch: boolean | null = null;
  private id!: string | null;
  private token!: string | null;

  public error?: string;


  constructor(
    private fb: FormBuilder,
    public messages: MessagesUsersService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    this.createForms();
  }

  public passwordValidator(form: FormGroup) {
    const condition = form.get('password')?.value !== form.get('confirmPassword')?.value;
    return condition ? { passwordsDoNotMatch: true} : false;
  }

  public createForms() {
    this.form = this.fb.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W)[a-zA-Z0-9_$/ \\W]+$')
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    }, {
      validators: [this.passwordValidator, Validators.required],
    })
  }

  public submit(formDirective: FormGroupDirective): void {
    if(this.form.valid) {
      this.userService.resetPassword(this.form.value, this.id, this.token)
        .subscribe((data:PasswordModel | null) =>  this.handleSuccess(data, formDirective),
        (error) => this.handleError(error)
      );
    }
  }

  private handleSuccess(data: PasswordModel | null, formDirective: FormGroupDirective) {
    this.router.navigate(['/signin']).catch((err: Error) => console.log(err));

  }
  private handleError(err:any) {
    if(err.status === 401) {
      this.error = "Le token a expiré"
    }
  }

}
