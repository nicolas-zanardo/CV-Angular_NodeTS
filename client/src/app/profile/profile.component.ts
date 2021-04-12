import {Component, OnInit} from '@angular/core';
import {User} from "../shared/models/user.model";
import {UserService} from "../shared/services/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser?: Observable<User | null>;
  public dateNow: Date = new Date();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.clock();
  }

  clock(): void {
    setInterval(()=> {

      this.dateNow = new Date();
    }, 500)
  }

}
