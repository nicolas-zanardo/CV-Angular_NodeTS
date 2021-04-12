// Natives module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

// Modules
import { AppRoutingModule } from './app-routing.module';
import {LayoutModule} from "./shared/layout/layout.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Guard
import {AuthGuard} from "./shared/guards/auth.guard";

// Services
import {AuthService} from "./shared/services/auth.service";
import {UserService} from "./shared/services/user.service";

// Components
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { TopbarComponent } from './shared/components/topbar/topbar.component';
import { ProfileComponent } from './profile/profile.component';
import { AnimationsComponent } from './animations/animations.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { PasswordChangeComponent } from "./auth/password-change/password-change.component";
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';

// Interceptors
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";

// Pipe
import { BooleanToStringPipe } from './shared/pipe/boolean-to-string.pipe';






@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SignupComponent,
    SigninComponent,
    TopbarComponent,
    ProfileComponent,
    AnimationsComponent,
    BooleanToStringPipe,
    PasswordChangeComponent,
    PasswordResetComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    UserService ,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
