import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form!: FormGroup;
  public error: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  public submit(): void {
    this.authService.signup(this.form.value).subscribe(
      (user: User) => {
        this.router.navigate(['/signin']).catch((err: Error) => console.log(err))
      }, (err: Error) => {
        this.error = err.message;
      }
    );
  }

}
