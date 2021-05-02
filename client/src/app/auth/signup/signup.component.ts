import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/security/auth.service";
import {User} from "../../shared/models/user.model";
import {Router} from "@angular/router";
import {MessagesUsersService} from "../../shared/messages/messages-users.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form!: FormGroup;
  public error: string | undefined;
  public hidePW: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public messages: MessagesUsersService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      company: new FormControl('', Validators.compose( [
        Validators.maxLength(this.messages.maxCharacters),
        Validators.required
      ])),
      firstName: new FormControl('', Validators.compose([
        Validators.maxLength(this.messages.maxCharacters),
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.maxLength(this.messages.maxCharacters),
        Validators.required
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.maxLength(this.messages.maxNumberPhone),
        Validators.pattern('^()?((\\+)?[0-9]+)?$'),
      ])),
      email: new FormControl('', Validators.compose([
        Validators.pattern('^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\\.([a-zA-Z]{2,6})$'),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(this.messages.minPassword),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W)[a-zA-Z0-9_$\\/ \\W]+$')
      ]))
    })
  }

  public submit(formDirective: FormGroupDirective): void {
    if(this.form.valid) {
      this.authService.signup(this.form.value).subscribe(
        (user: User) => {
          this.openSnackBar(this.form.value.lastName);
          this.router.navigate(['/connection']);
        }, (err) => {
          console.log(err);
          if (err.status === 406) {
            this.error = "Le mail est déjà enregistré";
          }
        }
      );
    }

  }


  public openSnackBar(name: string) {

      const message = `Validez votre email`;
      const action = `compte crée ✅`;

      this._snackBar.open(message, action, {
        duration: 15000,
      });


  }

}
