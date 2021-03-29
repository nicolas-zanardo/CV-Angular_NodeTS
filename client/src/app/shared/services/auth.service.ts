import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, of, Subscription, timer} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {switchMap, tap} from "rxjs/operators";

import {JwtToken} from "../models/jwt-token.model";
import {User} from "../models/user.model";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public subscription: Subscription;

  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: false,
    token: false
  })

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initToken();
    this. subscription = this.initTimer();
  }

  // Timer to refresh Token - VALUE_OF_TIMER Timer(5min,15min)
  public initTimer() {
    return timer(300000, 900000).pipe(
      switchMap( () => {
        console.log('try to refresh token');
        if (localStorage.getItem('jwt')) {
          console.log('Refresh token');
            return this.http.get<string>('/api/auth/refresh-token').pipe(
              tap((token:string)=> {
                this.jwtToken.next({
                  isAuthenticated: true,
                  token: token
                })
                localStorage.setItem('jwt', token);
              })
            );
        } else {
          console.log('NO TOKEN');
          return of(null);
        }
      })
    ).subscribe(() => {}, err => {
      this.jwtToken.next({
        isAuthenticated: false,
        token: false
      });
      console.log('remove token');
      localStorage.removeItem('jwt');
      this.router.navigate(['/signin']);
    });
  }

  // Initialization of the token
  private initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.jwtToken.next({
        isAuthenticated: true,
        token: token
      });
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        token: false
      });
    }
  }

  // Sign up User => Create a new user
  public signup(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/signup', user);
  }

  // Sign in User => Check the credential
  public signin(credentials: { email: string, password: string }): Observable<string> {
    return this.http.post<string>('/api/auth/signin', credentials).pipe(
      tap((token: string) => {
        this.jwtToken.next({
          isAuthenticated: true,
          token: token
        });
        localStorage.setItem('jwt', token);
      })
    )
  }

  // Remove token and redirect after logout
  public logout(): void {
    this.jwtToken.next({
      isAuthenticated: false,
      token: false
    });
    localStorage.removeItem('jwt');
    this.router.navigate(['/signin']);
  }
}
