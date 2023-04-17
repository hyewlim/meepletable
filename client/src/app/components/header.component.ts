import {Component, OnInit} from '@angular/core';
import {User} from "../shared/models";
import {UserService} from "./user/user.service";
import {Subscription} from "rxjs";
import {JWTTokenService} from "./user/jwt-token.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: boolean;
  user!: User;

  userSub$!: Subscription;
  isLogSub$!: Subscription;


  constructor(public userService: UserService,
              public jwtService: JWTTokenService) {
  }

  ngOnInit(): void {

      if (!this.userService.user) {

        const token = sessionStorage.getItem("jwt_token");
        const user = JSON.parse(sessionStorage.getItem("user") || "[]");
        this.userService.isLoggedIn$.next(!!token);

        if (!!token && !!user){
          this.jwtService.setToken(token);
          this.userService.userName$.next(user.username);
          this.userService.signedInUser$.next(user);
          this.userService.user = user;
          this.user = user;
        }
      }




    this.isLogSub$ = this.userService.isLoggedIn$.subscribe(
      data => {
        this.isLoggedIn = data;
      }
    )

    this.userSub$ = this.userService.signedInUser$.subscribe(
      data => {
        this.user = data;
      }
    )

  }

  logOut() {
    this.userService.logOutUser();
  }
}
