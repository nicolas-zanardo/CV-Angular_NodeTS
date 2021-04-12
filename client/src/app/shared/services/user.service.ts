import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, switchMap, tap} from "rxjs/operators";
import {User} from "../models/user.model";
import {EmailModel} from "../models/email.model";
import PasswordModel from "../models/password.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  private static logs(log: string) {
    //TODO create log
    console.info(log);
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
   * get Current User
   */
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
        })
      );
    }
  }

  /**
   * forgotPassword
   * --------------
   * send email for reinitialize the password
   */
  public forgotPassword(email: EmailModel): Observable<EmailModel | null> {
    const httpOptions = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    return this.http.post<EmailModel>(`/api/user/forgot-password/`, email, httpOptions ).pipe(
      catchError(this.handleError<EmailModel>(`ERROR : ${email.email}`))
    )
  }

  public resetPassword(password: string, id: string | null, token: string | null): Observable<PasswordModel | null> {
    const httpOptions = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<PasswordModel>(`/api/user/reset-password/${id}/${token}`, password, httpOptions ).pipe(
      catchError(this.handleError<PasswordModel>(`ERROR : ${password}`))
    )
  }

}
