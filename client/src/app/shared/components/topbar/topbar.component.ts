import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
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
  public showFiller = false;
  public state: ToggleService;

  constructor(
    private authService: AuthService,
    private stateToggle: ToggleService,
  ) {
    this.state = this.stateToggle;
  }

  ngOnInit(): void {
    this.authService.jwtToken.subscribe((jwtToken: JwtToken) => {
      this.jwtToken = jwtToken;
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public logout():void {
    this.authService.logout();
  }

  toggleSidenav() {
    this.state.toggle()
  }

}
