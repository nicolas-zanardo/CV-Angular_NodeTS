import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/security/auth.service";
import {JwtToken} from "../../models/jwt-token.model";
import {Subscription} from "rxjs";
import {ToggleService} from "../../services/toggle.service";


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  // Need to remove view encapsulation so that the custom tooltip style defined in
  // `tooltip-custom-class-example.css` will not be scoped to this component's view.
  encapsulation: ViewEncapsulation.None,
})
export class TopbarComponent implements OnInit, OnDestroy {

  public jwtToken?: JwtToken;
  public subscription?: Subscription;
  public state: ToggleService;

  constructor(
    private authService: AuthService,
    private stateToggle: ToggleService,
  ) {
    this.state = this.stateToggle;
  }

  ngOnInit(): void {
    this.getToken();
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getToken(): void {
    this.subscription = this.authService.jwtToken.subscribe((jwtToken: JwtToken) => {
      this.jwtToken = jwtToken;
    })
  }

  public logout(): void {
    this.authService.logout();
  }

  toggleSidenav(): void {
    this.state.toggle()
  }

}
