import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/security/auth.service";
import {map, tap} from "rxjs/operators";
import {JwtToken} from "../models/jwt-token.model";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return this.authService.jwtToken.pipe(
      map( (jwtToken: JwtToken) => {
        if (jwtToken.isAuthenticated && jwtToken.isUser) {
          return true;
        } else {
          this.router.navigate(['/connection']);
          return false;
        }
      })
    );

  }

}
