import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/user.model";
import {Router} from "@angular/router";
import {MessagesUsersService} from "../../shared/messages/messages-users.service";

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
    public messages: MessagesUsersService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', Validators.compose( [
        Validators.minLength(this.messages.minUser),
        Validators.pattern('^([a-zA-Z0-9._-]+)$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.pattern('^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\\.([a-zA-Z]{2,6})$'),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(this.messages.minPassword),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W)[a-zA-Z0-9_$/ \\W]+$')
      ]))
    })
  }

  public submit(): void {
    if(this.form.valid) {
      this.authService.signup(this.form.value).subscribe(
        (user: User) => {
          this.router.navigate(['/signin']).catch((err: Error) => console.log(err))
        }, (err) => {
          console.log(err);
          if (err.status === 406) {
            this.error = "Le mail est déjà enregistré";
          }

        }
      );
    }

  }

}
