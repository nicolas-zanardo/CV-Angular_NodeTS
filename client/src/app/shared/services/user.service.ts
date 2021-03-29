import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {User} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

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
}
