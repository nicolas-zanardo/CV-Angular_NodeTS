import {Component, Inject} from '@angular/core';
import {AuthService} from "./shared/services/security/auth.service";
import {ToggleService} from "./shared/services/toggle.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(@Inject(AuthService) private authService = AuthService,) {
  }
}
