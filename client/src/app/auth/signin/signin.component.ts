import {Component, ErrorHandler, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form!: FormGroup;
  public error: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  public submit(): void {
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
