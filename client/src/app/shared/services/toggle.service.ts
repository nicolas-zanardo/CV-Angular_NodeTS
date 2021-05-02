import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ToogleModel} from "../models/toogle.model";


@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  public state: BehaviorSubject<ToogleModel> = new BehaviorSubject<ToogleModel>( {
    state: "start"
  });

  constructor() { }

  public toggle(): void {
    let closeBlur = document.querySelector('.filter-black');
    if(this.state.value.state === 'start') {
      closeBlur?.classList.remove("hide");
      return this.state.next({
        state: "end"
      })
    } else {
      closeBlur?.classList.add("hide");
      return this.state.next({
        state: "start"
      })
    }
  }
}
