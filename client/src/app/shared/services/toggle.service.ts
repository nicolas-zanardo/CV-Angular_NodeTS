import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ToogleModel} from "../models/toogle.model";
import {User} from "../models/user.model";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  public state: string = "start";
  public stateToggle: BehaviorSubject<ToogleModel> = new BehaviorSubject<ToogleModel>( {
    state: "start"
  });

  constructor() { }

  public toggle(): void {
    if(this.state === 'start') {
      this.state = 'end';
      return this.stateToggle.next({
        state: "end"
      })
    } else {
      this.state = 'start';
      return this.stateToggle.next({
        state: "start"
      })
    }
  }
}
