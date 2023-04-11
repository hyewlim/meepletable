import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {User} from "../shared/models";
import {UserService} from "./user/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: boolean;
  signedInUsername!: string;


  constructor(public userService: UserService) {
  }

  ngOnInit(): void {

    this.userService.isLoggedIn$.subscribe(
      data => {
        this.isLoggedIn = data;
      }
    )

    this.userService.userName$.subscribe(
      data => {
        this.signedInUsername = data;
      }
    )

  }

  logOut() {
    this.userService.logOutUser();
  }
}
