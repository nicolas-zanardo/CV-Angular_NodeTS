import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'signup', component:SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
