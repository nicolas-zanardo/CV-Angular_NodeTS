import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {AnimationsComponent} from "./animations/animations.component";
import {PasswordResetComponent} from "./auth/password-reset/password-reset.component";
import {EmailVerificationComponent} from "./email/email-verification/email-verification.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'animation', component: AnimationsComponent },
  { path: 'inscription', component:SignupComponent},
  { path: 'connection', component: SigninComponent},
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
  { path: 'reset-password/:id/:token', component: PasswordResetComponent },
  { path: 'email-verification/:id/:token', component: EmailVerificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
