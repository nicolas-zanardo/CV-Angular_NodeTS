import {Component, DoCheck, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToggleService} from "../../services/toggle.service";
import {BehaviorSubject} from "rxjs";
import {ToogleModel} from "../../models/toogle.model";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger( 'sidenav', [
      state('start', style({
        transform: 'translateX(-250px)'
      })),
      transition('start => end', [
        style({transform: 'translateX(-100px)'}),
        animate("0.3s")
      ] ),
    ])
  ]
})
export class SidenavComponent implements OnInit, DoCheck {

  public state: string = "start";
  public toggleSidenav: BehaviorSubject<ToogleModel>;

  constructor(
    private stateToggle: ToggleService,
  ) {
    this.toggleSidenav = this.stateToggle.stateToggle;
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.toggleSidenav = this.stateToggle.stateToggle;
    this.state = this.toggleSidenav.value.state
  }

}
