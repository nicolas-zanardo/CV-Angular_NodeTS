import {AfterContentChecked, Component, DoCheck, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToggleService} from "../../services/toggle.service";
import {JwtToken} from "../../models/jwt-token.model";
import {AuthService} from "../../services/security/auth.service";
import {Subscription} from "rxjs";

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
export class SidenavComponent implements OnInit, DoCheck, AfterContentChecked {

  public state: string = "start";
  public closeBlur?:  Element | null;
  public jwtToken?: JwtToken;
  public subscription?: Subscription;

  constructor(
    private stateService: ToggleService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getToken();
  }

  ngDoCheck(): void {
    this.state = this.stateService.state.value.state;
    if(this.state === "end") {
      this.closeSideNav();
    }
  }

  ngAfterContentChecked() {
    this.closeBlur = document.querySelector('.filter-black');
  }


  private getToken(): void {
    this.subscription = this.authService.jwtToken.subscribe((jwtToken: JwtToken) => {
      this.jwtToken = jwtToken;
    })
  }

  public logout(): void {
    this.authService.logout();
  }

  // close sidenav with a click on modal
  public closeSideNav(): void {
    this.closeBlur?.addEventListener('click', ()=> {
        this.stateService.state.next({
          state: "start"
        });
      this.closeBlur!.classList.add("hide");
      })
  }

}
