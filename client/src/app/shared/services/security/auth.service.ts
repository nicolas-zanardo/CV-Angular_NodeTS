import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription, timer} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {catchError, switchMap, tap} from "rxjs/operators";
import {JwtToken} from "../../models/jwt-token.model";
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";
import {SigninModel, User} from "../../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public subscription: Subscription;

  public currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: false,
    token: false,
    role: [],
    isAdmin: false,
    isUser: false
  })

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.initToken();
    this.subscription = this.initTimer();
    console.log(this.jwtToken)
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      // https://www.learnrxjs.io/operators/creation/of.html
      return of(result as T);
    };
  }

  /**
   * setValueToken
   * -------------
   * initToken authentication
   * @param token: string
   * @private
   */
  private setValueToken(token: string): void {
    let isAuthUser: boolean = false;
    let isAuthAdmin: boolean = false;
    // Decode JWT
    let decoded = jwt_decode(token);
    // @ts-ignore
    decoded.role.forEach( (role) => {
      if(role === "ROLE_USER") {
        isAuthUser = true;
      }
      if(role === "ROLE_ADMIN") {
        isAuthAdmin = true;
      }
    });
    //setValue
    this.jwtToken.next({
      isAuthenticated: true,
      token: token,
      // @ts-ignore
      role: decoded.role,
      isAdmin: isAuthAdmin,
      isUser: isAuthUser,
    })
  }

  public getCurrentUser(): Observable<User | null> {
    if (this.currentUser.value) {
      return this.currentUser;
    } else {
      return this.http.get<User>('/api/user/current').pipe(
        tap( (user:User) => {
          this.currentUser.next(user);
        }),
        switchMap(()=> {
          return this.currentUser;
        }),
        catchError((err)=> this.handleError<User|null>(`ERROR UserService.getCurrentUser() : ${err}`))
      );
    }
  }

  /**
   * resetToken
   * ----------
   * Reset value of token
   * @private
   */
  private resetToken(): void {
    this.jwtToken.next({
      isAuthenticated: false,
      token: false,
      role: [],
      isAdmin: false,
      isUser: false
    });
  }

  /**
   * initTimer
   * ---------
   * Refresh Token
   * - VALUE_OF_TIMER Timer( EX: 5min,15min / 300000, 900000)
   * - getToken in localstorage
   * * if(!jwt) return null
   * * if(jwt) return request and set value in token and in localstorage
   * * if(err) delete jwt
   */
  public initTimer() {
    return timer(300000, 300000).pipe(
      switchMap(() => {
        if (localStorage.getItem('jwt')) {
          return this.http.get<string>('/api/auth/refresh-token').pipe(
            tap((token: string) => {
              this.setValueToken(token);
              localStorage.setItem('jwt', token);
            })
          );
        } else {
          return of(null);
        }
      })
    ).subscribe(() => {
    }, err => {
      this.resetToken();
      this.currentUser.next( null);
      localStorage.removeItem('jwt');
      this.router.navigate(['/connection']);
    });
  }

  /**
   * initToken
   * ---------
   * if(jwt)
   * set or Delete value token
   */
  private initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.setValueToken(token);
    } else {
      this.currentUser.next( null);
      this.resetToken();
    }
  }

  // Sign up User => Create a new user
  public signup(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/signup', user).pipe( tap( ()=> {
    }));
  }

  /**
   * signin
   * ------
   * - set value token
   * - set Jwt
   * @return Observable<SigninModel | string | null>
   * @param credentials: object<string>
   */
  public signin(credentials: { login: string, password: string }): Observable<SigninModel | string | null> {
    return this.http.post<string>('/api/auth/signin', credentials).pipe(
      tap((token: string) => {
        this.setValueToken(token);
        localStorage.setItem('jwt', token);
      })
    )
  }

  /**
   * logout
   * ------
   *  - Remove JWT
   *  - reset TOKEN
   *  - Redirect route
   */
  public logout(): void {
    localStorage.removeItem('jwt');
    this.resetToken();
    this.currentUser.next( null);
    this.router.navigate(['/']);
  }

}
