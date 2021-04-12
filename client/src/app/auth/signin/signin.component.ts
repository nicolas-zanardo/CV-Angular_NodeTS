import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {PasswordChangeComponent} from "../password-change/password-change.component";
import {MessagesUsersService} from "../../shared/messages/messages-users.service";
import {MatDialog} from "@angular/material/dialog";
import {MatMenuTrigger} from "@angular/material/menu";
import {UserService} from "../../shared/services/user.service";
import {EmailModel} from "../../shared/models/email.model";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;

  public form!: FormGroup;
  public error: string | undefined;
  public hidePW: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    public messages: MessagesUsersService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.createForms();
  }

  public createForms() {
    this.form = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.pattern('^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\\.([a-zA-Z]{2,6})$'),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W)[a-zA-Z0-9_$/ \\W]+$')
      ]))
    })
  }

  public openDialog(formDirective: FormGroupDirective): void {
    const dialogRef = this.dialog.open(PasswordChangeComponent, {
      restoreFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.userService.forgotPassword(result.value)
          .subscribe(data => SigninComponent.handleSuccess(data, formDirective),
            (error: Error) => SigninComponent.handleError(error)
          );
      }
    });
  }

  public submit(formDirective: FormGroupDirective): void {
    if(this.form.valid) {
      this.authService.signin(this.form.value).subscribe(() => {
          this.router.navigate(['/']).catch((err: Error) => console.log(err));
        }, (err) => {
          if (err.status === 401) {
            this.error =  "L'utilisateur ou le mot de passe est incorrect"
          }
        if (err.status === 400) {
          this.error =  "Vous devez valider votre email"
        }
        }
      );
    }
  }


  private static handleSuccess(data: EmailModel | null, formDirective: FormGroupDirective) {
    formDirective.resetForm();
  }
  private static handleError(err: Error) {
    console.log(`MESSAGE FormValidation = ERROR`, err)
  }

}
