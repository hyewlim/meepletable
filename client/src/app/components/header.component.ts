import {Component, OnInit} from '@angular/core';
import {User} from "../shared/models";
import {UserService} from "./user/user.service";
import {Subscription} from "rxjs";
import {JWTTokenService} from "./user/jwt-token.service";
import {Router} from "@angular/router";
import {MenuItem, MessageService} from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: boolean;
  user!: User;

  userSub$!: Subscription;
  isLogSub$!: Subscription;
  items!: MenuItem[];


  constructor(public userService: UserService,
              public jwtService: JWTTokenService,
              private router: Router) {
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

    this.items = [
      {
        label: 'User Options',
        items: [
          {
            label: 'Change Password',
            icon: 'pi pi-user-edit',
            routerLink: '/changepw'
          },
          {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
            routerLink: '/signin',
            command: event => {
              this.logOut()
            }
          }
        ]
      }
    ];

  }

  logOut() {
    this.userService.logOutUser();
  }

  toCollection() {
    this.router.navigate(['/collection', this.user.userId])
  }
}
