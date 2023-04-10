import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {User} from "../shared/models";
import {UserService} from "../shared/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  signedInUser!: User;

  // userSub$!: Subscription;


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {



    this.userService.getUserIdObservable().subscribe(
      data => {
        this.signedInUser = data;
      }
    )

  }




}
