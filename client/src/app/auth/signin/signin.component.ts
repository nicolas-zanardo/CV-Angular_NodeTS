import {Component, ErrorHandler, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {MessagesUsersService} from "../../shared/messages/messages-users.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form!: FormGroup;
  public error: string | undefined;
  public hidePW: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public messages: MessagesUsersService
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
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W)[a-zA-Z0-9$/ \\W]+$')
      ]))
    })
  }

  public submit(): void {
    if(this.form.valid) {
      this.authService.signin(this.form.value).subscribe(() => {
          this.router.navigate(['/']).catch((err: Error) => console.log(err));
        }, (err) => {
          if (err.status === 401) {
            this.error =  "L'utilisateur ou le mot de passe est incorrect"
          }
        }
      );
    }
  }
}
