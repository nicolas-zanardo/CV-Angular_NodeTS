import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/security/auth.service";
import {Router} from "@angular/router";
import {PasswordChangeComponent} from "../password-change/password-change.component";
import {MessagesUsersService} from "../../shared/messages/messages-users.service";
import {MatDialog} from "@angular/material/dialog";
import {MatMenuTrigger} from "@angular/material/menu";
import {UserService} from "../../shared/services/user.service";
import {SwalPortalTargets} from "@sweetalert2/ngx-sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../shared/models/user.model";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;

  public form!: FormGroup;
  public error: number = 0;
  public hidePW: boolean = false;
  public messageError?: string;
  public sendEmailVerification?: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    public messages: MessagesUsersService,
    public dialog: MatDialog,
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
        Validators.required
      ]))
    })
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(PasswordChangeComponent, {
      restoreFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log((result.value))
        this.userService.forgotPassword(result.value);
      }
    });
  }

  public submit(): void {
    this.sendEmailVerification = "false"
    this.error = 0;
    this.messageError = "";
    if (this.form.valid) {
      this.authService.signin(this.form.value).subscribe((data) => {

          this.router.navigate(['/']).catch((err: Error) => console.log(err));
        }, (err) => {
          this.error = err.status;
          if (err.status === 401) {
            this.messageError = "L'utilisateur ou le mot de passe est incorrect";
          }
          if (err.status === 423) {
            this.messageError = "Vous devez valider votre email";
          }
          if (err.status >= 500) {
            this.messageError = "Aucune communication avec le serveur";
          }
        }
      );
    }
  }

  public sendEmail() {
    this.sendEmailVerification = "waiting"
    this.userService.sendEmailVerification(this.form.value).subscribe((data) =>
        this.sendEmailVerification = "true"
      ,(error: Error) => this.sendEmailVerification = "error")
  }

}
