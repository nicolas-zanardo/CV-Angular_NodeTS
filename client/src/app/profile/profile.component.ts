import {Component, OnInit} from '@angular/core';
import {User} from "../shared/models/user.model";
import {UserService} from "../shared/services/user.service";
import {Observable} from "rxjs";
import {AuthService} from "../shared/services/security/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser?: Observable<User | null>;
  public dateNow: Date = new Date();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.clock();
  }

  clock(): void {
    setInterval(()=> {
      this.dateNow = new Date();
    }, 500)
  }

}
